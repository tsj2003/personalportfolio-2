import { Github, Linkedin, ExternalLink, Mail, FileText } from 'lucide-react';

export const profile = {
    name: "Tarandeep Singh Juneja",
    role: "Software Engineer (Backend / AI)",
    tagline: "Meta Hacker Cup Global Rank 186 | Ex–Python Dev Intern @ IIT Bombay",
    location: "Damoh, Madhya Pradesh, India",
    education: [
        {
            degree: "B.Tech in Computer Science and Technology",
            institution: "Vellore Institute of Technology",
            period: "Oct 2022 – Oct 2026",
            details: "CGPA: 8.51 / 10"
        },
        {
            degree: "Data Structures & Algorithms",
            institution: "Coding Ninjas",
            period: "Professional Training",
            details: "Specialized in efficient problem solving."
        }
    ],
    experience: [
        {
            role: "Summer Intern",
            company: "FOSSEE, IIT Bombay (Remote)",
            period: "Feb 2025 – Jun 2025",
            points: [
                "Built plate-girder UI module for Osdag; shipped to 500+ users.",
                "Implemented bolted butt-joint computation logic in Python with 99% accuracy.",
                "Improved UI responsiveness by ~25%.",
                "Collaborated with researchers; merged PRs, added unit tests."
            ],
            tech: "Python, PyQt, Engineering Computation"
        },
        {
            role: "Software Taxonomy Analyst",
            company: "Outlier (Remote)",
            period: "Dec 2024 – Jun 2025",
            points: [
                "Labeled 100+ multilingual code snippets (Python, C++, JavaScript).",
                "Improved ML taxonomy coverage via debugging & architecture analysis."
            ],
            tech: "Prompt Engineering, Code Interpretation"
        },
        {
            role: "Finance Co-Lead",
            company: "EDU4U Club (VIT Bhopal)",
            period: "Nov 2024 – May 2025",
            points: [
                "Managed budgets & fundraising.",
                "Supported technical tools for outreach."
            ],
            tech: "Financial Analysis, Team Collaboration"
        }
    ],
    projects: [
        {
            title: "AutoReach AI",
            description: "Automated personalized job emails using Gmail API. 2,900+ emails, 90%+ delivery, 50%+ HR responses.",
            tech: ["Python", "Gmail API", "Jinja2"],
            link: "#"
        },
        {
            title: "CNN Audio Classification",
            description: "CNN with Mel-spectrograms for 50 sound classes. 83.5% accuracy, FastAPI inference, explainable visualizations.",
            tech: ["Python", "PyTorch", "FastAPI", "Modal"],
            link: "#"
        },
        {
            title: "JTCSync - Interview Platform",
            description: "Remote interview platform with video, collaborative coding, and scheduling.",
            tech: ["Next.js 14", "TypeScript", "Stream SDK", "Clerk"],
            link: "https://interviewplus.netlify.app/"
        },
        {
            title: "Nitt Karam - AI Task Manager",
            description: "NLP-based task creation with priority scheduling.",
            tech: ["React", "TypeScript", "Tailwind", "Gemini API"],
            link: "https://nittkaram.netlify.app/"
        },
        {
            title: "Credit Card Fraud Detection",
            description: "Logistic Regression on imbalanced data. 92% accuracy, 284K+ transactions.",
            tech: ["Python", "Scikit-learn", "Streamlit"],
            link: "#"
        }
    ],
    skills: [
        "Python", "FastAPI", "PyTorch", "React", "Next.js", "SQL",
        "Data Structures & Algorithms", "Machine Learning", "Generative AI",
        "Prompt Engineering", "Backend Development", "REST APIs"
    ],
    achievements: [
        "Meta Hacker Cup 2025 – Global Rank 186",
        "HackWithInfy 2025 – Finalist (Infosys)",
        "Oracle Generative AI Professional (2025)",
        "Postman API Student Expert"
    ],
    links: {
        github: "https://github.com/tsj2003",
        linkedin: "https://www.linkedin.com/in/tarandeep-singh-juneja-55542424b",
        portfolio: "https://portfoliobytsj.netlify.app",
        alt_portfolio: "https://portfolio-tsj.netlify.app",
        email: "mailto:tarandeepsinghjuneja@example.com" // Placeholder email, update if provided
    }
};
