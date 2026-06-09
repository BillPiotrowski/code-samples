import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useResolvedPath, useLocation } from "react-router-dom";
import { getSegueDirection, stripTrailingSlash, type SegueDirection } from "../../Utility/PathParser";
import { AnimatedOutlet } from "../../AppRoot";
import type { SplitNavContext } from "./SplitNavContext";
import SegueContext from "./SegueContext";

export interface AnimationPresenceCustomProps {
    segueDirection: SegueDirection;
    toPath: string;
    fromPath: string | null;
}

type SplitNavSectionArgs<TContext extends SplitNavContext> = {
    context: TContext;
}

function SplitNavSection<TContext extends SplitNavContext>(args: SplitNavSectionArgs<TContext>): React.ReactElement {
    const parentContext = args.context;
    const resolvedPath = useResolvedPath('.');
    const location = useLocation();
    const previousPath = parentContext.previousPath;
    const sequeDirection: SegueDirection = previousPath !== null
        ? getSegueDirection(resolvedPath.pathname, location.pathname, previousPath)
        : 'lateral';

    const animationPresenceCustomProps: AnimationPresenceCustomProps = {
        segueDirection: sequeDirection,
        toPath: stripTrailingSlash(location.pathname),
        fromPath: previousPath,
    };

    useEffect(() => {
        parentContext.setPreviousPath(location.pathname);
    }, []);

    return <SegueContext.Provider value={sequeDirection}>
        <AnimatePresence
            mode="sync"
            onExitComplete={() => {
                setTimeout(() => {
                    parentContext.setPreviousPath(location.pathname);
                }, 100);
            }}
            custom={animationPresenceCustomProps}
        >
            <AnimatedOutlet<TContext> key={location.pathname} context={args.context} />
        </AnimatePresence>
    </SegueContext.Provider>;
}

export default SplitNavSection;
