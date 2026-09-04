import { profile } from '../data';

function tokenize(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9+.#\s/-]/g, ' ')
        .split(/\s+/)
        .filter((t) => t.length > 1);
}

function buildKnowledgeBase() {
    const docs = [];

    docs.push({
        id: 'identity',
        tags: ['who', 'about', 'intro', 'name', 'role', 'summary'],
        text: `${profile.name} is a ${profile.role}. ${profile.headline} ${profile.tagline} ${profile.hook} ${profile.about.join(' ')}`,
    });

    docs.push({
        id: 'contact',
        tags: ['contact', 'email', 'phone', 'hire', 'reach', 'call', 'linkedin', 'github', 'mail'],
        text: `Contact Tarandeep at email ${profile.email}, phone ${profile.phone}. LinkedIn ${profile.links.linkedin}. GitHub ${profile.links.github}. Portfolio ${profile.links.portfolio}. Location ${profile.location}. He can make time this week for roles, collaborations, or problem discussions.`,
    });

    docs.push({
        id: 'education',
        tags: ['education', 'college', 'university', 'vit', 'cgpa', 'degree', 'study'],
        text: profile.education
            .map((e) => `${e.degree} at ${e.institution}, ${e.period}. ${e.details}`)
            .join(' '),
    });

    profile.experience.forEach((job, i) => {
        docs.push({
            id: `exp-${i}`,
            tags: ['experience', 'intern', 'work', 'job', job.company.toLowerCase(), 'iit', 'fossee', 'outlier'],
            text: `${job.role} at ${job.company} (${job.period}, ${job.location}). ${job.short || ''} ${job.points.join(' ')} Tech: ${job.tech}`,
        });
    });

    profile.projects.forEach((p, i) => {
        docs.push({
            id: `project-${i}`,
            tags: ['project', 'built', 'shipped', p.title.toLowerCase(), ...(p.tech || []).map((t) => t.toLowerCase())],
            text: `${p.title} (${p.eyebrow}). ${p.description} Impact: ${p.impact} Stack: ${(p.tech || []).join(', ')}. Repo: ${p.repoLink || 'n/a'}. Live: ${p.liveLink || 'n/a'}.`,
        });
    });

    docs.push({
        id: 'stats',
        tags: ['stats', 'rank', 'leetcode', 'hacker', 'cup', 'problems', 'metrics'],
        text: profile.stats.map((s) => `${s.label}: ${s.value} (${s.detail})`).join('. '),
    });

    docs.push({
        id: 'achievements',
        tags: ['achievement', 'award', 'hackathon', 'mckinsey', 'ycombinator', 'yc', 'meta', 'adobe', 'infosys'],
        text: profile.achievements.map((a) => `${a.title}: ${a.award} (${a.rank}). ${a.desc}`).join(' '),
    });

    docs.push({
        id: 'skills',
        tags: ['skill', 'stack', 'tech', 'python', 'fastapi', 'react', 'ai', 'backend'],
        text: `Skills. Frontend: ${profile.skills.frontend.join(', ')}. Backend: ${profile.skills.backend.join(', ')}. AI: ${profile.skills.ai.join(', ')}. Cloud: ${profile.skills.cloud.join(', ')}.`,
    });

    docs.push({
        id: 'certs',
        tags: ['certificate', 'certification', 'course', 'oracle', 'aws', 'pytorch'],
        text: `Certifications: ${profile.certifications.map((c) => `${c.title} by ${c.issuer} (${c.date})`).join('; ')}.`,
    });

    docs.push({
        id: 'coding',
        tags: ['leetcode', 'codeforces', 'dsa', 'competitive', 'coding'],
        text: Object.entries(profile.codingProfiles)
            .map(([k, v]) => `${k}: ${v.solved} solved, ${v.url}`)
            .join('. '),
    });

    docs.push({
        id: 'process',
        tags: ['process', 'how', 'work', 'approach', 'method'],
        text: (profile.process || [])
            .map((p) => `${p.step} ${p.title}: ${p.body}`)
            .join(' '),
    });

    docs.push({
        id: 'opensource',
        tags: ['opensource', 'osdag', 'pr', 'contribute'],
        text: (profile.openSource || [])
            .map((o) => `${o.title}: ${o.description} ${o.link}`)
            .join(' '),
    });

    return docs.map((d) => ({ ...d, tokens: new Set([...tokenize(d.text), ...d.tags]) }));
}

const KB = buildKnowledgeBase();

function scoreDoc(queryTokens, doc) {
    let score = 0;
    for (const t of queryTokens) {
        if (doc.tokens.has(t)) score += 2;
        for (const tag of doc.tags) {
            if (tag.includes(t) || t.includes(tag)) score += 1.5;
        }
        if (doc.text.toLowerCase().includes(t)) score += 0.5;
    }
    return score;
}

function retrieve(query, k = 4) {
    const tokens = tokenize(query);
    return KB.map((doc) => ({ doc, score: scoreDoc(tokens, doc) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, k)
        .map((r) => r.doc);
}

function detectIntent(q) {
    const s = q.toLowerCase();
    if (/(hire|available|open to|join|opportun|role|job|interview)/.test(s)) return 'hire';
    if (/(email|contact|phone|call|reach|linkedin|github|message|whatsapp)/.test(s)) return 'contact';
    if (/(project|built|shipped|clinic|docugen|mailmantra|bharatrag|billbuddy|ndr|tra|harbour|attainly)/.test(s)) return 'projects';
    if (/(experience|intern|iit|fossee|outlier|work|company)/.test(s)) return 'experience';
    if (/(skill|stack|tech|python|fastapi|react|know)/.test(s)) return 'skills';
    if (/(education|college|vit|cgpa|degree|university)/.test(s)) return 'education';
    if (/(achiev|award|hack|cup|mckinsey|rank|leetcode)/.test(s)) return 'achievements';
    if (/(hello|hi\b|hey|namaste)/.test(s)) return 'greeting';
    if (/(problem|help|issue|bug|support)/.test(s)) return 'problem';
    return 'general';
}

function synthesize(query, docs, intent) {
    const name = profile.firstName;

    if (intent === 'greeting') {
        return `Hey. I'm the TSJ systems agent for ${profile.name}. Ask about projects, experience, skills, or say you want to contact him.`;
    }

    if (intent === 'contact' || intent === 'hire') {
        return `${name} is open to strong backend and AI roles. Email ${profile.email}, phone ${profile.phone}. LinkedIn and GitHub are linked on this site. He can make time this week. Want me to open the email draft?`;
    }

    if (intent === 'problem') {
        return `Tell me the problem in one line: hiring fit, a project deep dive, or how to reach ${name}. For direct help email ${profile.email} or call ${profile.phone}.`;
    }

    if (!docs.length) {
        return `I don't have that exact fact in ${name}'s knowledge base yet. Try asking about Clinic Ops, DocuGenAI, IIT Bombay, skills, or contact. Or email ${profile.email}.`;
    }

    if (intent === 'projects') {
        const bits = docs
            .filter((d) => d.id.startsWith('project') || d.id === 'stats')
            .slice(0, 3)
            .map((d) => d.text.split('Impact:')[0].trim());
        return bits.length
            ? `Here is what ${name} has shipped. ${bits.join(' ')} Ask about any one project for more detail.`
            : docs[0].text;
    }

    if (intent === 'experience') {
        const exp = docs.filter((d) => d.id.startsWith('exp'));
        return exp.length
            ? exp.map((d) => d.text).join(' ')
            : docs.map((d) => d.text).join(' ');
    }

    const top = docs[0].text;
    const extra = docs[1] ? ` Also: ${docs[1].text.slice(0, 220)}` : '';
    return `${top}${extra}`.replace(/\s+/g, ' ').trim();
}

export async function askRag(query) {
    const cleaned = String(query || '').trim();
    if (!cleaned) {
        return {
            answer: 'Ask anything about Tarandeep: projects, experience, skills, hiring, or contact.',
            sources: [],
            intent: 'empty',
        };
    }

    const intent = detectIntent(cleaned);
    const docs = retrieve(cleaned, 4);

    // Simulate retrieval latency for smooth state machine UX
    await new Promise((r) => setTimeout(r, 420 + Math.random() * 380));

    return {
        answer: synthesize(cleaned, docs, intent),
        sources: docs.map((d) => d.id),
        intent,
        actions:
            intent === 'contact' || intent === 'hire'
                ? [{ type: 'mailto', href: profile.links.contact, label: 'Open email' }]
                : [],
    };
}

export function getQuickPrompts() {
    return [
        'Who is Tarandeep?',
        'Show key projects',
        'IIT Bombay experience',
        'How do I contact him?',
        'Is he open to roles?',
    ];
}
