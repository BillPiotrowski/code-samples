import { Outlet } from "react-router-dom";
import type { NavListContext } from "./NavListContext";

interface ContentProps {
    context: NavListContext;
}

/**
 * Wrapper for react router dom Outlet object used to ensure proper passing of context.
 * 
 * @param props 
 * @returns 
 */
const Content: React.FC<ContentProps> = props => {
    return <Outlet context={props.context} />
}

export default Content;