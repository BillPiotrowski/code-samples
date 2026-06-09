import React from 'react';
import {motion} from 'framer-motion';

interface SplashScreenSegueProps {
    children?: React.ReactNode;
    fadeIn?: boolean;
}

/**
 * A segue that fades out on exit, but not on enter.
 * 
 * @param props 
 * @returns 
 */
const SplashScreenSegue: React.FC<SplashScreenSegueProps>  = props => {
    const fadeIn = props.fadeIn ?? true;
    return (
        <motion.div
            initial={{ opacity: fadeIn ? 0 : 1}}
            animate={{  opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                ease: "easeInOut",
                duration: 0.65,
            }}
        >
            {props.children}
        </motion.div>
    );
};

export default SplashScreenSegue;