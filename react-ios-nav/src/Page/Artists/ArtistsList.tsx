import { Link } from 'react-router-dom';
import NavListView from '../../Component/SplitNav/SplitNavView';
import InfiniteScroll from '../../Component/InfiniteScroll/InfiniteScroll';
import { useArtistsContext } from './ArtistsRoot';
import type { SortOption } from '../../Component/InfiniteScroll/SortOption';
import type { PaginatedArtistResponseType } from '../../Type/PersonType';

const sortByOptions: SortOption[] = [
    { name: 'Last Name Ascending', property: 'lastName', direction: 'ASC' },
    { name: 'Last Name Descending', property: 'lastName', direction: 'DESC' },
    { name: 'First Name Ascending', property: 'firstName', direction: 'ASC' },
    { name: 'First Name Descending', property: 'firstName', direction: 'DESC' },
    { name: 'Born Ascending', property: 'born', direction: 'ASC' },
    { name: 'Born Descending', property: 'born', direction: 'DESC' },
];

const ArtistsList = () => {
    const parentContext = useArtistsContext();

    const getter = (limit: number, pageNum: number, sortBy?: string, sortDirection?: string): Promise<PaginatedArtistResponseType> => {
        return parentContext.api.getArtists(limit, pageNum, sortBy, sortDirection);
    };

    return <NavListView title="Artists">
        <InfiniteScroll
            getter={getter}
            createListElement={(artist, _, ref) => {
                return <li key={artist.id} ref={ref}>
                    <Link to={`${artist.id}`}>{artist.firstName} {artist.lastName}</Link>
                </li>;
            }}
            sortOptions={sortByOptions}
            filters={{}}
        />
    </NavListView>;
}

export default ArtistsList;
