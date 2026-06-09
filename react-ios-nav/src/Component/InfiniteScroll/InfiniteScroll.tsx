import React, {useEffect, useState} from 'react';
import styles from './InfiniteScroll.module.scss';
import type { PaginatedResponse } from '../../Type/PaginatedResponseType';
import useInfiniteScroll from '../../Hook/useInfiniteScroll';
import useLastElementRef from '../../Hook/useLastElementRef';
import List from '../List';
import type { SortByDirection, SortOption } from './SortOption';
import SortOptions from './SortOptions';

interface InfiniteScrollArgs<T> {
    getter: (limit: number, page: number, sortBy?: string, sortDirection?: SortByDirection) => Promise<PaginatedResponse<T>>
    createListElement: (
        item: T,
        index: number,
        ref: React.LegacyRef<HTMLLIElement> | undefined
    ) => React.JSX.Element;
    sortOptions: SortOption[];
    filters?: any
}

const InfiniteScroll = <T,>( args: InfiniteScrollArgs<T>)=> {
    const [pageNumber, setPageNumber] = useState(1);
    const [sortOptionIndex, setSortOptionIndex] = useState((args.sortOptions.length > 0) ? 0 : null);
    const sortOption = (sortOptionIndex !== null) ? args.sortOptions[sortOptionIndex] : null;

    useEffect(() => {
        setPageNumber(1)
    }, [args.filters]);

    const {
        isLoading: isLoading,
        error: error,
        results: results,
        hasNextPage: hasNextPage
    } = useInfiniteScroll<T>(pageNumber, args.getter, sortOption?.property ?? undefined, sortOption?.direction ?? undefined, args.filters);
    const lastMemberRef = useLastElementRef(isLoading, hasNextPage, setPageNumber);

    const sortOptionSelectElement = (sortOptionIndex !== null) ?
        <div className={styles.sortOptionsContainer}>
            <SortOptions
                sortOptions={args.sortOptions}
                sortOptionIndex={sortOptionIndex}
                setSortOptionIndex={i => {
                    setPageNumber(1);
                    setSortOptionIndex(i);
                }}
            />
        </div> : null;

    const loadingElement = (isLoading) ? <p>Loading...</p> : null;

    const errorElement = (error !== null) ? <p>ERROR: {error.message}</p> : null;

    return <div className={styles.infiniteScroll}>
        {sortOptionSelectElement}
        {errorElement}
        <List>
            {results.map((item, i) => {
                const ref = (results.length === i + 1) ? lastMemberRef : null;
                return args.createListElement(item, i, ref);
            })}
        </List>
        {loadingElement}
        
    </div>
}

export default InfiniteScroll;
