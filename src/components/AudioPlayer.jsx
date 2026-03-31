import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TRACKS = [
    { src: '/mixkit-car-ignition-1535.wav', label: 'Car Ignition FX', type: 'audio/wav' },
    { src: '/music.mp3', label: 'Night Drive Mix', type: 'audio/mpeg' }
];

const MotionDiv = motion.div;

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const audioRef = useRef(null);

    const track = TRACKS[trackIndex];

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            setHasError(false);
            if (isPlaying) {
                audio.pause();
                return;
            }
            await audio.play();
        } catch (error) {
            console.error('Audio playback error:', error);
            setHasError(true);
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        const nextMuted = !audio.muted;
        audio.muted = nextMuted;
        setIsMuted(nextMuted);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.45;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);
        const handleError = () => {
            if (trackIndex < TRACKS.length - 1) {
                setHasError(false);
                setTrackIndex((current) => current + 1);
                return;
            }
            setHasError(true);
            setIsPlaying(false);
        };

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('error', handleError);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('error', handleError);
        };
    }, [trackIndex]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.load();
    }, [trackIndex]);

    return (
        <div className="fixed inset-x-3 bottom-3 z-50 flex items-end justify-end gap-2 sm:inset-x-auto sm:bottom-4 sm:right-4 md:bottom-6 md:right-6">
            <AnimatePresence>
                {isPlaying && (
                    <MotionDiv
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="hidden md:flex h-8 items-end gap-1 rounded-full border border-cyber-accent/20 bg-black/55 px-2 py-1.5 backdrop-blur-lg"
                    >
                        {[...Array(4)].map((_, i) => (
                            <MotionDiv
                                key={i}
                                className="w-1 rounded-full bg-cyber-accent"
                                animate={{ height: [6, 18, 8] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.7 + i * 0.08,
                                    ease: 'easeInOut'
                                }}
                            />
                        ))}
                    </MotionDiv>
                )}
            </AnimatePresence>

            <div className="w-full max-w-[292px] rounded-[22px] border border-cyber-pink/35 bg-black/75 px-3 py-2.5 shadow-[0_0_24px_rgba(188,19,254,0.22)] backdrop-blur-xl sm:max-w-[320px]">
                <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.24em] text-cyber-yellow/80">Now Playing</p>
                        <p className="truncate text-xs font-semibold text-white sm:text-sm">{track.label}</p>
                    </div>
                    {hasError && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-red-400/40 bg-red-500/10 px-1.5 py-1 text-[9px] uppercase tracking-[0.16em] text-red-200">
                            <AlertCircle size={10} />
                            Issue
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-[auto_1fr] items-center gap-2">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={togglePlay}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-cyber-pink text-white transition-transform hover:scale-105"
                            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                        >
                            {isPlaying ? <Pause size={15} /> : <Play size={15} className="translate-x-0.5" />}
                        </button>

                        <button
                            onClick={toggleMute}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-colors hover:text-white"
                            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                        >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                    </div>

                    <p className="text-[11px] leading-4 text-gray-300 sm:text-xs">
                        Tap play for sound. Backup track loads automatically if needed.
                    </p>
                </div>

                <audio ref={audioRef} loop preload="auto" playsInline>
                    {TRACKS.map((item) => (
                        <source key={item.src} src={item.src} type={item.type} />
                    ))}
                </audio>
            </div>
        </div>
    );
};

export default AudioPlayer;
