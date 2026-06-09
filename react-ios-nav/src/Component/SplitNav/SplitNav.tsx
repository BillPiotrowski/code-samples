import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useResolvedPath, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { type SegueDirection, stripTrailingSlash, getSegueDirection } from '../../Utility/PathParser';
import type { NavListContext } from '../NavListContext';
import type { NavListGroup } from '../NavListData';
import TitleBar, { type TitleBarTool } from '../TitleBar';
import MenuNavigation from '../MenuNavigation';
import Modal from '../Modal/Modal';
import useIsSingleColumnLayout from '../../Utility/isSingleColumnEffect';
import type { API } from '../../API';
import styles from './SplitNav.module.scss';

interface SplitNavProps {
    navGroups: NavListGroup[];
    defaultTitle: string;
    api: API;
}

const SplitNav: React.FC<SplitNavProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath('.');
    const isSingleColumn = useIsSingleColumnLayout();

    const isRoot = location.pathname === '' || location.pathname === '/';

    const [previousPath, setPreviousPath] = useState<string | null>(null);
    const [isSessionMode, setIsSessionMode] = useState(false);
    const [modal, setModal] = useState<React.JSX.Element | null>(null);
    const [title, setTitle] = useState(props.defaultTitle);
    const [tools, setTools] = useState<TitleBarTool[]>([]);
    const [showMobileMenu, setShowMobileMenu] = useState(isSingleColumn && isRoot);

    useEffect(() => {
        setShowMobileMenu(false);
    }, [location]);

    const locationArray = location.pathname.split('/').filter(p => p !== '');
    const computedBackUrl = getBackUrlFromPathArray(locationArray);

    const showBackButton = computedBackUrl !== null || (
        isSingleColumn &&
        locationArray.length < 2 &&
        !showMobileMenu
    );

    const segueDirection: SegueDirection = previousPath !== null
        ? getSegueDirection(resolvedPath.pathname, location.pathname, previousPath)
        : 'lateral';

    const context: NavListContext = {
        direction: segueDirection,
        previousPath,
        toPath: stripTrailingSlash(location.pathname),
        isSessionMode,
        setIsSessionMode,
        setModal,
        setPreviousPath,
        api: props.api,
        setTitle: (t: string) => setTitle(t),
        sequeDirection: segueDirection,
        setTools,
    };

    const titleBar = showMobileMenu
        ? <TitleBar
            showBackButton={false}
            backHandler={() => {}}
            title="Menu"
        />
        : <TitleBar
            showBackButton={showBackButton}
            backHandler={() => {
                if (computedBackUrl === null) {
                    setShowMobileMenu(true);
                    return;
                }
                navigate(computedBackUrl);
            }}
            title={title}
            tools={tools}
        />;

    const classes = [
        isSingleColumn ? styles.isSingleColumn : styles.isMultiColumn,
        isSingleColumn
            ? (showMobileMenu ? styles.singleColumnMenuOpen : styles.singleColumnMenuClosed)
            : null,
    ].filter(Boolean).join(' ');

    return (
        <div className={classes}>
            <div className={styles.splitNav}>
                <div className={styles.modalContainer}>
                    <AnimatePresence mode="sync">
                        {modal !== null && (
                            <Modal closeHandler={() => setModal(null)}>
                                {modal}
                            </Modal>
                        )}
                    </AnimatePresence>
                </div>
                <div className={styles.navContainer}>
                    <MenuNavigation navListGroups={props.navGroups} isSingleColumn={isSingleColumn} />
                </div>
                <div className={styles.titleContainer}>
                    {titleBar}
                </div>
                <div className={styles.itemContainer}>
                    <Outlet context={context} />
                </div>
            </div>
        </div>
    );
};

export default SplitNav;


const doubleBackUrls = [
    '/characters/ffnw',
    '/armies/ffnw',
    '/rulesets/ffnw/feature',
];

const getBackUrlFromPathArray = (pathArray: string[]): string | null => {
    if (pathArray.length < 2) {
        return null;
    }
    const previousPathArray = pathArray.filter((_, i) => i < pathArray.length - 1);
    const backURL = `/${previousPathArray.join('/')}`;
    if (doubleBackUrls.includes(backURL)) {
        return getBackUrlFromPathArray(previousPathArray);
    }
    return backURL;
};
