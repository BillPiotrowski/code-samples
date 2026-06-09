import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useResolvedPath, useLocation } from "react-router-dom";
import { getSegueDirection, stripTrailingSlash, type SegueDirection } from "../../Utility/PathParser";
import { AnimatedOutlet } from "../../AppRoot";
import SegueContext from "./SegueContext";
import { useNavPath } from "./NavPathContext";

export interface AnimationPresenceCustomProps {
    segueDirection: SegueDirection;
    toPath: string;
    fromPath: string | null;
}

type SplitNavSectionArgs<TContext> = {
    context: TContext;
}

function SplitNavSection<TContext>(args: SplitNavSectionArgs<TContext>): React.ReactElement {
    const { previousPath, setPreviousPath } = useNavPath();
    const resolvedPath = useResolvedPath('.');
    const location = useLocation();

    const sequeDirection: SegueDirection = previousPath !== null
        ? getSegueDirection(resolvedPath.pathname, location.pathname, previousPath)
        : 'lateral';

    const animationPresenceCustomProps: AnimationPresenceCustomProps = {
        segueDirection: sequeDirection,
        toPath: stripTrailingSlash(location.pathname),
        fromPath: previousPath,
    };

    useEffect(() => {
        setPreviousPath(location.pathname);
    }, []);

    return <SegueContext.Provider value={sequeDirection}>
        <AnimatePresence
            mode="sync"
            onExitComplete={() => {
                setTimeout(() => {
                    setPreviousPath(location.pathname);
                }, 100);
            }}
            custom={animationPresenceCustomProps}
        >
            <AnimatedOutlet key={location.pathname} context={args.context} />
        </AnimatePresence>
    </SegueContext.Provider>;
}

export default SplitNavSection;
