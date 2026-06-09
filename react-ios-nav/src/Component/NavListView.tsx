import React from 'react';
import type { SegueDirection } from '../Utility/PathParser';
import { motion } from 'framer-motion';
import viewStyles from './View.module.scss';
import type { AnimationPresenceCustomProps } from '../AppRoot';
import styles from './NavListView.module.scss';

interface NavListViewProps{
    segueDirection: SegueDirection;
    children?: React.ReactNode;
    className?: string;
    isLoading?: boolean;
}

const getInitialX = (direction: SegueDirection) => {

    if(direction === 'lateral'){
        return 0;
    }
    return direction === 'left' ? '-100%' : '100%';
}

const NavListView = (props: NavListViewProps) => {
    const direction = getInitialX(props.segueDirection);
    
    const variants = {
        exit: (values?: AnimationPresenceCustomProps) => {
            if(values === undefined){
                return {x: 0}
            }
            if(values.segueDirection === 'lateral'){
                return {x: 0}
            }
            return {
                x: values.segueDirection === 'left' ? "60%" : "-60%",
            };
        },
        enter: (_?: AnimationPresenceCustomProps) => {
            return {x: direction}
        }
    }

    const classNamesArray = [viewStyles.view, styles.navListView, props.className].filter(c => c !== undefined);
    const className = classNamesArray.join(' ');

    if(props.isLoading){
        return <div className={styles.pageContainer}>
            <motion.div
                className={className}
                variants={variants}
                animate={{x: 0}}
                exit="exit"
                initial="enter"
                transition={{
                    ease: "easeInOut",
                    duration: 0.35,
                }}
            >
                Loading...
            </motion.div>
        </div>
    }

    return (
        <div className={styles.pageContainer}>
            <motion.div
                className={className}
                variants={variants}
                animate={{x: 0}}
                exit="exit"
                initial="enter"
                transition={{
                    ease: "easeInOut",
                    duration: 0.35,
                }}
            >
                {props.children}
            </motion.div>
        </div>
    );
};

export default NavListView;
