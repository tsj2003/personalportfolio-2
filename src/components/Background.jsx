import { motion, useTransform } from 'framer-motion';

const MotionDiv = motion.div;
const stars = Array.from({ length: 18 }, (_, index) => ({
    id: index,
    top: `${(index * 11) % 72 + 4}%`,
    left: `${(index * 17) % 94 + 2}%`,
    size: index % 3 === 0 ? 3 : 2,
    duration: 3 + (index % 5) * 0.6,
    delay: index * 0.18
}));

const Background = ({ scrollProgress, isCompact }) => {
    const cityX = useTransform(scrollProgress, [0, 1], ["0%", isCompact ? "-10%" : "-30%"]);
    const roadX = useTransform(scrollProgress, [0, 1], ["0%", isCompact ? "-220%" : "-500%"]); // Infinite scroll effect

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            {/* 1. Sky / Stars Layer */}
            <div className="absolute inset-0 bg-cyber-bg">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
                {/* Using a css gradient for deep space feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020024]/90 via-[#050816]/72 to-[#090979]/28"></div>
                {stars.map((star) => (
                    <MotionDiv
                        key={star.id}
                        className="absolute rounded-full bg-cyan-100/65 shadow-[0_0_10px_rgba(0,243,255,0.25)]"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${star.size}px`,
                            height: `${star.size}px`
                        }}
                        animate={{ opacity: [0.2, 0.9, 0.3], scale: [1, 1.6, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: star.duration,
                            delay: star.delay,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>

            {/* 2. City Skyline Layer (Parallax Slow) */}
            <MotionDiv
                style={{ x: cityX }}
                className="absolute bottom-0 left-0 w-[200vw] h-full flex items-end opacity-70"
            >
                <img src="/bg.png" alt="City Skyline" className="w-auto h-[62vh] sm:h-[70vh] lg:h-[95vh] object-cover object-bottom blur-[1.5px] saturate-[0.9]" />
                <img src="/bg.png" alt="City Skyline Repeat" className="w-auto h-[62vh] sm:h-[70vh] lg:h-[95vh] object-cover object-bottom blur-[1.5px] saturate-[0.9]" />
            </MotionDiv>

            {/* 3. Road / Ground Layer (Parallax Fast) */}
            {/* 3. Road / Ground Layer (Parallax Fast) */}
            <MotionDiv
                style={{ backgroundPositionX: roadX }}
                className="absolute bottom-0 left-0 z-10 h-24 w-full sm:h-28 lg:h-36"
            >
                <div className="w-full h-full bg-[url('/road.png')] bg-repeat-x bg-contain bg-bottom mix-blend-screen opacity-64 blur-[0.4px]" />
            </MotionDiv>

            {/* Overlay Gradient for integration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,20,0.62),rgba(5,6,16,0.82)_45%,rgba(4,4,10,0.96))]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/20" />
            <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-t from-black/90 via-black/55 to-transparent lg:h-56" />
        </div>
    );
};

export default Background;
