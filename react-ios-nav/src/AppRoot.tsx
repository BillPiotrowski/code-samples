import { useOutlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { API } from './API';
import type { NavListGroup } from './Component/SplitNav/SplitNavTypes';
import Modal from './Component/Modal/Modal';
import SplitNav from './Component/SplitNav/SplitNav';

const nav: NavListGroup[] = [
    {
        title: 'Artists',
        items: [
            { title: 'Durer Woodcuts', to: 'durer-woodcuts' },
            { title: 'Artists', to: 'artists' },
        ]
    },
];

export interface AppRootContext {
    api: API;
    isSessionMode: boolean;
    setIsSessionMode: (mode: boolean) => void;
    setModal: (modal: React.JSX.Element | null) => void;
}

interface AnimatedOutletProps<TContext> {
    context: TContext;
}

export function AnimatedOutlet<TContext>(props: AnimatedOutletProps<TContext>): React.ReactElement {
    const o = useOutlet(props.context);
    const [outlet, setOutlet] = useState(o);

    useEffect(() => {
        setOutlet(o);
    }, [props.context]);

    return <>{outlet}</>;
}

interface AppRootProps {
    api: API;
}

const AppRoot = (props: AppRootProps) => {
    const [modal, setModal] = useState<React.JSX.Element | null>(null);
    const [isSessionMode, setIsSessionMode] = useState(false);

    const extraContext: AppRootContext = {
        api: props.api,
        isSessionMode,
        setIsSessionMode,
        setModal,
    };

    return <>
        <div style={{ position: 'fixed', zIndex: 70 }}>
            <AnimatePresence mode="sync">
                {modal !== null && (
                    <Modal closeHandler={() => setModal(null)}>{modal}</Modal>
                )}
            </AnimatePresence>
        </div>
        <SplitNav<AppRootContext> navGroups={nav} defaultTitle="Mirrorscape" extraContext={extraContext} />
    </>;
};

export default AppRoot;
