import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import {
    Github,
    Linkedin,
    ExternalLink,
    ArrowRight,
    Award,
    Sparkles,
    Mail,
    MapPin,
    FolderGit2,
    Rocket,
    X,
    ChevronRight,
    Bot,
    Cpu,
    Database,
    Gauge,
    Search,
    SlidersHorizontal,
    WandSparkles
} from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { profile } from './data';
import Car from './components/Car';
import Background from './components/Background';
import AudioPlayer from './components/AudioPlayer';

const MotionDiv = motion.div;

const proofIcons = [Cpu, Bot, Database];

const Card = ({ title, eyebrow, children, className = '' }) => (
    <div className={`panel-surface rounded-[28px] p-6 md:p-8 ${className}`}>
        {eyebrow && <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyber-yellow/75">{eyebrow}</p>}
        {title && <h3 className="text-strong mb-4 text-2xl font-bold md:text-3xl">{title}</h3>}
        {children}
    </div>
);

const Section = ({ className = '', children }) => (
    <section className={`relative flex min-h-screen w-full flex-shrink-0 items-center justify-center px-4 py-20 md:px-8 lg:h-screen lg:w-screen lg:items-start lg:pt-16 lg:pb-44 ${className}`}>
        <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </section>
);

const SmartLink = ({ href, className, children }) => (
    <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'} className={className}>
        {children}
    </a>
);

const CountUp = ({ value, suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let frame;
        const duration = 1200;
        const start = performance.now();

        const step = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            setCount(Math.round(value * progress));
            if (progress < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [value]);

    return <>{count}{suffix}</>;
};

const TerminalIntro = () => {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const timers = profile.terminalLines.map((_, index) => (
            setTimeout(() => setVisibleLines(index + 1), 500 + index * 550)
        ));

        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <Card className="overflow-hidden border-cyber-accent/25">
            <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-[11px] uppercase tracking-[0.32em] text-cyber-yellow/80">Live Terminal</span>
            </div>
            <div className="space-y-3 font-mono text-sm leading-7 text-cyan-100">
                {profile.terminalLines.slice(0, visibleLines).map((line, index) => (
                    <MotionDiv
                        key={line}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: index * 0.05 }}
                    >
                        {line}
                    </MotionDiv>
                ))}
                <div className="inline-flex h-5 w-2 animate-pulse rounded-sm bg-cyber-accent/80 align-middle" />
            </div>
        </Card>
    );
};

const StatModal = ({ stat, onClose }) => (
    <AnimatePresence>
        {stat && (
            <MotionDiv
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <MotionDiv
                    className="panel-surface w-full max-w-xl rounded-[30px] border-cyber-accent/25 p-6 shadow-[0_20px_80px_rgba(0,243,255,0.15)]"
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="mb-5 flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-cyber-yellow/75">{stat.label}</p>
                            <h3 className="text-strong mt-3 text-3xl font-black">{stat.modalTitle}</h3>
                        </div>
                        <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-200 transition-colors hover:text-white" aria-label="Close modal">
                            <X size={18} />
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {stat.modalPoints.map((point) => (
                            <li key={point} className="content-shell text-soft rounded-2xl px-4 py-4">
                                {point}
                            </li>
                        ))}
                    </ul>
                </MotionDiv>
            </MotionDiv>
        )}
    </AnimatePresence>
);

function App() {
    const containerRef = useRef(null);
    const projectsRef = useRef(null);
    const secretBufferRef = useRef([]);
    const { scrollXProgress, scrollYProgress } = useScroll({ container: containerRef });
    const [isCompact, setIsCompact] = useState(false);
    const [activeStat, setActiveStat] = useState(null);
    const [projectQuery, setProjectQuery] = useState('');
    const [activeProjectFilter, setActiveProjectFilter] = useState('All');
    const [hoveredProject, setHoveredProject] = useState(null);
    const [hyperdriveMode, setHyperdriveMode] = useState(false);
    const [showHyperdriveToast, setShowHyperdriveToast] = useState(false);

    useEffect(() => {
        const checkViewport = () => setIsCompact(window.innerWidth < 1024);
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    useEffect(() => {
        const lenis = new Lenis({
            orientation: isCompact ? 'vertical' : 'horizontal',
            gestureOrientation: 'both',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
            wrapper: containerRef.current,
            content: containerRef.current
        });

        let frameId;
        const raf = (time) => {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        };

        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, [isCompact]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setActiveStat(null);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        const onSecretKey = (event) => {
            const tagName = event.target?.tagName?.toLowerCase();
            if (tagName === 'input' || tagName === 'textarea') return;

            const nextKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
            secretBufferRef.current = [...secretBufferRef.current, nextKey].slice(-secretCode.length);

            const matched = secretCode.every((key, index) => secretBufferRef.current[index] === key);
            if (!matched) return;

            setHyperdriveMode((current) => !current);
            setShowHyperdriveToast(true);
            secretBufferRef.current = [];
        };

        window.addEventListener('keydown', onSecretKey);
        return () => window.removeEventListener('keydown', onSecretKey);
    }, []);

    useEffect(() => {
        if (!showHyperdriveToast) return undefined;
        const timer = setTimeout(() => setShowHyperdriveToast(false), 2200);
        return () => clearTimeout(timer);
    }, [showHyperdriveToast]);

    const scrollProgress = isCompact ? scrollYProgress : scrollXProgress;
    const scrollToProjects = () => projectsRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    const projectFilters = ['All', ...new Set(profile.projects.flatMap((project) => project.tech))];
    const normalizedQuery = projectQuery.trim().toLowerCase();
    const filteredProjects = profile.projects.filter((project) => {
        const matchesFilter = activeProjectFilter === 'All' || project.tech.includes(activeProjectFilter);
        const searchTarget = `${project.title} ${project.description} ${project.impact} ${project.tech.join(' ')}`.toLowerCase();
        const matchesQuery = !normalizedQuery || searchTarget.includes(normalizedQuery);
        return matchesFilter && matchesQuery;
    });

    return (
        <div className={`relative h-screen w-full overflow-hidden text-white selection:bg-cyber-pink selection:text-white ${hyperdriveMode ? 'hyperdrive-mode' : ''}`}>
            <Background scrollProgress={scrollProgress} isCompact={isCompact} />
            <Car scrollProgress={scrollProgress} isCompact={isCompact} />
            <AudioPlayer />
            <StatModal stat={activeStat} onClose={() => setActiveStat(null)} />

            <AnimatePresence>
                {showHyperdriveToast && (
                    <MotionDiv
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        className="panel-surface fixed left-1/2 top-5 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border-cyber-accent/30 px-5 py-3 text-sm text-cyan-100 shadow-[0_0_30px_rgba(125,249,255,0.18)]"
                    >
                        <WandSparkles size={16} className="text-cyber-accent" />
                        Hyperdrive {hyperdriveMode ? 'engaged' : 'disengaged'}
                    </MotionDiv>
                )}
            </AnimatePresence>

            <div
                ref={containerRef}
                className="absolute inset-0 flex h-full w-full flex-col overflow-y-auto lg:flex-row lg:overflow-x-auto lg:overflow-y-hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <Section className="pb-44 sm:pb-40 lg:min-w-[125vw]">
                    <div className="grid items-center gap-8 xl:grid-cols-[1.15fr_0.85fr]">
                        <MotionDiv
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true, amount: 0.35 }}
                            className="max-w-4xl"
                        >
                            <div className="panel-surface mb-6 inline-flex items-center gap-2 rounded-full border-cyber-accent/20 bg-cyber-accent/8 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_30px_rgba(0,243,255,0.08)]">
                                <Sparkles size={16} className="text-cyber-accent" />
                                Backend + AI engineer building systems, not just portfolios
                            </div>

                            <p className="mb-4 flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-cyber-yellow/80">
                                <MapPin size={15} />
                                {profile.location}
                            </p>

                            <h1 className="max-w-5xl text-4xl font-black leading-[0.92] sm:text-5xl md:text-6xl lg:text-8xl">
                                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyber-accent bg-clip-text text-transparent">
                                    {profile.name}
                                </span>
                            </h1>

                            <h2 className="text-strong mt-5 text-lg font-semibold text-cyan-100 sm:text-xl md:text-2xl lg:text-3xl">{profile.role}</h2>

                            <p className="text-strong mt-6 max-w-3xl text-xl font-bold leading-8 sm:text-2xl sm:leading-9 lg:text-3xl lg:leading-[1.25]">
                                {profile.hook}
                            </p>

                            <p className="text-soft mt-5 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
                                {profile.headline}
                            </p>

                            <p className="text-muted-strong mt-4 max-w-2xl text-sm leading-7 sm:text-base">
                                {profile.tagline}
                            </p>

                            <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
                                <button
                                    onClick={scrollToProjects}
                                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-cyber-accent px-7 py-4 text-sm font-black uppercase tracking-[0.22em] text-black shadow-[0_0_35px_rgba(125,249,255,0.28)] transition-all hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(125,249,255,0.45)] sm:w-auto"
                                >
                                    <Rocket size={16} className="transition-transform group-hover:-translate-y-0.5" />
                                    See What I&apos;ve Built
                                </button>
                                <SmartLink href={profile.links.github} className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-cyber-accent/50 hover:text-cyber-accent sm:w-auto">
                                    GitHub
                                </SmartLink>
                                <SmartLink href={profile.links.linkedin} className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-cyber-pink/50 hover:text-cyber-pink sm:w-auto">
                                    LinkedIn
                                </SmartLink>
                            </div>

                            <div className="mt-12 flex items-center gap-5 text-xs uppercase tracking-[0.3em] text-cyber-yellow/80 sm:text-sm lg:mt-16">
                                <span>{isCompact ? 'Scroll down' : 'Scroll to drive'}</span>
                                <ArrowRight className={isCompact ? 'rotate-90' : ''} />
                            </div>
                        </MotionDiv>

                        <div className="grid gap-5 xl:justify-self-end">
                            <TerminalIntro />

                            <div className="grid gap-4 sm:grid-cols-2">
                                {profile.stats.map((stat, index) => (
                                    <MotionDiv
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.55, delay: index * 0.08 }}
                                        viewport={{ once: true, amount: 0.35 }}
                                    >
                                        <button
                                            onClick={() => setActiveStat(stat)}
                                            className="panel-surface group h-full w-full rounded-[28px] border-cyber-accent/18 bg-gradient-to-br from-[#090c18]/95 to-[#0d1d29]/78 p-5 text-left transition-all hover:-translate-y-1 hover:border-cyber-accent/45 hover:shadow-[0_0_32px_rgba(0,243,255,0.16)]"
                                        >
                                            <p className="text-[11px] uppercase tracking-[0.35em] text-cyber-yellow/75">{stat.label}</p>
                                            <p className="text-strong mt-3 text-3xl font-black sm:text-4xl">
                                                <CountUp value={stat.value} suffix={stat.suffix} />
                                            </p>
                                            <p className="text-soft mt-2 text-sm">{stat.detail}</p>
                                            <p className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-cyber-accent transition-colors group-hover:text-white">
                                                tap for proof
                                                <ChevronRight size={14} />
                                            </p>
                                        </button>
                                    </MotionDiv>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

                <Section className="pb-36 sm:pb-32 lg:min-w-[145vw]">
                    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                        <Card title="What I’ve Built" eyebrow="Proof Fast" className="border-cyber-accent/20 bg-gradient-to-br from-[#090c18]/95 to-[#0d1d29]/78">
                            <div className="grid gap-4">
                                {profile.proofLines.map((line, index) => {
                                    const Icon = proofIcons[index] ?? Cpu;
                                    return (
                                        <MotionDiv
                                            key={line}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.45, delay: index * 0.08 }}
                                            viewport={{ once: true, amount: 0.35 }}
                                            className="content-shell flex gap-4 rounded-3xl p-4"
                                        >
                                            <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-cyber-accent/20 bg-cyber-accent/8 text-cyber-accent">
                                                <Icon size={18} />
                                            </div>
                                            <p className="text-soft text-sm leading-7 sm:text-base">{line}</p>
                                        </MotionDiv>
                                    );
                                })}
                            </div>
                        </Card>

                        <div className="grid gap-6">
                            <Card title="About Me" eyebrow="Positioning">
                                <div className="text-soft space-y-4 text-sm leading-7 sm:text-base sm:leading-8">
                                    {profile.about.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>
                            </Card>

                            <Card title="Currently Exploring" eyebrow="Personality">
                                <div className="space-y-3">
                                    {profile.personality.map((item) => (
                                        <div key={item} className="content-shell text-soft rounded-2xl border-cyber-pink/15 px-4 py-4 text-sm leading-7">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </Section>

                <Section className="pb-36 sm:pb-32 lg:min-w-[145vw]">
                    <div className="w-full">
                        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.35em] text-cyber-yellow/75">Experience</p>
                                <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">Career Timeline</h2>
                            </div>
                            <p className="text-muted-strong max-w-xl text-sm leading-7 lg:text-right">
                                Real internship work, open-source collaboration, and backend/AI systems built with production-oriented thinking.
                            </p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            {profile.experience.map((exp, index) => (
                                <MotionDiv
                                    key={`${exp.company}-${exp.role}`}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: index * 0.08 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <Card title={exp.role} eyebrow={exp.company} className="h-full">
                                        <p className="text-sm uppercase tracking-[0.25em] text-cyber-accent/85">{exp.period}</p>
                                        <ul className="mt-5 space-y-3">
                                            {exp.points.map((point) => (
                                                <li key={point} className="content-shell text-soft rounded-2xl px-4 py-3">
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 flex flex-wrap gap-2">
                                            {exp.tech.split(',').map((item) => (
                                                <span key={item} className="rounded-full border border-cyber-accent/20 bg-cyber-accent/8 px-3 py-1 text-sm text-cyber-accent">
                                                    {item.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </Card>
                                </MotionDiv>
                            ))}
                        </div>
                    </div>
                </Section>

                <Section className="pb-36 sm:pb-32 lg:min-w-[180vw]">
                    <div ref={projectsRef} className="w-full" id="projects">
                        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.35em] text-cyber-yellow/75">Featured Work</p>
                                <h2 className="text-strong mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">Projects That Prove I Can Build</h2>
                            </div>
                            <div className="panel-surface inline-flex items-center gap-2 rounded-full border-cyber-pink/20 bg-cyber-pink/8 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
                                <Gauge size={14} />
                                Built for proof, not filler
                            </div>
                        </div>

                        <div className="panel-surface mb-6 rounded-[28px] border-cyber-accent/14 bg-[#08111d]/88 p-4">
                            <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
                                <label className="content-shell flex items-center gap-3 rounded-2xl px-4 py-3">
                                    <Search size={18} className="text-cyber-accent" />
                                    <input
                                        value={projectQuery}
                                        onChange={(event) => setProjectQuery(event.target.value)}
                                        placeholder="Search projects, systems, or technologies"
                                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/45"
                                    />
                                </label>

                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.26em] text-cyber-yellow/75">
                                        <SlidersHorizontal size={14} />
                                        Filter
                                    </span>
                                    {projectFilters.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveProjectFilter(filter)}
                                            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                                                activeProjectFilter === filter
                                                    ? 'bg-cyber-accent text-black shadow-[0_0_24px_rgba(125,249,255,0.28)]'
                                                    : 'content-shell text-cyan-100 hover:border-cyber-accent/35 hover:text-white'
                                            }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-white/55">
                                <span>{filteredProjects.length} results</span>
                                <span className="hidden md:block">Secret mode available for curious visitors</span>
                            </div>
                        </div>

                        {filteredProjects.length === 0 ? (
                            <Card title="No Matching Projects" eyebrow="Explorer" className="border-cyber-accent/18 bg-[#08111d]/90">
                                <p className="text-soft">
                                    No projects match that combination yet. Try another keyword or switch the filter back to `All`.
                                </p>
                            </Card>
                        ) : (
                        <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-4">
                            {filteredProjects.map((project, index) => (
                                <MotionDiv
                                    key={project.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: index * 0.08 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                >
                                    <div
                                        onMouseEnter={() => setHoveredProject(project.title)}
                                        onMouseLeave={() => setHoveredProject(null)}
                                        className="group h-full"
                                    >
                                    <Card title={project.title} eyebrow={project.eyebrow} className="relative flex h-full flex-col overflow-hidden border-cyber-pink/20 bg-gradient-to-b from-[#08111d]/96 to-[#0d2330]/76 transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_60px_rgba(125,249,255,0.12)]">
                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-accent/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        <div className="mb-4 flex items-center justify-between gap-3">
                                            <span className="rounded-full border border-cyber-accent/18 bg-cyber-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-100">
                                                {hoveredProject === project.title ? 'Preview Active' : 'System Build'}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {[0, 1, 2].map((bar) => (
                                                    <MotionDiv
                                                        key={bar}
                                                        className="w-1 rounded-full bg-cyber-accent/80"
                                                        animate={hoveredProject === project.title ? { height: [6, 18, 7] } : { height: 6 }}
                                                        transition={{ repeat: hoveredProject === project.title ? Infinity : 0, duration: 0.8 + bar * 0.08 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-soft">{project.description}</p>
                                        <p className="content-shell mt-4 rounded-2xl border-cyber-accent/15 px-4 py-4 text-sm leading-7 text-cyan-50">
                                            {project.impact}
                                        </p>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <MotionDiv
                                                    key={tech}
                                                    whileHover={{ y: -2 }}
                                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyber-yellow transition-colors duration-300 group-hover:border-cyber-accent/28 group-hover:bg-cyber-accent/10"
                                                >
                                                    {tech}
                                                </MotionDiv>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex items-center gap-3 pt-2">
                                            <SmartLink href={project.link} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyber-accent transition-colors hover:text-white">
                                                Open Project
                                                <ExternalLink size={16} />
                                            </SmartLink>
                                        </div>
                                    </Card>
                                    </div>
                                </MotionDiv>
                            ))}
                        </div>
                        )}
                    </div>
                </Section>

                <Section className="pb-36 sm:pb-32 lg:min-w-[150vw]">
                    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr_0.95fr]">
                        <Card title="Tech Stack" eyebrow="Skills">
                            <div className="flex flex-wrap gap-3">
                                {profile.skills.map((skill, index) => (
                                    <MotionDiv
                                        key={skill}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        transition={{ duration: 0.18 }}
                                        className="panel-surface rounded-full border-cyber-accent/22 bg-cyber-accent/8 px-4 py-2 text-sm text-cyan-50"
                                        style={{ animationDelay: `${index * 80}ms` }}
                                    >
                                        {skill}
                                    </MotionDiv>
                                ))}
                            </div>
                        </Card>

                        <Card title="Open Source Contributions" eyebrow="Proof of Collaboration">
                            <div className="space-y-4">
                                {profile.openSource.map((item) => (
                                    <SmartLink
                                        key={item.title}
                                        href={item.link}
                                        className="content-shell flex items-start gap-3 rounded-2xl px-4 py-4 transition-colors hover:border-cyber-pink/35 hover:bg-cyber-pink/8"
                                    >
                                        <FolderGit2 className="mt-0.5 flex-shrink-0 text-cyber-pink" size={18} />
                                        <span>
                                            <span className="text-strong block font-semibold">{item.title}</span>
                                            <span className="text-muted-strong mt-1 block text-sm leading-6">{item.description}</span>
                                        </span>
                                    </SmartLink>
                                ))}
                            </div>
                        </Card>

                        <Card title="Honors & Achievements" eyebrow="Signals">
                            <ul className="space-y-4">
                                {profile.achievements.map((achievement) => (
                                    <li key={achievement} className="content-shell flex items-start gap-3 rounded-2xl px-4 py-4">
                                        <Award className="mt-0.5 flex-shrink-0 text-cyber-yellow" size={18} />
                                        <span className="text-soft">{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </Section>

                <Section className="pb-36 sm:pb-32 lg:min-w-[110vw]">
                    <Card className="overflow-hidden border-cyber-accent/20 bg-gradient-to-r from-[#080b17]/96 via-[#090d18]/92 to-[#0d2330]/78">
                        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.35em] text-cyber-yellow/75">Contact</p>
                                <h2 className="text-strong mt-3 text-3xl font-black sm:text-4xl lg:text-6xl">Let&apos;s build something serious.</h2>
                                <p className="text-soft mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
                                    I&apos;m targeting backend and AI engineering opportunities where I can contribute to real products, reliable systems, and applied LLM workflows.
                                </p>
                            </div>

                            <div className="grid gap-3">
                                <SmartLink href={profile.links.contact} className="inline-flex items-center justify-center gap-3 rounded-full bg-cyber-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black transition-transform hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(0,243,255,0.28)]">
                                    <Mail size={18} />
                                    Contact Me
                                </SmartLink>
                                <SmartLink href={profile.links.github} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                                    <Github size={18} />
                                    GitHub
                                </SmartLink>
                                <SmartLink href={profile.links.linkedin} className="inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                                    <Linkedin size={18} />
                                    LinkedIn
                                </SmartLink>
                            </div>
                        </div>
                    </Card>
                </Section>
            </div>
        </div>
    );
}

export default App;
