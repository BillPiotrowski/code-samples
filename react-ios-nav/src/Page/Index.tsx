import { useOutletContext } from "react-router-dom";
import NavListView from "../Component/SplitNav/SplitNavView";
import type { SplitNavContext } from "../Component/SplitNav/SplitNavContext";

const Index: React.FC = _ => {
    const outletContext = useOutletContext<SplitNavContext>();
    outletContext.setTitle("Map 1");

    return <NavListView>
        <h1>Home Page</h1>
        <p>If you are on mobile, select the 'Back' button to see the entire menu.</p>
        <p>This page will display the logged in user's profile photo, cover photo, profile data, and possibly social media wall.</p>
    </NavListView>;
}

export default Index;
