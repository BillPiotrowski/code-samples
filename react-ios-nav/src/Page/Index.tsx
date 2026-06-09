import { useOutletContext } from "react-router-dom";
import NavListView from "../Component/NavListView";
import type { NavListContext } from "../Component/NavListContext";

const Index: React.FC = _ => {
    const outletContext = useOutletContext() as NavListContext;
    outletContext.setTitle("Map 1")
    
    return <NavListView 
            segueDirection={outletContext.sequeDirection}
        >
            <h1>Home Page</h1>
            <p>If you are on mobile, select the 'Back' button to see the entire menu.</p>
            <p>This page will display the logged in user's profile photo, cover photo, profile data, and possibly social media wall.</p>
        </NavListView>
}

export default Index;