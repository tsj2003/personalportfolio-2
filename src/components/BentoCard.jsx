import { motion } from 'framer-motion';

const BentoCard = ({ className = '', children, bgColor = 'bg-white', ...props }) => {
    return (
        <motion.div
            whileHover={{ 
                y: -5,
                transition: { type: 'spring', stiffness: 300, damping: 15 }
            }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl border-[3px] border-neutral-900 shadow-[4.5px_4.5px_0px_0px_#111] p-6 md:p-8 transition-shadow duration-200 ${bgColor} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default BentoCard;
