import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

const TRACKS = [
    { src: '/mixkit-car-ignition-1535.wav', label: 'Ignition' },
    { src: '/music.mp3', label: 'Night Drive' }
];

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const audioRef = useRef(null);
    const track = TRACKS[trackIndex];

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        try {
            if (isPlaying) {
                audio.pause();
                return;
            }
            await audio.play();
        } catch {
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = !audio.muted;
        setIsMuted(audio.muted);
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setTrackIndex((i) => (i + 1) % TRACKS.length);

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !isPlaying) return;
        audio.play().catch(() => setIsPlaying(false));
    }, [trackIndex, isPlaying]);

    return (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-line bg-ink/90 px-3 py-2 backdrop-blur-md">
            <audio ref={audioRef} src={track.src} preload="none" />
            <button
                type="button"
                onClick={togglePlay}
                className="flex h-8 w-8 items-center justify-center rounded-full text-paper transition hover:text-brass"
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
                type="button"
                onClick={toggleMute}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:text-brass"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <span className="hidden pr-1 font-mono text-[10px] uppercase tracking-wider text-muted sm:inline">
                {track.label}
            </span>
        </div>
    );
}
