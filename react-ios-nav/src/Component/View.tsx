import React from 'react';
import styles from './View.module.scss';

interface ViewProps {
    children?: React.ReactNode;
    className?: string;
}

const View = (props: ViewProps) => {
    const className = (props.className !== undefined) ? `${styles.view} ${props.className}` : styles.view;
    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default View;