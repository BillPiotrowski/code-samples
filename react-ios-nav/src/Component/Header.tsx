import React from 'react';
import styles from './Header.module.scss';
import { SecondaryButton } from './Button/SecondaryButton';

interface HeaderAction {
    name: string;
    onClick: () => void;
}

interface HeaderArgs {
    title: string;
    action?: HeaderAction;
}

const Header: React.FC<HeaderArgs> = (args) => {
    return <header className={styles.header}>
        <h2>{args.title}</h2>
        {args.action !== undefined &&
            <div>
                <SecondaryButton
                    onClick={e => {
                        e.preventDefault();
                        if(args.action === undefined){
                            return;
                        }
                        args.action.onClick();

                    }}
                >
                    {args.action.name}
                </SecondaryButton>
            </div>
        }

    </header>
}

export default Header;
