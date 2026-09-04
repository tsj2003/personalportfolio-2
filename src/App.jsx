import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Github, Linkedin, Mail, Play } from 'lucide-react';
import Lenis from 'lenis';
import ShowcaseScene from './components/ShowcaseScene';
import VoiceRagAgent from './components/VoiceRagAgent';
import CodexField from './components/CodexField';
import { profile } from './data';

const EASE = [0.241, 0, 0.138, 1.017];

const TRACE_MAP = [
    { id: 'top', method: 'GET', path: '/precision' },
    { id: 'about', method: 'GET', path: '/about' },
    { id: 'codex', method: 'GET', path: '/codex?touch=1' },
    { id: 'systems', method: 'POST', path: '/systems/boot' },
    { id: 'experience', method: 'GET', path: '/experience' },
    { id: 'process', method: 'PUT', path: '/process' },
    { id: 'work', method: 'GET', path: '/work?shipped=1' },
    { id: 'contact', method: 'POST', path: '/contact' },
];

function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function LetterWord({ word, delay = 0 }) {
    return (
        <span className="hero-title-row" aria-label={word}>
            {word.split('').map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0, y: 42, rotateX: 40 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.6, delay: delay + i * 0.032, ease: EASE }}
                    style={{ transformOrigin: 'bottom' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
}

function IntroSplash({ onDone }) {
    useEffect(() => {
        const t = setTimeout(onDone, 1850);
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <motion.div className="intro-splash" exit={{ y: '-105%' }} transition={{ duration: 0.9, ease: EASE }}>
            <div className="intro-grid" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 0 }}
                        animate={{ y: '-110%' }}
                        transition={{ duration: 0.75, delay: 1.05 + i * 0.055, ease: EASE }}
                    />
                ))}
            </div>
            <motion.div
                className="intro-brand"
                initial={{ opacity: 0, scale: 0.82, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE }}
            >
                <div className="sb-mark" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
                <h2>TSJ.</h2>
                <p>Systems that ship</p>
            </motion.div>
        </motion.div>
    );
}

function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const pos = useRef({ x: -100, y: -100, rx: -100, ry: -100, hover: false });
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const fine = window.matchMedia('(pointer: fine)').matches;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || reduce) return undefined;
        setEnabled(true);

        let raf = 0;
        let running = false;
        const move = (e) => {
            pos.current.x = e.clientX;
            pos.current.y = e.clientY;
            if (!running) {
                running = true;
                raf = requestAnimationFrame(tick);
            }
        };
        const over = (e) => {
            pos.current.hover = Boolean(
                e.target.closest('a, button, .project-row, .callout, .reel-btn')
            );
        };
        const tick = () => {
            const p = pos.current;
            p.rx += (p.x - p.rx) * 0.28;
            p.ry += (p.y - p.ry) * 0.28;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${p.rx}px, ${p.ry}px, 0) translate(-50%, -50%)`;
                ringRef.current.classList.toggle('is-hover', p.hover);
            }
            const settled = Math.abs(p.x - p.rx) < 0.4 && Math.abs(p.y - p.ry) < 0.4;
            if (settled) {
                running = false;
                raf = 0;
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('pointerover', over, { passive: true });
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerover', over);
        };
    }, []);

    if (!enabled) return null;

    return (
        <>
            <div ref={dotRef} className="cursor-dot cursor-dom" />
            <div ref={ringRef} className="cursor-ring cursor-dom" />
        </>
    );
}

export default function App() {
    const [showIntro, setShowIntro] = useState(true);
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState('top');
    const [activeCallout, setActiveCallout] = useState(profile.showcaseCallouts[0]?.id);
    const progressRef = useRef(null);

    const featured = useMemo(
        () => profile.projects.filter((p) => profile.featuredProjectIds.includes(p.title)),
        []
    );

    const trace = TRACE_MAP.find((t) => t.id === activeSection) || TRACE_MAP[0];

    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const lenis = reduce
            ? null
            : new Lenis({ duration: 0.9, smoothWheel: true, touchMultiplier: 1.2, lerp: 0.12 });
        let frame = 0;
        const raf = (time) => {
            lenis?.raf(time);
            frame = requestAnimationFrame(raf);
        };
        if (lenis) frame = requestAnimationFrame(raf);

        let sectionTimer = 0;
        const onScroll = () => {
            const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
            const p = Math.min(Math.max(window.scrollY / max, 0), 1);
            if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;

            clearTimeout(sectionTimer);
            sectionTimer = setTimeout(() => {
                let current = 'top';
                for (const item of TRACE_MAP) {
                    const el = document.getElementById(item.id);
                    if (!el) continue;
                    if (el.getBoundingClientRect().top <= window.innerHeight * 0.42) current = item.id;
                }
                setActiveSection((prev) => (prev === current ? prev : current));
            }, 80);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(sectionTimer);
            lenis?.destroy();
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => {
        const ids = profile.showcaseCallouts.map((c) => c.id);
        let i = 0;
        const t = setInterval(() => {
            i = (i + 1) % ids.length;
            setActiveCallout(ids[i]);
        }, 2800);
        return () => clearInterval(t);
    }, []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            window.location.href = profile.links.contact;
        }
    };

    return (
        <div className="sb-page sb-page-dark">
            <CodexField mode="global" className="codex-global-bg" />
            <div className="sb-content">
            <CustomCursor />
            <div className="progress-rail" aria-hidden="true">
                <div className="progress-fill" ref={progressRef} />
            </div>

            <div className="trace-chip" aria-live="polite">
                <span className="trace-pulse" />
                <span className="trace-method">{trace.method}</span>
                <span>{trace.path}</span>
            </div>

            <AnimatePresence>{showIntro && <IntroSplash onDone={() => setShowIntro(false)} />}</AnimatePresence>

            <nav className="sb-nav">
                <button type="button" className="sb-logo" onClick={() => scrollTo('top')}>
                    <span className="sb-mark" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                    TSJ.
                </button>
                <div className="sb-nav-links">
                    {[
                        ['about', 'About'],
                        ['codex', 'Codex'],
                        ['systems', 'Systems'],
                        ['experience', 'Experience'],
                        ['work', 'Work'],
                    ].map(([id, label]) => (
                        <button
                            key={id}
                            type="button"
                            className={activeSection === id ? 'is-active' : ''}
                            onClick={() => scrollTo(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <button type="button" className="sb-contact-pill" onClick={() => scrollTo('contact')}>
                    Contact
                </button>
            </nav>

            <header className="hero" id="top">
                <div className="hero-grid" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <span key={i} />
                    ))}
                </div>
                <div className="hero-inner">
                    <div>
                        <motion.p
                            className="hero-kicker"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
                            transition={{ delay: 0.05, duration: 0.5, ease: EASE }}
                        >
                            // Building since 2022 · VIT · IIT Bombay FOSSEE
                        </motion.p>
                        <h1 className="hero-title">
                            {!showIntro && (
                                <>
                                    <LetterWord word="Precision" delay={0.05} />
                                    <br />
                                    <LetterWord word="Systems" delay={0.28} />
                                </>
                            )}
                        </h1>
                    </div>

                    <motion.div
                        className="hero-mid"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 24 : 0 }}
                        transition={{ delay: 0.55, duration: 0.55, ease: EASE }}
                    >
                        <button type="button" className="reel-btn" onClick={() => scrollTo('systems')} aria-label="Watch systems">
                            <svg className="reel-orbit" viewBox="0 0 100 100">
                                <defs>
                                    <path id="circlePath" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                                </defs>
                                <text>
                                    <textPath href="#circlePath">Watch a showreel of shipped systems · </textPath>
                                </text>
                            </svg>
                            <span className="reel-play">
                                <Play size={16} fill="currentColor" />
                            </span>
                        </button>
                        <img
                            className="hero-portrait"
                            src={profile.media.portrait}
                            alt="Tarandeep Singh Juneja"
                        />
                        <img
                            className="hero-desk"
                            src={profile.media.desk}
                            alt="Tarandeep at the desk"
                        />
                    </motion.div>

                    <div className="hero-bottom">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 24 : 0 }}
                            transition={{ delay: 0.7, duration: 0.55, ease: EASE }}
                        >
                            <p className="hero-copy">
                                Tarandeep Singh Juneja. Backend and AI builder. I turn messy product
                                and ops problems into FastAPI services, RAG pipelines, and agent
                                workflows that survive real traffic.
                            </p>
                            <button type="button" className="sb-btn" onClick={() => scrollTo('work')}>
                                See shipped work
                                <ArrowUpRight size={18} />
                            </button>
                        </motion.div>

                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0, x: 36 }}
                            animate={{ opacity: showIntro ? 0 : 1, x: showIntro ? 36 : 0 }}
                            transition={{ delay: 0.8, duration: 0.55, ease: EASE }}
                        >
                            {profile.stats.slice(0, 3).map((stat) => (
                                <div key={stat.label}>
                                    <div className="hero-stat-value">{stat.value}</div>
                                    <div className="hero-stat-label">
                                        {stat.label} · {stat.detail}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </header>

            <section className="band-orange" id="about">
                <div className="band-orange-grid" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <span key={i} />
                    ))}
                </div>
                <div className="band-layout">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, filter: 'blur(12px)', y: 24 }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.75, ease: EASE }}
                        >
                            I bring backends and AI systems to life through craft and iteration.
                            Trusted when the demo has to become production.
                        </motion.h2>
                        <motion.button
                            type="button"
                            className="sb-btn sb-btn-dark"
                            style={{ marginTop: 28 }}
                            onClick={() => scrollTo('experience')}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, ease: EASE }}
                        >
                            Who I am
                            <ArrowUpRight size={18} />
                        </motion.button>
                    </div>
                    <div className="band-meta">
                        <div>
                            <strong>Vellore Institute of Technology</strong>
                            B.Tech CSE · CGPA 8.62/10
                        </div>
                        <div>
                            <strong>IIT Bombay FOSSEE</strong>
                            Osdag · 10k+ engineers reached
                        </div>
                        <div>
                            <strong>Meta Hacker Cup</strong>
                            Global #186 · Top 500
                        </div>
                    </div>
                </div>
            </section>

            <section className="codex-section" id="codex" aria-label="Portrait gallery">
                <div className="portrait-rail">
                    {(profile.media.portraits || []).slice(0, 3).map((shot) => (
                        <figure key={shot.id} className="portrait-frame">
                            <img src={shot.src} alt={`${profile.name} — ${shot.label}`} />
                        </figure>
                    ))}
                </div>
            </section>

            <section className="showcase" id="systems">
                <div className="showcase-head">
                    <p className="section-eyebrow">
                        <i />
                        Live systems
                    </p>
                    <p className="showcase-lead">
                        Move your mouse. The desk reacts. Every callout is a promise I keep when
                        shipping FastAPI and AI workflows.
                    </p>
                </div>

                <div className="showcase-stage">
                    <ShowcaseScene />
                    <div className="showcase-callouts">
                        {profile.showcaseCallouts.map((c) => (
                            <button
                                key={c.id}
                                type="button"
                                className={`callout${c.align === 'right' ? ' is-right' : ''}${
                                    activeCallout === c.id ? ' is-active' : ''
                                }`}
                                style={{ left: c.x, top: c.y }}
                                onMouseEnter={() => setActiveCallout(c.id)}
                                onFocus={() => setActiveCallout(c.id)}
                            >
                                <div className="callout-dot" />
                                <div className="callout-label">{c.label}</div>
                                <div className="callout-detail">{c.detail}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="experience" id="experience">
                <p className="section-eyebrow">
                    <i />
                    Experience
                </p>
                <h2 className="showcase-lead" style={{ maxWidth: '18ch' }}>
                    Where the systems got real constraints.
                </h2>
                <div className="experience-list">
                    {profile.experience.map((job) => (
                        <article key={job.company} className="exp-card">
                            <div>
                                <h3 className="exp-role">{job.role}</h3>
                                <div className="exp-company">{job.company}</div>
                                <div className="exp-period">
                                    {job.period} · {job.location}
                                </div>
                            </div>
                            <ul className="exp-points">
                                {job.points.slice(0, 3).map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

            <section className="process" id="process">
                <p className="section-eyebrow">
                    <i />
                    How I work
                </p>
                <h2 className="showcase-lead">Three steps. No nonsense.</h2>
                <div className="process-grid">
                    {profile.process.map((item) => (
                        <article key={item.step} className="process-card">
                            <div className="process-step">{item.step}</div>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="projects" id="work">
                <div className="projects-head">
                    <p className="section-eyebrow">
                        <i />
                        Selected builds
                    </p>
                    <div>
                        <h2>Every project tells its own story of collab and performance.</h2>
                        <button
                            type="button"
                            className="sb-btn sb-btn-dark"
                            style={{ marginTop: 22 }}
                            onClick={() => window.open(profile.links.github, '_blank')}
                        >
                            Full GitHub
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>

                {featured.map((project) => (
                    <article key={project.title} className="project-row">
                        <div>
                            <div className="project-name">{project.title}</div>
                            <div className="project-eyebrow">{project.eyebrow}</div>
                            <div className="project-links">
                                {project.liveLink ? (
                                    <a
                                        className="project-link project-link-live"
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Live
                                        <ArrowUpRight size={14} />
                                    </a>
                                ) : null}
                                {project.repoLink ? (
                                    <a
                                        className="project-link"
                                        href={project.repoLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                        <ArrowUpRight size={14} />
                                    </a>
                                ) : null}
                            </div>
                        </div>
                        <div className="project-meta">
                            <p className="project-impact">{project.impact}</p>
                            <div className="project-tags">
                                {project.tech.slice(0, 4).map((t) => (
                                    <span key={t} className="project-tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <ArrowUpRight className="project-arrow" size={28} aria-hidden />
                        {project.image && (
                            <img className="project-preview" src={project.image} alt="" loading="lazy" />
                        )}
                    </article>
                ))}
            </section>

            <section className="achievements" aria-label="Achievements">
                <div className="marquee">
                    {[...profile.achievements, ...profile.achievements].map((a, i) => (
                        <span key={`${a.title}-${i}`}>
                            {a.title} <em>· {a.award}</em>
                        </span>
                    ))}
                </div>
            </section>

            <section className="footer-cta" id="contact">
                <img className="bg" src={profile.media.desk} alt="" />
                <div className="footer-cta-inner">
                    <div className="footer-watermark">TSJ.</div>
                    <h2>Let&apos;s ship your next system.</h2>
                    <div className="footer-actions">
                        <button type="button" className="sb-btn" onClick={copyEmail}>
                            {copied ? (
                                <>
                                    <Check size={18} /> Email copied
                                </>
                            ) : (
                                <>
                                    Talk to me
                                    <ArrowUpRight size={18} />
                                </>
                            )}
                        </button>
                        <a className="sb-btn" href={profile.links.contact}>
                            <Mail size={16} />
                            {profile.email}
                        </a>
                    </div>
                    <div className="footer-links">
                        <a href={profile.links.github} target="_blank" rel="noreferrer">
                            <Github size={14} /> GitHub
                        </a>
                        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                            <Linkedin size={14} /> LinkedIn
                        </a>
                        <a href="https://leetcode.com/u/tarandeepsinghjuneja/" target="_blank" rel="noreferrer">
                            LeetCode
                        </a>
                        <span>{profile.phone}</span>
                    </div>
                </div>
            </section>

            <footer className="site-foot">
                <span>© {new Date().getFullYear()} {profile.name}</span>
                <span>STATUS · systems_online · latency_ok</span>
            </footer>
            </div>

            <VoiceRagAgent />
        </div>
    );
}
