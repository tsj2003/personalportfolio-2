import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (isPlaying) {
                audio.pause();
            } else {
                await audio.play();
            }
            setIsPlaying(!isPlaying);
        } catch (error) {
            console.error("Audio playback error:", error);
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
            {/* Visualizer (Only visible when playing) */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-1 h-8 items-end"
                    >
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 bg-cyber-accent"
                                animate={{ height: [10, 32, 10] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.5 + i * 0.1,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controller */}
            <div className="bg-black/80 backdrop-blur-md border border-cyber-pink/50 rounded-full p-2 flex items-center gap-2 shadow-[0_0_15px_rgba(188,19,254,0.3)]">

                {/* Song Info (Hidden on small screens) */}
                <div className="hidden md:flex flex-col px-2 text-right">
                    <span className="text-[10px] text-cyber-yellow font-mono uppercase tracking-widest">Now Playing</span>
                    <span className="text-xs text-white font-bold truncate max-w-[100px]">Dhurandhar OST</span>
                </div>

                <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-cyber-pink flex items-center justify-center text-white hover:bg-cyber-accent transition-colors shadow-lg"
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                </button>

                <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
            </div>

            <audio ref={audioRef} loop src="/music.mp3" />
        </div>
    );
};

export default AudioPlayer;
