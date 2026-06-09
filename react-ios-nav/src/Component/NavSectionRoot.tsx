import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useOutletContext, useResolvedPath, useLocation, Outlet } from "react-router-dom";
// import { AssetEdit } from "../../../data/Asset/Asset";
// import { AnimationPresenceCustomProps, AnimatedOutlet, AppRootContext } from "../AppRoot";
// import { getSegueDirection, SegueDirection, stripTrailingSlash } from "../PathParser";
// import { NavListContext } from "./NavList";
import { getSegueDirection, stripTrailingSlash, type SegueDirection } from "../Utility/PathParser";
import { AnimatedOutlet, type AppRootContext } from "../AppRoot";

// export interface AssetContext extends NavListContext {
//     setEditAsset: React.Dispatch<React.SetStateAction<AssetEdit | null>>;
//     setDownloadedAsset: React.Dispatch<React.SetStateAction<AssetEdit | null>>;
//     downloadedAsset: AssetEdit | null;
//     editAsset: AssetEdit|null;
// }

type NavSectionRootContext = {
    
}

type NavSectionRootArgs = {
    context: AppRootContext;
    
}

export interface AnimationPresenceCustomProps {
    segueDirection: SegueDirection;
    toPath: string;
    fromPath: string|null;
}

const NavSectionRoot: React.FC<NavSectionRootArgs> = (args) => {
    const parentContext= args.context;
    const resolvedPath = useResolvedPath('.');
    const location = useLocation();
    const previousPath = parentContext.previousPath;
    const sequeDirection: SegueDirection = (previousPath !== null) ? getSegueDirection(resolvedPath.pathname, location.pathname, previousPath) : 'lateral';
    const animationPresenceCustomProps: AnimationPresenceCustomProps = {
        segueDirection: sequeDirection,
        toPath: stripTrailingSlash(location.pathname),
        fromPath: previousPath
    }

    useEffect(() => {
        parentContext.setPreviousPath(location.pathname);
    }, []);
    return <AnimatePresence
        /**
         * @todo should be able to get mode="sync" to work
         */
        mode="sync"
        onExitComplete={() => {
            setTimeout(() => {
                parentContext.setPreviousPath(location.pathname);
            }, 100);
        }}
        custom={animationPresenceCustomProps}
    >
        <AnimatedOutlet key={location.pathname} context={args.context} />
    </AnimatePresence>
}

export default NavSectionRoot;
