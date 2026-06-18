import { profileData } from '../data/profileData.js';
import { projectsData } from '../data/projectsData.js';
import { hackathonsData } from '../data/hackathonsData.js';
import { achievements, certifications } from '../data/achievementsData.js';
import { skillsData } from '../data/skillsData.js';

// Helper to clean and tokenize text with normalization (Part 1 - Normalize Tokenization)
const tokenize = (text) => {
    if (!text) return [];
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/)
        .filter(word => word.length > 2) // Remove short words
        .map(word => {
            // Simple normalization for plurals and suffixes
            if (word.endsWith('ies')) return word.slice(0, -3) + 'y';
            if (word.endsWith('es')) return word.slice(0, -2);
            if (word.endsWith('ing')) return word.slice(0, -3);
            if (word.endsWith('ed')) return word.slice(0, -2);
            if (word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
            return word;
        });
};

// Helper to remove duplicates
const unique = (arr) => [...new Set(arr)];

export const buildPortfolioKnowledge = () => {
    const knowledgeBase = [];

    // 1. Profile Knowledge
    knowledgeBase.push({
        id: 'profile',
        type: 'profile',
        title: 'Profile Summary',
        content: `${profileData.name} is a ${profileData.role} based in ${profileData.location}. ${profileData.summary}`,
        keywords: unique([
            ...tokenize(profileData.role),
            ...tokenize(profileData.summary),
            "profile", "about", "bio", "resume", "summary"
        ]),
        raw: profileData
    });

    // 2. Education
    profileData.education.forEach((edu, index) => {
        knowledgeBase.push({
            id: `education-${index}`,
            type: 'education',
            title: edu.institution,
            content: `Studied ${edu.degree} at ${edu.institution} (${edu.year}).`,
            keywords: unique([
                ...tokenize(edu.institution),
                ...tokenize(edu.degree),
                "education", "college", "degree", "study"
            ]),
            raw: edu
        });
    });

    // 3. Projects
    projectsData.forEach(project => {
        const featureText = project.features ? project.features.join(" ") : "";
        const techText = project.tech ? project.tech.join(" ") : "";

        knowledgeBase.push({
            id: `project-${project.id}`,
            type: 'project',
            title: project.title,
            content: `${project.title}: ${project.description}. Technologies used: ${techText}. Key features: ${featureText}`,
            keywords: unique([
                ...tokenize(project.title),
                ...tokenize(project.description),
                ...tokenize(featureText),
                ...project.tech.map(t => t.toLowerCase()),
                "project", "work", "portfolio"
            ]),
            raw: project
        });
    });

    // 4. Hackathons
    hackathonsData.forEach(hack => {
        const techText = hack.technologies ? hack.technologies.join(" ") : "";

        knowledgeBase.push({
            id: `hackathon-${hack.id}`,
            type: 'hackathon',
            title: hack.title,
            content: `Won ${hack.achievement} at ${hack.title} (${hack.theme}). Project: ${hack.solutionName}. ${hack.description}`,
            keywords: unique([
                ...tokenize(hack.title),
                ...tokenize(hack.theme),
                ...tokenize(hack.achievement),
                ...tokenize(hack.solutionName),
                ...tokenize(hack.description),
                "hackathon", "winner", "achievement", "competition"
            ]),
            raw: hack
        });
    });

    // 5. Achievements & Certifications
    [...achievements, ...certifications].forEach((item, index) => {
        knowledgeBase.push({
            id: `achievement-${index}`,
            type: 'achievement',
            title: item.title,
            content: `${item.title} by ${item.organization || item.issuer}. Result/Score: ${item.result || item.score}.`,
            keywords: unique([
                ...tokenize(item.title),
                ...tokenize(item.organization || item.issuer),
                "achievement", "certification", "award", "certificate"
            ]),
            raw: item
        });
    });

    // 6. Skills
    skillsData.forEach(cat => {
        cat.skills.forEach(skill => {
            knowledgeBase.push({
                id: `skill-${skill.name}`,
                type: 'skill',
                title: skill.name,
                content: `Skilled in ${skill.name} (${cat.title}). Proficiency level: ${skill.level}%.`,
                keywords: unique([
                    ...tokenize(skill.name),
                    ...tokenize(cat.title),
                    "skill", "tech", "stack"
                ]),
                raw: skill
            });
        })
    });

    return knowledgeBase;
};
