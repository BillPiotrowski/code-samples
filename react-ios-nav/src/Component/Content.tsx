import { Outlet } from "react-router-dom";

interface ContentProps<TContext> {
    context: TContext;
}

/**
 * Wrapper for react router dom Outlet object used to ensure proper passing of context.
 * 
 * @param props 
 * @returns 
 */
function Content<TContext>(props: ContentProps<TContext>) {
    return <Outlet context={props.context} />;
}

export default Content;
