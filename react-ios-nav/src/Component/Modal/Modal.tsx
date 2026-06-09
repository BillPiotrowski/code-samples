import React from 'react';
import styles from './Modal.module.scss';
import { motion } from 'framer-motion';
import { SecondaryButton } from '../Button/SecondaryButton';

interface ModalArgs {
    children: React.ReactNode;
    closeHandler: () => void;
}

const Modal: React.FC<ModalArgs> = (args) => {

    return <div className={styles.modalWrapper}>
        <motion.div
            className={styles.modal}
            key="modal"
            transition={{duration: 0.2}}
            animate={{top: 0}}
            initial={{top: '100vh'}}
            exit={{ top: '100vh' }}
        >
            <SecondaryButton
                className={styles.close}
                onClick={e => {
                    e.preventDefault();
                    args.closeHandler();
                }}
            >Close</SecondaryButton>
            {args.children}
        </motion.div>

        <motion.div
            className={styles.overlay}
            onClick={_ => {
                args.closeHandler();
            }}
            key="modalOverlay"
            initial={{opacity: 0}}
            transition={{duration: 0.4}}
            animate={{opacity: 0.8}}
            exit={{opacity: 0}}
        ></motion.div>
    </div>
    
}

export default Modal;
