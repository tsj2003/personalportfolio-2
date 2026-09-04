import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, MicOff, MessageSquare, Send, X } from 'lucide-react';
import { askRag, getQuickPrompts } from '../lib/rag';
import { profile } from '../data';

const STATES = ['idle', 'listening', 'transcribing', 'thinking', 'answering'];
const STATUS_LABELS = ['LISTENING', 'TRANSCRIBING', 'THINKING', 'ANSWERING'];

function speak(text, onEnd) {
    if (!window.speechSynthesis) {
        onEnd?.();
        return null;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.02;
    utter.pitch = 1;
    utter.onend = () => onEnd?.();
    utter.onerror = () => onEnd?.();
    window.speechSynthesis.speak(utter);
    return utter;
}

export default function VoiceRagAgent() {
    const [open, setOpen] = useState(false);
    const [phase, setPhase] = useState('idle');
    const [transcript, setTranscript] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: `Hey. I'm the TSJ systems agent for ${profile.name}. Ask about projects, experience, skills, or say you want to contact him.`,
        },
    ]);
    const [tick, setTick] = useState(0);
    const recognitionRef = useRef(null);
    const silenceTimer = useRef(null);
    const listRef = useRef(null);
    const phaseTimer = useRef(null);
    const prompts = useMemo(() => getQuickPrompts(), []);

    useEffect(() => {
        if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, phase]);

    useEffect(() => {
        if (phase === 'listening' || phase === 'answering') {
            const id = setInterval(() => setTick((t) => t + 1), 200);
            return () => clearInterval(id);
        }
        return undefined;
    }, [phase]);

    useEffect(() => () => {
        clearTimeout(silenceTimer.current);
        clearTimeout(phaseTimer.current);
        try {
            recognitionRef.current?.stop();
        } catch {
            /* ignore */
        }
        window.speechSynthesis?.cancel();
    }, []);

    const runQuery = useCallback(async (query) => {
        const q = query.trim();
        if (!q) return;

        clearTimeout(phaseTimer.current);
        setMessages((m) => [...m, { role: 'user', text: q }]);
        setTranscript(q);
        setPhase('transcribing');
        await new Promise((r) => setTimeout(r, 220));
        setPhase('thinking');

        try {
            const result = await askRag(q);
            setPhase('answering');
            setMessages((m) => [
                ...m,
                {
                    role: 'assistant',
                    text: result.answer,
                    sources: result.sources,
                    actions: result.actions,
                },
            ]);
            const finish = () => setPhase('idle');
            speak(result.answer, finish);
            // speechSynthesis can miss onend — never leave pills stuck
            phaseTimer.current = setTimeout(finish, Math.min(12000, 1800 + result.answer.length * 45));
        } catch {
            setMessages((m) => [
                ...m,
                {
                    role: 'assistant',
                    text: `Something went wrong retrieving from the knowledge base. Email ${profile.email} directly.`,
                },
            ]);
            setPhase('idle');
        }
    }, []);

    const stopListening = useCallback(() => {
        clearTimeout(silenceTimer.current);
        try {
            recognitionRef.current?.stop();
        } catch {
            /* ignore */
        }
    }, []);

    const startListening = useCallback(() => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) {
            setMessages((m) => [
                ...m,
                {
                    role: 'assistant',
                    text: 'Voice is not supported in this browser. Type your question below, or use Chrome/Edge for mic mode.',
                },
            ]);
            return;
        }

        window.speechSynthesis?.cancel();
        const recognition = new SR();
        recognitionRef.current = recognition;
        recognition.lang = 'en-IN';
        recognition.interimResults = true;
        recognition.continuous = false;

        let finalText = '';
        setPhase('listening');
        setTranscript('');

        recognition.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i += 1) {
                const piece = event.results[i][0].transcript;
                if (event.results[i].isFinal) finalText += `${piece} `;
                else interim += piece;
            }
            setTranscript((finalText || interim).trim());
            clearTimeout(silenceTimer.current);
            silenceTimer.current = setTimeout(() => {
                try {
                    recognition.stop();
                } catch {
                    /* ignore */
                }
            }, 1400);
        };

        recognition.onerror = () => {
            setPhase('idle');
        };

        recognition.onend = () => {
            const q = finalText.trim();
            if (q) runQuery(q);
            else setPhase('idle');
        };

        try {
            recognition.start();
        } catch {
            setPhase('idle');
        }
    }, [runQuery]);

    const toggleMic = () => {
        if (phase === 'listening') {
            stopListening();
            return;
        }
        if (phase === 'answering') {
            window.speechSynthesis?.cancel();
            setPhase('idle');
            return;
        }
        startListening();
    };

    const submitText = (e) => {
        e?.preventDefault();
        if (!input.trim() || phase === 'thinking' || phase === 'transcribing') return;
        const q = input.trim();
        setInput('');
        runQuery(q);
    };

    const activeStatus = {
        idle: -1,
        listening: 0,
        transcribing: 1,
        thinking: 2,
        answering: 3,
    }[phase];

    const ticks = Array.from({ length: 64 }, (_, i) => i);

    return (
        <>
            <button
                type="button"
                className="vra-fab"
                onClick={() => setOpen(true)}
                aria-label="Open TSJ voice RAG agent"
            >
                <Mic size={18} />
                <span>Ask TSJ</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="vra-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="vra-panel"
                            initial={{ opacity: 0, y: 40, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="vra-top">
                                <div>
                                    <p className="vra-kicker">TSJ · RAG AGENT</p>
                                    <h3>Voice systems assistant</h3>
                                </div>
                                <button type="button" className="vra-close" onClick={() => setOpen(false)} aria-label="Close">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="vra-stage">
                                <button
                                    type="button"
                                    className={`vra-wheel${phase === 'listening' ? ' is-live' : ''}${
                                        phase === 'answering' ? ' is-talk' : ''
                                    }`}
                                    onClick={toggleMic}
                                    aria-label={phase === 'listening' ? 'Stop listening' : 'Start voice'}
                                >
                                    <div className="vra-ticks" aria-hidden="true">
                                        {ticks.map((i) => {
                                            const live =
                                                phase === 'listening' || phase === 'answering'
                                                    ? 0.35 + Math.abs(Math.sin((tick + i) * 0.22)) * 0.65
                                                    : 0.35 + (i % 7 === 0 ? 0.35 : 0);
                                            return (
                                                <span
                                                    key={i}
                                                    style={{
                                                        transform: `rotate(${(360 / ticks.length) * i}deg) translateY(-78px) scaleY(${live})`,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="vra-core">
                                        {phase === 'listening' ? <MicOff size={28} /> : <Mic size={28} />}
                                    </div>
                                </button>

                                <div className="vra-status-row">
                                    {STATUS_LABELS.map((label, i) => (
                                        <span
                                            key={label}
                                            className={`vra-pill${activeStatus === i ? ' is-active' : ''}${
                                                activeStatus > i ? ' is-done' : ''
                                            }`}
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>

                                <p className="vra-hint">
                                    Tap the wheel to speak. It stops on silence, or tap again. You can also type below.
                                </p>

                                {(transcript || phase !== 'idle') && (
                                    <p className="vra-live">{transcript || phase.toUpperCase()}</p>
                                )}
                            </div>

                            <div className="vra-chat" ref={listRef}>
                                {messages.map((m, idx) => (
                                    <div key={`${m.role}-${idx}`} className={`vra-msg vra-${m.role}`}>
                                        <p>{m.text}</p>
                                        {m.actions?.map((a) => (
                                            <a key={a.href} className="vra-action" href={a.href}>
                                                {a.label}
                                            </a>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="vra-prompts">
                                {prompts.map((p) => (
                                    <button key={p} type="button" onClick={() => runQuery(p)}>
                                        {p}
                                    </button>
                                ))}
                            </div>

                            <form className="vra-form" onSubmit={submitText}>
                                <MessageSquare size={16} className="vra-form-icon" />
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about projects, IIT Bombay, hiring, contact…"
                                />
                                <button type="submit" aria-label="Send">
                                    <Send size={16} />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
