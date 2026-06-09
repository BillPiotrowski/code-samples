import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet, useResolvedPath } from 'react-router-dom';
import { stripTrailingSlash } from '../../Utility/PathParser';
import type { SplitNavContext } from './SplitNavContext';
import type { NavListGroup } from './SplitNavTypes';
import TitleBar, { type TitleBarTool } from '../TitleBar';
import SplitNavMenu from './SplitNavMenu';
import useIsSingleColumnLayout from '../../Utility/isSingleColumnEffect';
import NavPathContext from './NavPathContext';
import styles from './SplitNav.module.scss';

interface SplitNavProps<TExtra> {
    navGroups: NavListGroup[];
    defaultTitle: string;
    extraContext: TExtra;
}

function SplitNav<TExtra>(props: SplitNavProps<TExtra>) {
    const location = useLocation();
    const navigate = useNavigate();
    const resolvedPath = useResolvedPath('.');
    const isSingleColumn = useIsSingleColumnLayout();

    const isRoot = location.pathname === '' || location.pathname === '/';

    const [previousPath, setPreviousPath] = useState<string | null>(null);
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

    const splitNavContext: SplitNavContext = {
        setTitle: (t: string) => setTitle(t),
        setTools,
        toPath: stripTrailingSlash(location.pathname),
    };

    const context = { ...splitNavContext, ...props.extraContext } as SplitNavContext & TExtra;

    const titleBar = showMobileMenu
        ? <TitleBar showBackButton={false} backHandler={() => {}} title="Menu" />
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
        <NavPathContext.Provider value={{ previousPath, setPreviousPath }}>
            <div className={classes}>
                <div className={styles.splitNav}>
                    <div className={styles.navContainer}>
                        <SplitNavMenu navListGroups={props.navGroups} isSingleColumn={isSingleColumn} />
                    </div>
                    <div className={styles.titleContainer}>
                        {titleBar}
                    </div>
                    <div className={styles.itemContainer}>
                        <Outlet context={context} />
                    </div>
                </div>
            </div>
        </NavPathContext.Provider>
    );
}

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
