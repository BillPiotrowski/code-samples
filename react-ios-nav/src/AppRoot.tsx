import { useLocation, useOutlet, useResolvedPath, Outlet, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from './AppRoot.module.scss';
import { type SegueDirection, stripTrailingSlash, getSegueDirection } from './Utility/PathParser';
import Modal from './Component/Modal/Modal';
import TitleBar, { type TitleBarTool } from './Component/TitleBar';
import useIsSingleColumnLayout from './Utility/isSingleColumnEffect';
import MenuNavigation from './Component/MenuNavigation';
import { AnimatePresence } from 'framer-motion';
import type { API } from './API';
import type { NavListContext } from './Component/NavListContext';
// import type { NavListContext } from './Component/NavListContext';

const nav = [
    {
        title: 'Artists',
        items: [
            // {title: 'Home', to: '..'},
            {title: 'Durer Woodcuts', to: 'durer-woodcuts'},
        ]
    },
]

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
    setBackUrl: (url: string|null) => void;
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
    // mirrorscapeAPI: MirrorscapeAPI;
    // userId: string;
    // mirrorscapeUser: MirrorscapeUser;
    // assetFilters: GetAssetFiltersResponse;
    // rulesets: Ruleset[]
}

const AppRoot = (props: AppRootProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    // const resolvedPath = useResolvedPath('.');

    const isSingleColumn = useIsSingleColumnLayout();

    const isRoot = (
        location.pathname === ''
        || location.pathname === '/'
    )

    const [previousPath, setPreviousPath] = useState<string|null>(null);
    const [isSessionMode, setIsSessionMode] = useState(false);
    // const [message, setMessage] = useState<null | MessageData>(null);
    const [modal, setModal] = useState<React.JSX.Element | null>(null);
    const [title, setTitle] = useState("Mirrorscape");
    const [tools, setTools] = useState<TitleBarTool[]>([]);
    const [backUrl2, setBackUrl] = useState<string|null>(null);
    const [showMobileMenu, setShowMobileMenu] = useState(isSingleColumn && isRoot);

    useEffect(() => {
        setShowMobileMenu(false);
    }, [location]);

    const resolvedPath = useResolvedPath('.');

    const locationArray = location.pathname.split('/').filter(p => p !== '');
    const backArray = getBackUrlFromPathArray(locationArray);
    const backUrl = (backArray !== null) ? backArray : null;

    const showBackButton = backUrl !== null || (
        isSingleColumn &&
        locationArray.length < 2 &&
        !showMobileMenu
    );


    const setTitleHandler = (title: string) => {
        setTitle(title);
    }

    // const gameSystemData: GameSystemData = {
    //     name: 'Fallout Factions Nuka World',
    //     id: 'ffnw',
    //     iconUrl: '/wp-content/themes/mirrorscape-theme/assets/images/game-system-icons/ffnw.png'
    // }

    const sequeDirection: SegueDirection = (previousPath !== null) ? getSegueDirection(resolvedPath.pathname, location.pathname, previousPath) : 'lateral';

    const context: NavListContext = {
        direction: sequeDirection,
        previousPath: previousPath,
        // mirrorscapeAPI: props.mirrorscapeAPI,
        // userId: props.userId,
        toPath: stripTrailingSlash(location.pathname),
        isSessionMode,
        setIsSessionMode,

        // selectedGameSystemData: gameSystemData,
        // setMessageHandler: setMessage,
        // mirrorscapeUser: props.mirrorscapeUser,
        setModal,
        // mirrorscapeAPI: MirrorscapeAPI;
        // taxonomyDefinitions: props.assetFilters,
        setTitle: setTitleHandler,
        // rulesets: props.rulesets,
        sequeDirection: sequeDirection,
        setTools,
        setBackUrl,
        setPreviousPath,
        api: props.api
    };

    const classes: string[] = [
        styles.appContainer,
        (isSingleColumn) ? styles.isSingleColumn : styles.isMultiColumn,
        (showMobileMenu) ? styles.singleColumnMenuOpen : styles.singleColumnMenuClosed,
    ]

    const titleBar = (showMobileMenu) 
        ? <TitleBar
            showBackButton={false}
            backHandler={() => {}}
            title='Menu'
        /> 
        : <TitleBar
            showBackButton={showBackButton}
            backHandler={() => {
                if(backUrl === null){
                    setShowMobileMenu(true);
                    return;
                }
                navigate(backUrl);
            }} title={title}
            tools={tools}
        />

    return (
        <div className={classes.join(' ')}>
            {/* <Message
                message={message}
                clearMessageHandler={() => setMessage(null)}
            /> */}
            <div id="appRoot" className={styles.app}>
                
                <div className={styles.modalContainer}>
                    <AnimatePresence mode='sync'>
                        {modal !== null && <Modal
                            closeHandler={() => {
                                setModal(null);
                            }}
                        >{modal}</Modal>}
                    </AnimatePresence>
                </div>
                <div className={styles.navContainer} key="menuContainer">
                    <MenuNavigation navListGroups={nav} isSingleColumn={isSingleColumn} />
                </div>
                <div className={styles.titleContainer} key="titleContainer">
                    {titleBar}
                </div>
                <div className={styles.itemContainer}>
                    <Outlet context={context} />
                </div>
            </div> 
        </div>
    )
};


export default AppRoot;


const doubleBackUrls = [
    '/characters/ffnw',
    '/armies/ffnw',
    '/rulesets/ffnw/feature'
]

const getBackUrlFromPathArray = (pathArray: string[]): string|null => {
    if(pathArray.length < 2){
        return null;
    }
    const previousPathArray = pathArray.filter((v,i) => {
        return i < pathArray.length - 1;
    });
    const backURL = `/${previousPathArray.join('/')}`;
    if(doubleBackUrls.includes(backURL)){
        return getBackUrlFromPathArray(previousPathArray);
    }
    return `/${previousPathArray.join('/')}`;
}