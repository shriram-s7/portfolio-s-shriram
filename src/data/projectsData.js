export const projectsData = [
    {
        id: "auramed",
        title: "AuraMed",
        description: "Unified multi-pathology diagnostic suite using Vision Transformers (ViT-B/16) for automated detection of Breast Cancer, Cervical Cancer & PCOS. Integrates Grad-CAM XAI heatmaps for clinical explainability and trust.",
        features: [
            "Developed AuraMed, a unified multi-pathology diagnostic system leveraging Vision Transformers (ViT-B/16) for automated breast cancer, cervical cancer, and PCOS detection.",
            "Integrated Grad-CAM explainable AI (XAI) heatmaps to visualize model attention maps, improving clinical interpretability and trust for healthcare providers.",
            "Built a high-performance backend serving transformer inference with low latency to support interactive diagnostic tools."
        ],
        tech: ["Python", "PyTorch", "FastAPI", "ViT", "Grad-CAM"],
        githubUrl: "https://github.com/shriram-s8/AURAMED-NEW-FRONTEND.git",
        demoUrl: "https://youtu.be/VDGofKZ1XwU",
        icon: "HeartPulse",
        color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        neon: "hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.6)] hover:border-cyan-400",
    },
    {
        id: 0,
        title: 'Dynamic Route Optimization System',
        description: 'Real-time fleet routing with controlled decision points and deadline-aware execution.',
        features: [
            "Designed a real-time fleet routing engine that executes multi-stop delivery routes while continuously monitoring traffic, weather disruptions, and dynamic deadline updates.",
            "Implemented controlled decision-point evaluation logic to prevent unstable continuous rerouting while ensuring delivery feasibility and fuel-efficient execution.",
            "Developed dispatcher–driver interaction workflows enabling deadline adjustments and direct instruction-based intervention during live execution.",
            "Integrated simulation layers for traffic congestion and rain impact to test system responsiveness under dynamic operational conditions."
        ],
        tech: ['Python', 'FastAPI', 'OpenStreetMap', 'WebSockets', 'OR-Tools'],
        githubUrl: 'https://github.com/shriram-s8/DYNAMIC-ROUTE-OPTIMIZATION-SYSTEM.git',
        demoUrl: 'https://youtu.be/uunL2gQFaAw',
        icon: 'Car',
        color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
        neon: 'hover:shadow-[0_0_50px_-10px_rgba(251,146,60,0.6)] hover:border-orange-400',
    },
    {
        id: 1,
        title: 'Aadhaar Update Pressure Intelligence System',
        description: 'District-level operational pressure detection using update–enrolment imbalance and age-aware analytics.',
        features: [
            "Designed a governance-aware analytical framework that converts Aadhaar enrolment and update activity into a district-level Update Pressure Index for proactive service planning.",
            "Implemented reference-based state normalization and conservative district cleaning to ensure audit-safe aggregation and prevent analytical distortion.",
            "Developed an age-aware modeling layer aligning heterogeneous demographic and biometric datasets into a unified analytical structure.",
            "Engineered composite pressure signals including update–enrolment imbalance, age-driven demand contribution, and biometric workload intensity.",
            "Built an interactive decision-support prototype enabling administrators to inspect district rankings, pressure drivers, and recommended operational actions."
        ],
        tech: ['Python', 'Pandas', 'Streamlit', 'Data Engineering', 'Governance Analytics'],
        githubUrl: 'https://github.com/shriram-s8/AADHAAR-PRESSURE-UPDATE-INTELLIGENCE-SYSTEM.git',
        demoUrl: 'https://youtu.be/P_dZWWPQM_c',
        icon: 'Activity',
        color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        neon: 'hover:shadow-[0_0_50px_-10px_rgba(34,211,238,0.6)] hover:border-cyan-400',
    },
    {
        id: 2,
        title: 'Smart Traffic Management',
        description: 'AI-driven traffic optimization using Computer Vision & Deep Learning.',
        features: [
            "Integrated YOLOv8 for high-accuracy real-time vehicle detection and counting.",
            "Deployed LSTM neural networks to predict future congestion patterns based on historical data.",
            "Implemented dynamic signal timing adjustments to reduce average wait times and fuel consumption."
        ],
        tech: ['Python', 'YOLOv8', 'OpenCV', 'LSTM', 'Flask'],
        githubUrl: 'https://github.com/shriram-s8',
        demoUrl: 'https://youtu.be/sAb1IaTKYYg',
        icon: 'Car',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        neon: 'hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.6)] hover:border-emerald-400',
    },
    {
        id: 3,
        title: 'UFDR Analyzer Tool',
        description: 'Digital forensics tool using NLP for text analysis and NetworkX for visualization.',
        features: [
            "Automated the parsing of complex UFDR mobile extraction reports to accelerate forensic investigations.",
            "Applied Natural Language Processing (NLP) to automatically flag suspicious keywords and sentiment in chat logs.",
            "Visualized suspect communication networks using NetworkX to identify key connections and hierarchies."
        ],
        tech: ['Python', 'NLP', 'NetworkX', 'Pandas', 'Data Viz'],
        githubUrl: 'https://github.com/shriram-s8/UFDR-ANALYZER-TOOL.git',
        demoUrl: 'https://youtu.be/Ydn5dh8-xas',
        icon: 'Search',
        color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        neon: 'hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.6)] hover:border-blue-400',
    },
    {
        id: 4,
        title: 'Movie Ticket Booking',
        description: 'Desktop application for theatre management and booking.',
        features: [
            "Designed a responsive desktop UI using Java Swing and AWT for seamless user interaction.",
            "Built a visual seat selection interface with real-time availability updates.",
            "Integrated a MySQL database to securely handle bookings, user profiles, and show timings."
        ],
        tech: ['Java', 'Swing', 'JDBC', 'MySQL', 'AWT'],
        githubUrl: 'https://github.com/shriram-s8/MOVIE-TICKET-BOOKING-SYSTEM-JAVA.git',
        demoUrl: 'https://youtu.be/FnWqxZYr6aU',
        icon: 'Film',
        color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
        neon: 'hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.6)] hover:border-orange-400',
    },
    {
        id: 5,
        title: 'Hospital Management',
        description: 'Comprehensive system for managing hospital operations and patient data.',
        features: [
            "Streamlined patient registration and appointment scheduling workflows to reduce administrative load.",
            "Implemented role-based access control for doctors, staff, and admins to ensure data security.",
            "Managed complex medical records and prescription history using a robust relational database architecture."
        ],
        tech: ['Web Dev', 'Database', 'Management'],
        githubUrl: 'https://github.com/shriram-s8/HOSPITAL-MANAGEMENT-SYSTEM-V2-WITH-VUE.git',
        demoUrl: 'https://youtu.be/ing8-6VmQz0',
        icon: 'Activity',
        color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        neon: 'hover:shadow-[0_0_50px_-10px_rgba(192,132,252,0.6)] hover:border-purple-400',
    },
];
