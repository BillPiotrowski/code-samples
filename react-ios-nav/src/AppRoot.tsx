import { useOutlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { type SegueDirection } from './Utility/PathParser';
import type { API } from './API';
import type { NavListGroup } from './Component/NavListData';
import SplitNav from './Component/SplitNav/SplitNav';

const nav: NavListGroup[] = [
    {
        title: 'Artists',
        items: [
            {title: 'Durer Woodcuts', to: 'durer-woodcuts'},
        ]
    },
];

export interface AnimationPresenceCustomProps {
    segueDirection: SegueDirection;
    toPath: string;
    fromPath: string|null;
}

export interface AppRootContext {
    direction: SegueDirection;
    previousPath: string|null;
    toPath: string;
    isSessionMode: boolean;
    setIsSessionMode: (mode: boolean) => void;
    setModal: (modal: React.JSX.Element|null) => void;
    setPreviousPath: (path: string) => void;
    api: API
}

interface AnimatedOutletProps {
    context: AppRootContext
}
/**
 * Is this still required?
 * @param props 
 * @returns 
 */
export const AnimatedOutlet = (props: AnimatedOutletProps) => {
    const o = useOutlet(props.context);
    const [outlet, setOutlet] = useState(o);

    useEffect(() => {
        setOutlet(o);
    }, [props.context]);

    return <>{outlet}</>;
};

interface AppRootProps {
    api: API;
}

const AppRoot = (props: AppRootProps) => {
    return <SplitNav navGroups={nav} defaultTitle="Mirrorscape" api={props.api} />;
};

export default AppRoot;