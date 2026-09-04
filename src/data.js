/**
 * Single source of truth for the portfolio.
 * Update your face: replace public/assets/me.jpg (keep the same filename).
 * Add AI videos: drop mp4/webm into public/assets/videos/ and list them in media.videos below.
 */

export const profile = {
    name: "Tarandeep Singh Juneja",
    firstName: "Tarandeep",
    lastName: "Singh Juneja",
    role: "Backend & AI Systems Engineer",
    hook: "I ship FastAPI backends and AI workflows that hold up outside the demo.",
    headline: "Backend and AI systems engineer building APIs, RAG pipelines, and tools people actually use.",
    tagline: "Final-year CS at Vellore Institute of Technology. IIT Bombay FOSSEE intern. Meta Hacker Cup top 500.",
    location: "India",
    phone: "+91-9098520440",
    email: "tarandeepjuneja11@gmail.com",
    currentStatus: "Final-year CS at VIT · IIT Bombay FOSSEE alum · building FastAPI and AI systems",

    about: [
        "I build backend services, API layers, and practical AI applications: FastAPI, RAG pipelines, LLM integrations, and containerized systems.",
        "Recent work includes healthcare claims automation with FHIR writebacks, document generation with failover layers, and open-source contributions to IIT Bombay's Osdag."
    ],

    hero: {
        greeting: "Hello! I Am",
        accentLine: "An engineer who ships systems people can trust.",
        accentWord: "trust",
        subline: "Because if the API fails in production, the demo never mattered.",
        bigLine: "I'm a Backend & AI Systems Engineer.",
    },

    /** Portrait, reels, and AI video prompts — edit paths here */
    media: {
        portrait: "/assets/me.jpg",
        portraitNote: "Replace public/assets/me.jpg to update your face everywhere (hero + media).",
        videos: [
            // { id: "reel-1", src: "/assets/videos/reel-1.mp4", poster: "/assets/me.jpg", title: "Cinematic desk" },
            // { id: "reel-2", src: "/assets/videos/reel-2.mp4", poster: "/assets/me.jpg", title: "Orbital portrait" },
            // { id: "reel-3", src: "/assets/videos/reel-3.mp4", poster: "/assets/me.jpg", title: "Code glow" },
        ],
        videoPrompts: [
            {
                id: "prompt-1",
                title: "Cinematic neon desk",
                tool: "Runway / Kling / Luma Dream Machine",
                tip: "Film a 5–8s clip of yourself at a laptop in dim light, then use that as the image reference with this prompt.",
                prompt:
                    "Cinematic close-up of a young Indian software engineer with short dark hair at a black laptop in a dim atelier. Warm apricot rim light (#ff6b3d) and cool mint accent glow on one side of his face. Charcoal background, film grain, shallow depth of field, slow push-in, editorial portfolio intro, 4K, no text, no logos.",
            },
            {
                id: "prompt-2",
                title: "Orbital AI portrait",
                tool: "Kling / Viggle / Runway Gen-3",
                tip: "Upload your clear front-facing photo as the subject lock, then generate a looping 4–6s orbit.",
                prompt:
                    "Photoreal portrait of the same young man, head-and-shoulders, calm gaze. Dark charcoal void with floating warm bone dust and thin mint light trails orbiting behind him. Soft apricot catchlight in the eyes. Smooth subtle head turn, premium editorial commercial, 4K, no text.",
            },
            {
                id: "prompt-3",
                title: "Code-glow focus",
                tool: "Pika / Runway / CapCut AI",
                tip: "Shoot yourself typing on your phone or laptop; use the clip as reference so the face matches you.",
                prompt:
                    "Medium shot of a focused backend engineer coding on dual monitors with Python and API diagrams. Face lit by cool mint screen glow mixed with warm apricot ambient. Camera pans from mechanical keyboard to face. Obsidian atelier mood, clean high contrast, 4K cinematic, no watermarks, no text.",
            },
        ],
    },

    stats: [
        { label: "Meta Hacker Cup", value: "#186", detail: "Top 500 globally" },
        { label: "Problems solved", value: "700+", detail: "DSA across platforms" },
        { label: "DocuGenAI uptime", value: "99.5%", detail: "3 API fallback layers" },
        { label: "Osdag reach", value: "10k+", detail: "Engineers served via FOSSEE" },
    ],

    featuredProjectIds: [
        "TRA Research Agent",
        "NDR Rescue AI",
        "DocuGenAI",
        "Attainly / AutoReach",
        "Clinic Ops Agent",
        "Harbour RAG",
    ],

    showcaseCallouts: [
        { id: "api", label: "Guaranteed APIs", detail: "Pydantic contracts, fallbacks, 99.5% uptime paths", x: "8%", y: "26%" },
        { id: "fhir", label: "Real integrations", detail: "Epic, Cerner, Stripe, Gmail, FHIR writebacks", x: "10%", y: "72%" },
        { id: "ship", label: "On-time shipping", detail: "Docker, CI/CD, monitored releases", x: "78%", y: "28%", align: "right" },
        { id: "hard", label: "Production hardening", detail: "Tests, rate limits, audit logs, ABAC", x: "76%", y: "70%", align: "right" },
    ],

    process: [
        { step: "01", title: "Trace the mess", body: "Map the workflow, failure modes, and every place a human still has to touch it." },
        { step: "02", title: "Ship a real loop", body: "FastAPI or agent prototype with live integrations — not a notebook demo." },
        { step: "03", title: "Harden the path", body: "Fallbacks, tests, rate limits, monitoring. Keep going until it is production-shaped." },
    ],

    skills: {
        frontend: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind", "Vue.js", "Angular"],
        backend: ["Python", "C++", "FastAPI", "REST APIs", "JWT/OAuth", "PostgreSQL", "MongoDB", "Redis"],
        ai: ["PyTorch", "RAG", "LLM APIs", "Scikit-Learn", "Prompt Engineering", "Streamlit", "Embeddings"],
        cloud: ["Docker", "AWS", "CI/CD", "Nginx", "Prometheus", "Grafana", "Oracle Cloud"],
        icons: [
            { name: "React", src: "/tech/reactjs.png" },
            { name: "TypeScript", src: "/tech/typescript.png" },
            { name: "JavaScript", src: "/tech/javascript.png" },
            { name: "Node", src: "/tech/nodejs.png" },
            { name: "MongoDB", src: "/tech/mongodb.png" },
            { name: "Docker", src: "/tech/docker.png" },
            { name: "Git", src: "/tech/git.png" },
            { name: "Tailwind", src: "/tech/tailwind.png" },
            { name: "Redux", src: "/tech/redux.png" },
            { name: "Three.js", src: "/tech/threejs.svg" },
            { name: "HTML", src: "/tech/html.png" },
            { name: "CSS", src: "/tech/css.png" },
            { name: "Figma", src: "/tech/figma.png" },
        ],
    },

    education: [
        {
            degree: "Bachelor of Technology in Computer Science and Engineering",
            institution: "Vellore Institute of Technology (VIT)",
            period: "August 2022 - May 2026",
            details:
                "CGPA: 8.62/10. Focus on backend engineering, system design, database management, and applied artificial intelligence. Event Management Co-Lead at EDU4U Club, VIT Bhopal.",
        },
    ],

    experience: [
        {
            role: "Software Developer Intern",
            company: "FOSSEE, IIT Bombay",
            period: "February 2025 - June 2025",
            location: "Mumbai, India (Hybrid)",
            short: "Shipped UI and calculation flows for Osdag, used by 10k+ structural engineers.",
            points: [
                "Contributed to Osdag, an open-source structural engineering software utilized by 10,000+ structural engineers.",
                "Developed interactive UI components and backend calculations for plate girder flows and bolted connection checks.",
                "Reduced manual data entry errors by 40% via strict front-to-back input schema validations.",
                "Lowered post-release bug reports by 30% by refactoring monolithic code into modular component architectures within a 5-member team.",
            ],
            tech: "Python, UI Components, SDLC, Git, PyQt5",
            icon: "building",
        },
        {
            role: "Software Taxonomy Analyst",
            company: "Outlier AI",
            period: "September 2024 - January 2025",
            location: "Remote",
            short: "Validated RL training code with 98% accuracy across 100+ weekly snippets.",
            points: [
                "Validated 100+ complex code snippets weekly with 98% accuracy for reinforcement learning training sets.",
                "Identified and cataloged 50+ critical edge cases in multi-threaded scripts and backend integrations.",
                "Processed and reviewed 500+ computer science and coding problems weekly, defining precise evaluation taxonomies.",
            ],
            tech: "Python, C++, System Design, AI Training Datasets",
            icon: "brain",
        },
    ],

    workCards: [
        {
            title: "TRA Research Agent",
            desc: "Enterprise AI research pipeline on Azure: sources, findings, contradictions, and traceable conclusions.",
            href: "https://modus-tra.azurewebsites.net",
            icon: "brain",
        },
        {
            title: "NDR Rescue AI",
            desc: "Ops console that recovers failed last-mile deliveries with Bolna voice agents before RTO.",
            href: "https://ndrrescue.netlify.app",
            icon: "mail",
        },
        {
            title: "DocuGenAI",
            desc: "Document generation with 50+ REST endpoints and 3 API fallback layers at 99.5% uptime.",
            href: "https://docugenaii.netlify.app/",
            icon: "file",
        },
        {
            title: "Clinic Ops Agent",
            desc: "HIPAA-ready claims platform with FHIR writebacks across Epic, Cerner, and four more EHR stacks.",
            href: "https://clinic-ops-agent-gt7x.onrender.com/",
            icon: "heart",
        },
    ],

    projects: [
        {
            title: "TRA Research Agent",
            eyebrow: "Enterprise AI · Azure",
            description:
                "Modus enterprise AI research agent that runs a full research pipeline: questions, sources, findings, contradictions, and traceable conclusions.",
            impact:
                "Deployed on Azure App Service. Reusable research knowledge base so evaluators can ask a new question and watch the pipeline run, not a chatbot wrapper.",
            tech: ["Python", "FastAPI", "RAG", "Azure App Service", "LLM APIs"],
            repoLink: "",
            liveLink: "https://modus-tra.azurewebsites.net",
            image: "/assets/projects-screenshots/codingducks/landing.png",
            cover: { tone: "mint", code: "TRA", stack: "Azure · Research pipeline" },
        },
        {
            title: "NDR Rescue AI",
            eyebrow: "Logistics · Voice AI",
            description:
                "Ops console that recovers failed last-mile deliveries before return-to-origin using a Bolna voice agent.",
            impact:
                "Next.js and PostgreSQL state machine: trigger call, webhook outcomes, SSE dashboard, no-answer recovery ladder. Live on Netlify.",
            tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Bolna Voice AI", "SSE"],
            repoLink: "https://github.com/tsj2003/NDR-Rescue-AI",
            liveLink: "https://ndrrescue.netlify.app",
            image: "/assets/projects-screenshots/the-booking-desk/landing.png",
            cover: { tone: "apricot", code: "NDR", stack: "Next.js · Bolna · Neon" },
        },
        {
            title: "DocuGenAI",
            eyebrow: "AI Document Platform",
            description: "AI-powered document generation engine for creating professional PowerPoint decks and Word documents.",
            impact:
                "Exposes 50+ REST endpoints. Fault-tolerant backend with 3 API fallback layers sustaining 99.5% uptime and reducing output latency by 60%.",
            tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "LLM APIs"],
            repoLink: "https://github.com/tsj2003/docugenai",
            liveLink: "https://docugenaii.netlify.app/",
            image: "/assets/projects-screenshots/codingducks/landing.png",
            cover: { tone: "apricot", code: "02", stack: "React · FastAPI · 99.5%" },
        },
        {
            title: "Attainly / AutoReach",
            eyebrow: "Outreach Automation · Azure",
            description:
                "Personalized outreach and sequencing automation with Gmail API bindings, DNS validation, and a hosted Attainly web app.",
            impact:
                "Dispatched 2,900 emails with a 97.9% delivery rate and 90% inbox placement. DNS MX checks cut bounce rates 83%. Live on Azure Container Apps.",
            tech: ["Python", "Gmail API", "DNS Validation", "Azure Container Apps", "Jinja2"],
            repoLink: "https://github.com/tsj2003/AutoReach-AI",
            liveLink:
                "https://attainly-web.ashymeadow-644c5a42.swedencentral.azurecontainerapps.io/app/login",
            image: "/assets/projects-screenshots/ghostchat/1.png",
            cover: { tone: "mint", code: "04", stack: "Gmail API · Azure · 97.9%" },
        },
        {
            title: "Clinic Ops Agent",
            eyebrow: "Healthcare Claims Platform",
            description:
                "HIPAA-compliant healthcare operations agent that automates claim submissions and scrubs FHIR writebacks.",
            impact:
                "Architected FastAPI backend with 41 modules. Integrated Epic, Cerner, athenahealth, Allscripts, and eClinicalWorks FHIR endpoints. Features a 7-service Docker infrastructure (Redis, Prometheus, Grafana, Nginx), Fernet encryption, and ABAC controls.",
            tech: ["Python", "FastAPI", "MongoDB Atlas", "Docker", "Redis", "Prometheus", "Grafana", "FHIR", "HIPAA"],
            repoLink: "https://github.com/tsj2003/clinic-ops-agent",
            liveLink: "https://clinic-ops-agent-gt7x.onrender.com/",
            image: "/assets/projects-screenshots/the-booking-desk/landing.png",
            cover: { tone: "mint", code: "01", stack: "FastAPI · FHIR · Docker" },
        },
        {
            title: "Harbour RAG",
            eyebrow: "Enterprise RAG · Azure",
            description: "Azure-hosted RAG application for grounded retrieval over document corpora.",
            impact: "Deployed on Azure App Service with a live retrieval UI for document Q&A workflows.",
            tech: ["Python", "RAG", "Azure App Service", "Embeddings", "LLM APIs"],
            repoLink: "",
            liveLink: "https://app-harbour-rag-dev-66ce.azurewebsites.net",
            image: "/assets/projects-screenshots/couponluxury/cms-1.png",
            cover: { tone: "apricot", code: "HRB", stack: "Azure · RAG" },
        },
        {
            title: "Diligent Expense API",
            eyebrow: "Expense Tracker API · Azure",
            description: "Expense tracking API with interactive OpenAPI docs, deployed on Azure App Service.",
            impact: "Live FastAPI docs endpoint for exploring routes, schemas, and try-it-out flows.",
            tech: ["Python", "FastAPI", "Azure App Service", "OpenAPI"],
            repoLink: "",
            liveLink: "https://diligent-expense-api-33d41d17.azurewebsites.net/docs",
            image: "/assets/projects-screenshots/couponluxury/landing.png",
            cover: { tone: "mint", code: "API", stack: "FastAPI · Azure" },
        },
        {
            title: "BillBuddy",
            eyebrow: "Billing Workflow",
            description: "Concurrent-safe expense splitting and billing application featuring Stripe webhook subscriptions.",
            impact:
                "Wrote 51 rigorous automated tests, handling 200+ simulated concurrent transactions via Stripe webhooks. Accelerated deployment cycles by 75% via Docker.",
            tech: ["FastAPI", "Stripe API", "Docker", "CI/CD", "PostgreSQL", "TypeScript"],
            repoLink: "https://github.com/tsj2003/billbuddy",
            liveLink: "",
            image: "/assets/projects-screenshots/couponluxury/landing.png",
        },
        {
            title: "Pothole Detection System",
            eyebrow: "Computer Vision · Omdena",
            description: "Collaborative pothole detection and classification system for public road safety analysis.",
            impact:
                "Partnered with a 12-member international team under Omdena. Annotated 2,000+ images via Roboflow, raising detection accuracy by 15%.",
            tech: ["Python", "Computer Vision", "Roboflow", "YOLO", "Datasets"],
            repoLink: "",
            liveLink: "",
            image: "",
        },
        {
            title: "AI-PPT-and-DOC-Gen",
            eyebrow: "Generative App",
            description: "Full-stack Streamlit app for generating presentations and documents from plain text prompts.",
            impact:
                "Integrated OpenAI API and optimized core SQL metadata queries, improving query processing speed by 50% for large file sets.",
            tech: ["Python", "Streamlit", "OpenAI API", "PostgreSQL"],
            repoLink: "https://github.com/tsj2003/AI-PPT-and-DOC-Gen",
            liveLink: "",
            image: "",
        },
        {
            title: "Retail Sense",
            eyebrow: "Retail Analytics",
            description: "Operational retail insights and inventory dashboard featuring type-safe data visualization widgets.",
            impact: "Created clean visual representations of complex inventory cycles and transaction metrics for retail store owners.",
            tech: ["TypeScript", "React", "Recharts", "Tailwind CSS"],
            repoLink: "https://github.com/tsj2003/Retail-Sense",
            liveLink: "https://retailsense.netlify.app/",
            image: "/assets/projects-screenshots/codingducks/landing.png",
        },
        {
            title: "NITT Karam",
            eyebrow: "Community Initiative",
            description: "A customized frontend experience built for the NITT Karam community platform.",
            impact: "Shipped custom micro-interactions, responsive styling, and a clean, high-performance UI experience.",
            tech: ["TypeScript", "React", "Vite", "Tailwind CSS"],
            repoLink: "https://github.com/tsj2003/Nitt-karam",
            liveLink: "https://nittkaram.netlify.app/",
            image: "/assets/projects-screenshots/ghostchat/1.png",
        },
        {
            title: "BharatRAG Enterprise",
            eyebrow: "Grounded AI System",
            description: "Enterprise-grade Retrieval-Augmented Generation system with custom grounding and citations.",
            impact: "Hybrid semantic search over PDF/doc pools, custom vector databases, and precise source attribution.",
            tech: ["Python", "RAG", "ChromaDB", "Embeddings", "LLM APIs"],
            repoLink: "https://github.com/tsj2003/BharatRAG_Enterprise",
            liveLink: "",
            image: "/assets/projects-screenshots/couponluxury/cms-1.png",
            cover: { tone: "apricot", code: "RAG", stack: "ChromaDB · Embeddings" },
        },
        {
            title: "Seat Reservation",
            eyebrow: "Booking System",
            description: "Angular-based ticket booking and seat reservation UI with state synchronization.",
            impact: "Interactive seating grids, live reservation timers, and clean local state management.",
            tech: ["TypeScript", "Angular", "State Management", "Tailwind CSS"],
            repoLink: "https://github.com/tsj2003/seat-reservation",
            liveLink: "",
            image: "",
        },
        {
            title: "AI Manga Generator",
            eyebrow: "Generative AI",
            description: "AI-based illustration creator that transforms textual prompts into structured comic panel images.",
            impact: "Image generation scripts, stable diffusion integration, and custom model weight loaders.",
            tech: ["Python", "Stable Diffusion", "Generative AI"],
            repoLink: "https://github.com/tsj2003/AI-Manga-generator",
            liveLink: "",
            image: "",
        },
        {
            title: "Bridge Cost Comparison",
            eyebrow: "Engineering Desktop App",
            description: "Desktop software comparing material costs between structural steel and concrete bridge designs.",
            impact: "Pairs engineering calculation workflows with PyQt5 forms and offline SQLite analytical data logs.",
            tech: ["Python", "PyQt5", "SQLite", "Desktop UI"],
            repoLink:
                "https://github.com/tsj2003/Steel-vs.-Concrete-Bridge-Cost-Comparison-Software-with-SQLite-and-PyQt5",
            liveLink: "",
            image: "",
        },
        {
            title: "Audio Intelligence",
            eyebrow: "Audio AI Demo",
            description: "Audio processing tool for transcription parsing, sentiment analysis, and audio signal insights.",
            impact: "Specialized audio analysis dashboard using Web Audio API modules and text summarizers.",
            tech: ["TypeScript", "React", "Web Audio API"],
            repoLink: "https://github.com/tsj2003/Audio-Intelligence-",
            liveLink: "",
            image: "",
        },
        {
            title: "Leave Management App",
            eyebrow: "Business Workflow",
            description: "HR workflow dashboard for employee absence tracking, leave approval, and calendar sync.",
            impact: "Multi-role admin controls, request flows, and responsive calendar dashboard grids.",
            tech: ["Vue.js", "Vuex", "HR Workflows", "Tailwind CSS"],
            repoLink: "https://github.com/tsj2003/leave-management-app",
            liveLink: "",
            image: "",
        },
    ],

    openSource: [
        {
            title: "Osdag Core Contributions",
            description: "Contributed to IIT Bombay FOSSEE's Osdag structural design engineering project codebase.",
            link: "https://github.com/osdag-admin/Osdag",
        },
        {
            title: "Merged PR #5",
            description: "UI enhancements and input checks inside bolted joint calculation flows.",
            link: "https://github.com/AmanAg744/Osdag/pull/5",
        },
        {
            title: "Merged PR #6",
            description: "Improved input validation and exception catching for plate girder designs.",
            link: "https://github.com/AmanAg744/Osdag/pull/6",
        },
        {
            title: "Merged PR #7",
            description: "Calculations updates for structural engineering bolted calculations.",
            link: "https://github.com/AmanAg744/Osdag/pull/7",
        },
    ],

    achievements: [
        {
            title: "McKinsey Forward Program",
            award: "Graduate",
            rank: "Selected Member",
            desc: "Completed McKinsey's program focusing on digital adaptability, problem-solving, and leadership skills.",
        },
        {
            title: "Meta x PyTorch Hackathon 2025",
            award: "Global Finalist",
            rank: "Top 800",
            desc: "Placed in the top 800 teams globally out of 32,000+ participating teams.",
        },
        {
            title: "YC Startup School India 2026",
            award: "Selected Cohort",
            rank: "Top 2000",
            desc: "Selected for the intensive startup foundations and product-market fit program from 25,000+ applicants.",
        },
        {
            title: "Meta Hacker Cup 2025",
            award: "Top 500 Globally",
            rank: "Top 1.5%",
            desc: "Ranked 186 in initial phases, placing in top 500 globally out of 35,000+ competitive programmers.",
        },
        {
            title: "Adobe GenSolve 2024",
            award: "Semi-Finalist",
            rank: "Top 5%",
            desc: "Finished in the top 5% nationwide in business-engineering problem solving.",
        },
        {
            title: "Infosys HackWithInfy 2025",
            award: "National Finalist",
            rank: "Top Candidates",
            desc: "Reached the national final stage from a field of 200,000+ applicants.",
        },
        {
            title: "EDU4U Club, VIT Bhopal",
            award: "Leadership",
            rank: "Co-Lead",
            desc: "Event Management Co-Lead organizing campus tech and community programs.",
        },
    ],

    certifications: [
        { title: "McKinsey Forward Program", issuer: "McKinsey & Company", date: "Issued 2025" },
        { title: "Deep Learning with PyTorch", issuer: "Meta / Coursera", date: "Issued 2025" },
        { title: "Neural Networks Optimization", issuer: "Meta / Coursera", date: "Issued 2025" },
        { title: "Identity Security for AI Age", issuer: "Saviynt (ID: 171072810)", date: "Issued Dec 2025" },
        { title: "Gen AI Professional", issuer: "Oracle", date: "Issued Aug 2025" },
        { title: "Autonomous Database Cloud", issuer: "Oracle", date: "Issued Sep 2025" },
        { title: "Databases for Developer: Foundation", issuer: "Oracle", date: "Issued 2025" },
        { title: "AWS Educate Intro to Cloud 101", issuer: "Amazon Web Services", date: "Issued Dec 2025" },
        { title: "IBM Blockchain Developer", issuer: "IBM (Skills: Smart Contracts)", date: "Issued Apr 2025" },
        { title: "API Fundamental Student Expert", issuer: "Postman", date: "Issued Aug 2024" },
        { title: "Cloud Computing", issuer: "NPTEL", date: "Issued May 2024" },
        { title: "Machine Learning Certificate", issuer: "Kaggle", date: "Issued Jul 2024" },
        { title: "HTML, CSS, JavaScript Expert", issuer: "Coursera", date: "Issued Dec 2023" },
        { title: "Software Engineering Experience", issuer: "JPMorgan Chase & Co. (Forage)", date: "Issued Jul 2023" },
        { title: "Open Source ML Contributor", issuer: "Omdena", date: "Issued Jun 2023" },
        { title: "Fundamentals of AI and ML", issuer: "Vityarthi", date: "Issued Feb 2023" },
        { title: "Python Essentials", issuer: "Vityarthi", date: "Issued Jan 2023" },
        { title: "YC Startup School Foundations", issuer: "Y Combinator", date: "Issued 2026" },
    ],

    codingProfiles: {
        leetcode: {
            url: "https://leetcode.com/u/tarandeepsinghjuneja/",
            solved: "600+",
            username: "tarandeepsinghjuneja",
        },
        codeforces: {
            url: "https://codeforces.com/profile/tsj2022",
            solved: "100+",
            username: "tsj2022",
        },
        code360: {
            url: "https://www.naukri.com/code360/profile/6b9a9f22-b96f-436e-a3f6-5076ede520e4",
            solved: "100+",
            username: "Tarandeep",
        },
        codolio: {
            url: "https://codolio.com/profile/GZzRNtBk",
            solved: "700+ Total",
            username: "tarandeep_s",
        },
    },

    githubCatalog: [
        {
            name: "clinic-ops-agent",
            lang: "Python",
            desc: "Healthcare claims platform automating Epic/Cerner FHIR writebacks with a 7-service Docker/Redis stack.",
        },
        {
            name: "docugenai",
            lang: "TypeScript / Python",
            desc: "Full-stack document/presentation AI gen platform with FastAPI and React, maintaining 99.5% uptime.",
        },
        {
            name: "AutoReach-AI",
            lang: "Python",
            desc: "Cold email sequencing engine with custom DNS MX checks and Gmail rate-limiting logic.",
        },
        {
            name: "billbuddy",
            lang: "TypeScript",
            desc: "Stripe-integrated expense splitter and invoice billing utility with concurrent transaction checks.",
        },
        {
            name: "Steel-vs.-Concrete-Bridge-Cost-Comparison-Software-with-SQLite-and-PyQt5",
            lang: "Python",
            desc: "PyQt5 desktop application for structural material cost comparison using localized SQLite DB.",
        },
        {
            name: "BharatRAG_Enterprise",
            lang: "Python",
            desc: "Enterprise grounded RAG engine featuring multi-format PDF parsing and hybrid search indexing.",
        },
        {
            name: "Retail-Sense",
            lang: "TypeScript",
            desc: "Interactive inventory analytics dashboard utilizing type-safe visualization libraries.",
        },
        {
            name: "Nitt-karam",
            lang: "TypeScript",
            desc: "Polished portal experience built for the NITT Karam community platform.",
        },
        {
            name: "Audio-Intelligence-",
            lang: "TypeScript",
            desc: "Audio transcript summarizer and Web Audio API spectrum analyst interface.",
        },
        {
            name: "seat-reservation",
            lang: "TypeScript",
            desc: "Angular ticket reservation grid featuring seat status synchronization.",
        },
        {
            name: "AI-Manga-generator",
            lang: "Python",
            desc: "Stable Diffusion script workflow to generate comic book grid panels from text.",
        },
        {
            name: "leave-management-app",
            lang: "Vue.js",
            desc: "Leave dashboard featuring calendar synchronization and administrative role permissions.",
        },
        {
            name: "osdag-bolted",
            lang: "Python",
            desc: "OSDAG structural software module calculations for bolted steel connections.",
        },
        {
            name: "research_agent",
            lang: "Python",
            desc: "Automated research agent for scraping, summarization, and LLM workflows.",
        },
        {
            name: "credit-card-fraud",
            lang: "Jupyter Notebook",
            desc: "Data modeling classification script evaluating credit card fraud datasets.",
        },
        {
            name: "truthguard",
            lang: "JavaScript",
            desc: "Content screening, validation filters, and moderation utilities.",
        },
        {
            name: "AI-PPT-and-DOC-Gen",
            lang: "Python",
            desc: "Streamlit app for AI-powered document and presentation generation.",
        },
        {
            name: "DSA-CODES",
            lang: "C++",
            desc: "Data Structures and Algorithms practice collection.",
        },
    ],

    links: {
        github: "https://github.com/tsj2003",
        linkedin: "https://www.linkedin.com/in/tarandeep-singh-juneja-55542424b",
        portfolio: "https://portfolio-tsj.netlify.app/",
        contact: "mailto:tarandeepjuneja11@gmail.com",
    },
};
