import NavListView from '../../Component/SplitNav/SplitNavView';
import { useArtistContext } from './ArtistLoader';

const ArtistView = () => {
    const parentContext = useArtistContext();

    if (parentContext.isLoading || parentContext.selectedArtist === null) {
        return <NavListView isLoading={true} />;
    }

    const { firstName, lastName, born, died, nationality } = parentContext.selectedArtist;
    const years = died !== undefined ? `${born} – ${died}` : `b. ${born}`;

    return <NavListView title={`${firstName} ${lastName}`}>
        <h2>{firstName} {lastName}</h2>
        <p>{nationality}</p>
        <p>{years}</p>
    </NavListView>;
}

export default ArtistView;
