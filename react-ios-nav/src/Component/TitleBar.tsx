import styles from './TitleBar.module.scss';
import NeutralButton from './Button/NeutralButton';
import type React from 'react';

export interface TitleBarTool {
    title: string;
    toggleCallback: () => void;
    isDisabled?: boolean;
}

interface TitleBarProps {
    title: string
    tools?: TitleBarTool[];
    backHandler: () => void;
    showBackButton: boolean;
}

const TitleBar: React.FC<TitleBarProps> = props => {
    const backButton = (props.showBackButton) ? <NeutralButton onClick={e => {
        e.preventDefault();
        props.backHandler();
    }}>Back</NeutralButton> : null;

    return (
        <header className={`${styles.titleBar}`}>
            <div>{backButton}</div>
            <h1>{props.title}</h1>
            <ul>
                {(props.tools ?? []).map(tool => {
                    return <li key={tool.title}><NeutralButton disabled={tool.isDisabled ?? false} onClick={(e) => {
                        e.preventDefault();
                        tool.toggleCallback();
                    }}>{tool.title}</NeutralButton></li>
                })}
            </ul>
        </header>
    );
};

export default TitleBar;
