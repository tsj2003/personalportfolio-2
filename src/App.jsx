import { useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { profile } from './data';
import Car from './components/Car';
import Background from './components/Background';
import AudioPlayer from './components/AudioPlayer';
import { Github, Linkedin, ExternalLink, ArrowRight, Award } from 'lucide-react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const Card = ({ title, children, className = "" }) => (
    <div className={`p-6 bg-cyber-bg/90 border border-cyber-accent/30 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.1)] ${className}`}>
        <h3 className="text-xl md:text-2xl font-bold text-cyber-accent mb-4 font-mono">{title}</h3>
        {children}
    </div>
);

const Section = ({ className, children }) => (
    <div className={`flex-shrink-0 w-screen h-screen flex items-center justify-center p-8 relative ${className}`}>
        {children}
    </div>
);

function App() {
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    useEffect(() => {
        // Initialize Lenis for smooth horizontal scrolling
        const lenis = new Lenis({
            orientation: 'horizontal',
            gestureOrientation: 'both',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            wrapper: containerRef.current, // Target the scroll container directly
            content: containerRef.current, // Target content for size calculation
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden text-white font-sans selection:bg-cyber-pink selection:text-white">

            <Background scrollProgress={scrollXProgress} />
            <Car scrollProgress={scrollXProgress} />
            <AudioPlayer />

            {/* Main Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="absolute top-0 left-0 w-full h-full overflow-x-auto overflow-y-hidden flex whitespace-nowrap"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >

                {/* HERO SECTION */}
                <Section className="text-center min-w-[100vw]">
                    <div className="max-w-4xl z-10 space-y-6 whitespace-normal">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyber-accent to-cyber-pink pb-4">
                                TARANDEEP SINGH
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-mono text-cyan-200 mt-2 font-bold drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                                {profile.role}
                            </h2>
                            <p className="mt-6 text-xl text-cyan-50 font-semibold max-w-2xl mx-auto drop-shadow-md bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                                {profile.tagline}
                            </p>

                            <div className="flex justify-center gap-6 mt-10">
                                <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-cyber-accent transition-colors">
                                    <Github size={32} />
                                </a>
                                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyber-accent transition-colors">
                                    <Linkedin size={32} />
                                </a>
                                <a href={profile.links.portfolio} target="" rel="noreferrer" className="hover:text-cyber-accent transition-colors">
                                    <ExternalLink size={32} />
                                </a>
                            </div>

                            <div className="mt-20 animate-pulse text-cyber-yellow text-sm font-mono">
                                SCROLL TO DRIVE <ArrowRight className="inline ml-2" />
                            </div>
                        </motion.div>
                    </div>
                </Section>

                {/* EDUCATION SECTION */}
                <Section className="min-w-[100vw]">
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full z-10 mt-[-100px] whitespace-normal">
                        {profile.education.map((edu, idx) => (
                            <Card key={idx} title={edu.degree}>
                                <p className="text-xl text-white font-semibold">{edu.institution}</p>
                                <p className="text-gray-400 font-mono mt-2">{edu.period}</p>
                                <p className="text-cyber-pink mt-4">{edu.details}</p>
                            </Card>
                        ))}
                    </div>
                    <div className="absolute bottom-32 left-[10%] opacity-20 text-6xl font-black text-white transform -rotate-12">
                        ACADEMY
                    </div>
                </Section>

                {/* EXPERIENCE SECTION */}
                <div className="flex-shrink-0 min-w-[150vw] h-screen flex items-center relative">
                    <div className="absolute top-20 left-20 text-4xl font-black text-cyber-accent border-b-4 border-cyber-pink pb-2">
                        CAREER TIMELINE
                    </div>

                    <div className="flex gap-16 px-32 mt-[-50px] w-full items-center whitespace-normal">
                        {profile.experience.map((exp, idx) => (
                            <motion.div
                                key={idx}
                                className="w-[500px] flex-shrink-0"
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-200px" }}
                            >
                                <Card title={exp.role}>
                                    <h4 className="text-lg text-cyber-yellow mb-2">{exp.company}</h4>
                                    <span className="text-xs font-mono text-gray-500">{exp.period}</span>
                                    <ul className="mt-4 space-y-2 text-gray-300 text-sm list-disc pl-5">
                                        {exp.points.map((p, i) => <li key={i}>{p}</li>)}
                                    </ul>
                                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                                        {exp.tech.split(',').map((t, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-cyber-accent border border-cyber-accent/20">
                                                {t.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* PROJECTS SECTION */}
                <div className="flex-shrink-0 min-w-[200vw] h-screen flex items-center relative">
                    <div className="absolute top-20 left-20 text-4xl font-black text-cyber-accent border-b-4 border-cyber-pink pb-2">
                        MISSION LOGS
                    </div>

                    <div className="flex gap-12 px-32 mt-[-100px] items-center whitespace-normal">
                        {profile.projects.map((proj, idx) => (
                            <div key={idx} className="w-[450px] flex-shrink-0 group relative">
                                <div className="absolute inset-0 bg-cyber-pink/20 blur-xl group-hover:bg-cyber-pink/40 transition-all rounded-xl" />
                                <Card title={proj.title} className="relative bg-black/80 backdrop-blur-xl border-cyber-pink/30 hover:border-cyber-pink transition-colors">
                                    <p className="text-gray-300 mb-4 h-20 overflow-hidden">{proj.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {proj.tech.map((t, i) => (
                                            <span key={i} className="text-xs font-mono text-cyber-yellow">#{t}</span>
                                        ))}
                                    </div>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-cyber-accent hover:text-white transition-colors gap-2 text-sm font-bold uppercase tracking-wider">
                                            View Project <ExternalLink size={16} />
                                        </a>
                                    )}
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SKILLS & ACHIEVEMENTS */}
                <Section className="min-w-[100vw]">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full z-10 mt-[-50px] whitespace-normal">
                        <Card title="Tech Stack">
                            <div className="flex flex-wrap gap-3">
                                {profile.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-cyber-accent/10 border border-cyber-accent/30 rounded-full text-cyber-accent text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Card>
                        <Card title="Honors & Achievements">
                            <ul className="space-y-4">
                                {profile.achievements.map((ach, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Award className="text-cyber-yellow flex-shrink-0" />
                                        <span className="text-gray-200">{ach}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </Section>

                {/* FINAL CTA */}
                <Section className="min-w-[100vw] bg-black/60 relative">
                    <div className="absolute inset-0 bg-gradient-to-l from-cyber-pink/20 to-transparent pointer-events-none" />
                    <div className="text-center z-10 whitespace-normal">
                        <h2 className="text-6xl font-black text-white mb-8 mb-4">
                            MISSION COMPLETE
                        </h2>
                        <p className="text-xl text-gray-400 mb-12">
                            Ready to deploy Tarandeep to your team?
                        </p>
                        <div className="flex flex-col gap-4 items-center">
                            <a href={profile.links.email} className="px-12 py-4 bg-cyber-accent text-black font-black text-xl rounded-full hover:scale-105 hover:shadow-[0_0_30px_#00f3ff] transition-all">
                                INITIATE CONTACT
                            </a>
                            <div className="flex gap-6 mt-8">
                                {Object.entries(profile.links).map(([key, url]) => (
                                    <a key={key} href={url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white uppercase text-sm font-mono tracking-widest">
                                        {key}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>

            </div>
        </div>
    );
}

export default App;
