import { motion, useTransform } from 'framer-motion';

const MotionDiv = motion.div;

const Car = ({ scrollProgress, isCompact }) => {
    // Drive across screen from left to right as user scrolls
    const x = useTransform(scrollProgress, [0, 1], isCompact ? ["0vw", "18vw"] : ["0vw", "68vw"]);

    return (
        <MotionDiv
            style={{ x }}
            className="fixed bottom-20 left-3 z-0 pointer-events-none sm:bottom-24 sm:left-4 lg:bottom-6 lg:left-16"
        >
            {/* Spotlight Effect - User requested "vibe" matching the reference */}
            <div className="absolute -top-10 -left-8 h-[180px] w-[180px] rounded-full bg-blue-500/10 blur-[60px] mix-blend-screen pointer-events-none sm:-top-14 sm:-left-12 sm:h-[260px] sm:w-[260px] lg:-top-20 lg:-left-20 lg:h-[500px] lg:w-[500px] lg:blur-[100px]" />
            <div className="absolute top-6 left-14 h-12 w-28 bg-gradient-to-r from-cyan-500/30 to-transparent blur-xl -rotate-12 mix-blend-screen pointer-events-none sm:top-8 sm:left-20 sm:h-20 sm:w-48 lg:top-10 lg:left-32 lg:h-32 lg:w-96" />

            {/* The Car Image - Now using transparent PNG */}
            <MotionDiv
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                className="relative"
            >
                <img
                    src="/car_transparent.png"
                    alt="Player Car"
                    className="w-28 sm:w-36 lg:w-56 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    style={{
                        imageRendering: 'pixelated',
                        filter: 'contrast(1.1) brightness(1.1)'
                    }}
                />

                {/* Headlights */}
                <div className="absolute top-[45%] right-0 h-10 w-24 bg-gradient-to-r from-blue-400/50 to-transparent blur-lg opacity-80 sm:h-14 sm:w-36 lg:h-24 lg:w-64"
                    style={{ transform: 'rotate(-5deg)' }} />

                {/* Taillights Trail */}
                <div className="absolute top-[40%] right-[85%] h-1.5 w-14 bg-cyber-pink/80 blur-md opacity-60 sm:w-20 lg:h-2 lg:w-28" />

                {/* Glow effect under car */}
                <div className="absolute -bottom-3 left-2 right-2 h-4 rounded-full bg-cyan-500/40 blur-xl opacity-60 animate-pulse sm:left-3 sm:right-3 lg:-bottom-4 lg:left-4 lg:right-4 lg:h-6" />
            </MotionDiv>

            {/* Speed lines - Flowing backwards (Right to Left) for Forward Motion */}
            <MotionDiv
                className="absolute top-1/2 -right-10 h-1 w-14 bg-gradient-to-l from-white to-transparent opacity-50 sm:-right-12 sm:w-20 lg:-right-20 lg:w-32"
                animate={{ x: [20, -100], opacity: [0, 0.8, 0] }}
                transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
            />
            <MotionDiv
                className="absolute top-1/4 -right-4 h-0.5 w-10 bg-gradient-to-l from-cyber-pink to-transparent opacity-50 sm:-right-6 sm:w-14 lg:-right-10 lg:w-20"
                animate={{ x: [10, -80], opacity: [0, 0.6, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear", delay: 0.1 }}
            />
        </MotionDiv>
    );
};

export default Car;
