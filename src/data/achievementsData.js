export const achievements = [
    {
        id: 1,
        title: 'Code Noobies',
        organization: 'Anna University (CSMIT)',
        result: 'Winner (1st Place)',
        date: 'Mar 2025',
        description: "Competitive coding event by Computer Society of MIT at Chakravyuha '25. Secured 1st place among participants from multiple colleges across Tamil Nadu.",
        color: 'text-yellow-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(250,204,21,0.8)] hover:border-yellow-400',
        icon: 'Trophy'
    },
    {
        id: 2,
        title: 'Project Expo (Nexus 7.0)',
        organization: 'Easwari Engineering College',
        result: 'Runner Up (2nd)',
        date: 'Oct 2025',
        description: "Industry-Institution Summit project competition by Dept. of CSE and AI&ML at Easwari. Presented an AI project to a live industry evaluation panel.",
        color: 'text-blue-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(59,130,246,0.8)] hover:border-blue-400',
        icon: 'Trophy'
    },
    {
        id: 3,
        title: 'Code Mathrix',
        organization: 'CEG, Anna University',
        result: 'Runner Up (2nd)',
        date: 'Mar 2025',
        description: "Mathematics-based coding competition at Mathrix'25 by Mathematics Colloquium, College of Engineering Guindy, Anna University.",
        color: 'text-cyan-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(34,211,238,0.8)] hover:border-cyan-400',
        icon: 'Trophy'
    },
    {
        id: 4,
        title: 'Pseudo 2 Code',
        organization: 'CEG, Anna University',
        result: 'Runner Up (2nd)',
        date: 'Mar 2025',
        description: "Algorithmic pseudocode and problem-solving challenge at CEG, Anna University. Tested logic-building and code translation under time constraints.",
        color: 'text-pink-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(244,114,182,0.8)] hover:border-pink-400',
        icon: 'Trophy'
    },
    {
        id: 5,
        title: 'Reverse Coding',
        organization: 'Chennai Institute of Technology',
        result: '3rd Place',
        date: 'July 2025',
        description: "Logic-based reverse engineering coding challenge at Tech Fiesta'25, Chennai Institute of Technology.",
        color: 'text-orange-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(251,146,60,0.8)] hover:border-orange-400',
        icon: 'Trophy'
    },
    {
        id: 6,
        title: 'Science & Mathematics Olympiad',
        organization: 'SOF (NSO & IMO)',
        result: 'School Rank 1',
        date: 'Competitive Exam',
        description: "National-level NSO & IMO Olympiads conducted by SOF. Achieved School Rank 1 in both science and mathematics categories.",
        color: 'text-teal-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(45,212,191,0.8)] hover:border-teal-400',
        icon: 'Trophy'
    },
    {
        id: 7,
        title: 'School Topper (Class 10)',
        organization: "Swamy's School",
        result: 'Rank 1 (97.4%)',
        date: 'Academic',
        description: "Secured school first rank in CBSE Class 10 board examinations with an aggregate score of 97.4%.",
        color: 'text-purple-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(192,132,252,0.8)] hover:border-purple-400',
        icon: 'Trophy'
    },
    {
        id: 8,
        title: 'School Rank Holder (Class 12)',
        organization: "Swamy's School",
        result: 'Rank 3 (95.8%)',
        date: 'Academic',
        description: "Secured school third rank in CBSE Class 12 board examinations with an aggregate score of 95.8%.",
        color: 'text-indigo-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(129,140,248,0.8)] hover:border-indigo-400',
        icon: 'Trophy'
    },
    {
        id: 9,
        title: 'Hindi Pandit',
        organization: 'Dakshin Bharat Hindi Prachar Sabha',
        result: '8 Levels Completed',
        date: 'Language',
        description: "Completed all 8 levels of Hindi examinations conducted by Dakshin Bharat Hindi Prachar Sabha.",
        color: 'text-rose-400',
        glow: 'hover:shadow-[0_0_80px_-10px_rgba(251,113,133,0.8)] hover:border-rose-400',
        icon: 'Trophy'
    },
];

export const certificationGroups = [
    {
        id: 'nptel',
        platform: 'NPTEL',
        coursesCount: 5,
        certs: [
            {
                title: 'Natural Language Processing',
                grade: 'Elite',
                description: 'Text processing, transformers, and NLP model training',
                verifyLink: '#'
            },
            {
                title: 'Blockchain and its Applications',
                grade: 'Elite',
                description: 'Distributed ledger, smart contracts, and decentralized apps',
                verifyLink: '#'
            },
            {
                title: 'Industry 4.0 & IoT',
                grade: 'Elite + Silver',
                description: 'Industrial IoT protocols, automation, and cyber-physical systems',
                verifyLink: '#'
            },
            {
                title: 'Human-Computer Interfaces',
                grade: 'Elite',
                description: 'UX design principles, interaction models, usability evaluation',
                verifyLink: '#'
            },
            {
                title: 'Problem Solving in C',
                grade: 'Completed',
                description: 'Algorithmic problem solving and C programming fundamentals',
                verifyLink: '#'
            }
        ]
    },
    {
        id: 'aws',
        platform: 'AWS',
        coursesCount: 4,
        certs: [
            {
                title: 'Cloud Quest: Cloud Practitioner',
                grade: 'Completed',
                description: 'Core AWS services, cloud concepts, global infrastructure',
                verifyLink: '#'
            },
            {
                title: 'Cloud Quest: Solutions Architect',
                grade: 'Completed',
                description: 'Resilient, cost-effective cloud architecture design on AWS',
                verifyLink: '#'
            },
            {
                title: 'Cloud Quest: Serverless Developer',
                grade: 'Completed',
                description: 'Serverless apps using Lambda, API Gateway, and DynamoDB',
                verifyLink: '#'
            },
            {
                title: 'Cloud Quest: Generative AI Practitioner',
                grade: 'Completed',
                description: 'Foundational GenAI and AWS AI/ML services',
                verifyLink: '#'
            }
        ]
    },
    {
        id: 'other',
        platform: 'Other',
        coursesCount: 3,
        certs: [
            {
                title: 'Foundation in Programming and Data Science',
                grade: 'Foundation',
                description: 'Python, Statistics, and Data Science fundamentals',
                verifyLink: '#'
            },
            {
                title: 'AI + Sustainability Virtual Internship',
                grade: 'Completed',
                description: 'AI applications for sustainable development goals',
                verifyLink: '#'
            },
            {
                title: 'Art of Prompting',
                grade: 'Completed',
                description: 'Prompt engineering techniques for LLMs',
                verifyLink: '#'
            }
        ]
    }
];

export const certifications = certificationGroups.flatMap((group) =>
    group.certs.map((cert, index) => ({
        id: `${group.id}-${index}`,
        title: cert.title,
        issuer: group.platform,
        score: cert.grade,
        description: cert.description,
        verifyLink: cert.verifyLink
    }))
);
