import React from 'react';
import styles from './List.module.scss';

interface ListArgs {
    children: React.JSX.Element[]|React.JSX.Element|null;
    className?: string;
}

const List: React.FC<ListArgs> = (args) => {

    return <ul className={`${styles.list} ${args.className ?? ''}`}>
        {args.children}
    </ul>
}

export default List;
