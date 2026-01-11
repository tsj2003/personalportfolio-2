import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Background = ({ scrollProgress }) => {
    const ref = useRef(null);

    // Parallax effects
    const skyX = useTransform(scrollProgress, [0, 1], ["0%", "-10%"]);
    const cityX = useTransform(scrollProgress, [0, 1], ["0%", "-30%"]);
    const roadX = useTransform(scrollProgress, [0, 1], ["0%", "-500%"]); // Infinite scroll effect

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            {/* 1. Sky / Stars Layer */}
            <div className="absolute inset-0 bg-cyber-bg">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
                {/* Using a css gradient for deep space feel */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020024] to-[#090979/40]"></div>
            </div>

            {/* 2. City Skyline Layer (Parallax Slow) */}
            <motion.div
                style={{ x: cityX }}
                className="absolute bottom-0 left-0 w-[200vw] h-full flex items-end opacity-100" // Increased opacity
            >
                <img src="/bg.png" alt="City Skyline" className="w-auto h-[85vh] md:h-[95vh] object-cover object-bottom" />
                <img src="/bg.png" alt="City Skyline Repeat" className="w-auto h-[85vh] md:h-[95vh] object-cover object-bottom" />
            </motion.div>

            {/* 3. Road / Ground Layer (Parallax Fast) */}
            {/* 3. Road / Ground Layer (Parallax Fast) */}
            <motion.div
                style={{ backgroundPositionX: roadX }}
                className="absolute bottom-0 left-0 w-full h-32 md:h-48 z-10"
            >
                <div className="w-full h-full bg-[url('/road.png')] bg-repeat-x bg-contain bg-bottom mix-blend-screen opacity-100" />
            </motion.div>

            {/* Overlay Gradient for integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
        </div>
    );
};

export default Background;
