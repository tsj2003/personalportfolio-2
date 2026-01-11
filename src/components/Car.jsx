import { motion, useTransform } from 'framer-motion';

const Car = ({ scrollProgress }) => {
    // Drive across screen from left to right as user scrolls
    const x = useTransform(scrollProgress, [0, 1], ["0vw", "70vw"]);

    return (
        <motion.div
            style={{ x }}
            className="fixed bottom-10 left-10 md:left-20 z-50 pointer-events-none"
        >
            {/* Spotlight Effect - User requested "vibe" matching the reference */}
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
            <div className="absolute top-10 left-32 w-96 h-32 bg-gradient-to-r from-cyan-500/30 to-transparent blur-xl -rotate-12 mix-blend-screen pointer-events-none" />

            {/* The Car Image - Now using transparent PNG */}
            <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                className="relative"
            >
                <img
                    src="/car_transparent.png"
                    alt="Player Car"
                    className="w-48 md:w-64 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    style={{
                        imageRendering: 'pixelated',
                        filter: 'contrast(1.1) brightness(1.1)'
                    }}
                />

                {/* Headlights */}
                <div className="absolute top-[45%] right-0 w-64 h-24 bg-gradient-to-r from-blue-400/50 to-transparent blur-lg opacity-80"
                    style={{ transform: 'rotate(-5deg)' }} />

                {/* Taillights Trail */}
                <div className="absolute top-[40%] right-[85%] w-32 h-2 bg-pink-500/80 blur-md opacity-60" />

                {/* Glow effect under car */}
                <div className="absolute -bottom-4 left-4 right-4 h-6 bg-cyan-500/40 blur-xl opacity-60 rounded-full animate-pulse" />
            </motion.div>

            {/* Speed lines - Flowing backwards (Right to Left) for Forward Motion */}
            <motion.div
                className="absolute top-1/2 -right-20 w-32 h-1 bg-gradient-to-l from-white to-transparent opacity-50"
                animate={{ x: [20, -100], opacity: [0, 0.8, 0] }}
                transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
            />
            <motion.div
                className="absolute top-1/4 -right-10 w-20 h-0.5 bg-gradient-to-l from-cyber-pink to-transparent opacity-50"
                animate={{ x: [10, -80], opacity: [0, 0.6, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear", delay: 0.1 }}
            />
        </motion.div>
    );
};

export default Car;
