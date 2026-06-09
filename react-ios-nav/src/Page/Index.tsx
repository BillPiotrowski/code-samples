import NavListView from "../Component/SplitNav/SplitNavView";

const Index: React.FC = _ => {
    return <NavListView title="Map 1">
        <h1>Home Page</h1>
        <p>If you are on mobile, select the 'Back' button to see the entire menu.</p>
        <p>This page will display the logged in user's profile photo, cover photo, profile data, and possibly social media wall.</p>
    </NavListView>;
}

export default Index;
