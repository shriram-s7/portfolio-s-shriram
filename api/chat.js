import Groq from 'groq-sdk';
import { buildPortfolioKnowledge } from '../src/lib/buildPortfolioKnowledge.js';
import { profileData } from '../src/data/profileData.js';
import { projectsData } from '../src/data/projectsData.js';
import { hackathonsData } from '../src/data/hackathonsData.js';

// --- INTENT CLASSIFICATION LAYER ---
const detectIntent = (message) => {
    const lower = message.toLowerCase();

    // 1. OUT_OF_SCOPE
    const unrelatedTopics = [
        "politics", "religion", "weather", "celebrity", "capital of",
        "president", "geography", "recipe", "python code for snake",
        "explain quantum physics", "write a game", "joke", "poem"
    ];
    if (unrelatedTopics.some(t => lower.includes(t))) return "OUT_OF_SCOPE";

    // 2. GREETING
    if (/^(hi|hello|hey|greetings|who are you|what is this|help)$/.test(lower)) return "GREETING";
    if (lower.includes("what makes you different") || lower.includes("why hire you") || lower.includes("tell me about yourself")) return "ELEVATOR_PITCH";

    // 3. CONTACT_INFO
    if (lower.match(/(email|mail|contact|phone|github|linkedin|location|address|reach you)/)) return "CONTACT_INFO";

    // 4. EDUCATION
    if (lower.match(/(school|college|degree|education|study|studied|university|iit|engineering|10th|12th)/)) return "EDUCATION";

    // 5. PROJECTS (Listing)
    if (lower.match(/(what projects|list projects|show projects|key projects|recent projects|projects work)/)) return "PROJECTS_LIST";

    // 6. CERTIFICATIONS
    if (lower.match(/(certification|certificate|courses|nptel|udemy|coursera)/)) return "CERTIFICATIONS";

    // Default: RAG_SEARCH
    return "RAG_SEARCH";
};

// --- STRUCTURED RESPONSE HANDLERS ---
const handleStructuredResponse = (intent, message) => {
    switch (intent) {
        case "GREETING":
            return {
                reply: "Hi, I’m Helper AI — Shriram’s intelligent portfolio assistant. \n\nYou can ask me about his **projects**, **skills**, **education**, **hackathons**, or **certifications**. \n\nWhat would you like to know?",
                navigateTo: null
            };

        case "OUT_OF_SCOPE":
            return {
                reply: "I am not sure about that. Ask me something related to my work.",
                navigateTo: null
            };

        case "ELEVATOR_PITCH":
            return {
                reply: `**Professional Summary**\n\nI am ${profileData.name}, a ${profileData.role} based in ${profileData.location}.\n\n**Core Strengths**\n${profileData.summary}\n\n**Technical Focus**\nI specialize in building real-time, AI-driven systems using ${profileData.techStack.slice(0, 5).join(', ')}.\n\n**Current Academic Pursuits**\nI am simultaneously pursuing a B.E. in CSE and a BS in Data Science from IIT Madras.`,
                navigateTo: "home"
            };

        case "CONTACT_INFO":
            return {
                reply: `**S Shriram’s Contact Information:**\n\n• **Email**: ${profileData.email}\n• **Location**: ${profileData.location}\n• **GitHub**: [${profileData.github}](${profileData.github})\n• **LinkedIn**: [${profileData.linkedin}](${profileData.linkedin})\n\nI have not publicly listed a contact number.`,
                navigateTo: "contact"
            };

        case "EDUCATION":
            const college = profileData.education.filter(e => e.institution.includes("College") || e.institution.includes("IIT"));
            const school = profileData.education.filter(e => !e.institution.includes("College") && !e.institution.includes("IIT")); // Assuming data structure details

            let eduText = "**Education Background:**\n\n**College:**\n";
            college.forEach(e => {
                eduText += `• ${e.degree} – ${e.institution} (${e.year})\n`;
            });

            if (school.length > 0) {
                eduText += "\n**School Education:**\n";
                school.forEach(e => {
                    eduText += `• ${e.institution} – ${e.degree || "Schooling"}\n`;
                });
            }

            return {
                reply: eduText,
                navigateTo: "education"
            };

        case "PROJECTS_LIST":
            let projText = "**Key Projects:**\n\n";
            projectsData.slice(0, 3).forEach((p, i) => {
                // Determine icon or emoji based on project?
                const emoji = ["1️⃣", "2️⃣", "3️⃣"][i] || "•";
                projText += `${emoji} **${p.title}**\n• ${p.description}\n• **Tech**: ${p.tech.join(', ')}\n\n`;
            });
            projText += "Would you like me to open one of these?";
            return {
                reply: projText,
                navigateTo: "projects"
            };

        case "CERTIFICATIONS":
            // Relying on RAG for the detailed list, but maybe we prompt navigation
            return null; // Fallback to RAG for comprehensive list but navigate

        default:
            return null;
    }
};

export default async function handler(req, res) {
    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY,
        timeout: 30000
    });

    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    try {
        const { message, history = [] } = req.body;
        if (!message) return res.status(400).json({ error: 'Message is required' });

        // 1. INTENT DETECTION
        const intent = detectIntent(message);
        console.log(`[INTENT]: ${intent} for "${message}"`);

        // 2. CHECK DETERMINISTIC HANDLERS
        const structuredResponse = handleStructuredResponse(intent, message);
        if (structuredResponse) {
            return res.status(200).json(structuredResponse);
        }

        // 3. RAG / LLM FLOW (Fallback or RAG_SEARCH)
        const knowledgeBase = buildPortfolioKnowledge();

        // --- NORMALIZE QUERY ---
        const userTokens = message.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 2)
            .map(word => {
                if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
                if (word.endsWith('es')) return word.slice(0, -2);
                if (word.endsWith('ing')) return word.slice(0, -3);
                if (word.endsWith('ed')) return word.slice(0, -2);
                if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
                return word;
            });

        // --- CONTEXT MEMORY ---
        let lastContextEntity = "";
        const recentHistory = history.slice(-3);
        const allTitles = knowledgeBase.map(k => k.title.toLowerCase());
        recentHistory.forEach(msg => {
            if (msg.role === 'assistant') {
                allTitles.forEach(title => {
                    if (msg.content.toLowerCase().includes(title)) lastContextEntity = title;
                });
            }
        });

        // --- SCORING ---
        const categoryBoost = {
            certification: "achievement",
            certificate: "achievement",
            award: "achievement",
            hackathon: "hackathon",
            project: "project",
            skill: "skill",
            education: "education"
        };

        const scoredItems = knowledgeBase.map(item => {
            let score = 0;
            const itemTitleLower = item.title.toLowerCase();

            // 1. Contextual History Boost
            if (lastContextEntity && itemTitleLower.includes(lastContextEntity)) score += 5;

            userTokens.forEach(token => {
                if (item.keywords.includes(token)) score += 4;
                else if (item.keywords.some(k => k.includes(token) || token.includes(k))) score += 2;
                if (itemTitleLower.includes(token)) score += 5;
                if (token.includes(item.type)) score += 4;
                Object.keys(categoryBoost).forEach(catWord => {
                    if (token.includes(catWord) && item.type === categoryBoost[catWord]) score += 6;
                });
            });
            return { ...item, score };
        });

        // --- ITEM SELECTION ---
        let relevantItems = scoredItems
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3); // Restrict to top 3 for cleaner context

        // Fallback if low confidence but RAG_SEARCH intent (e.g. "tell me something")
        if (relevantItems.length === 0 && intent === "RAG_SEARCH") {
            const typePriority = { 'project': 4, 'hackathon': 3, 'achievement': 2, 'skill': 1, 'education': 1, 'profile': 0 };
            relevantItems = scoredItems
                .sort((a, b) => (typePriority[b.type] || 0) - (typePriority[a.type] || 0))
                .slice(0, 3);
        }

        const relevantContext = relevantItems
            .map(item => `[${item.type.toUpperCase()}] ${item.title}\n${item.content}`)
            .join('\n\n');

        // --- NAVIGATION HINT (LLM Driven) ---
        let navigateTo = null;
        let openModalId = null;
        let highlightCard = null;

        if (relevantItems.length > 0) {
            const topItem = relevantItems[0];
            const typeMap = {
                'project': 'projects',
                'achievement': 'achievements',
                'education': 'education',
                'skill': 'skills',
                'hackathon': 'hackathon'
            };
            navigateTo = typeMap[topItem.type] || null;

            // Advanced: Open Modal or Highlight if VERY focused
            if (topItem.type === 'project' && topItem.score > 8) {
                // Assuming mapping ID to raw ID
                highlightCard = topItem.raw?.id;
            }
        }

        // Manual override for Certifications intent which fell through
        if (intent === "CERTIFICATIONS") navigateTo = "achievements";

        // --- SYSTEM PROMPT ---
        const systemPrompt = `
You are Helper AI — Shriram’s intelligent portfolio assistant.
Your GOAL is to convince recruiters of Shriram's expertise by providing structured, confident, and enthusiastic answers.
Respond like a technically articulate engineering student presenting professionally.

CONTEXT:
${relevantContext}

---
RESPONSE RULES:
1. **Be Structured**: Use short headings (e.g., "**Problem**", "**Approach**", "**Stack**"). Use concise bullet points.
2. **Be Enthusiastic & Confident**: Professional, energetic tone. No robotic "Based on context".
3. **Format**: Use Clean Markdown. **Bold** for emphasis. No code blocks for text.
4. **Refusal**: If context is empty or unrelated, reply: "I am not sure about that. Ask me something related to my work."
5. **No Hallucinations**: Stick strictly to the context provided.
---
`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...history.slice(-6),
            { role: "user", content: message }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: "llama-3.1-8b-instant",
            temperature: 0.3,
            max_tokens: 600,
        });

        const aiResponse = chatCompletion.choices[0]?.message?.content || "I couldn't process that.";

        return res.status(200).json({
            reply: aiResponse,
            navigateTo: navigateTo,
            highlightCard: highlightCard,
            openModalId: openModalId
        });

    } catch (error) {
        console.error("API Error:", error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
}
