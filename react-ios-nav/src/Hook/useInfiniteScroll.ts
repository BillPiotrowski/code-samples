import { useEffect, useState } from 'react';
import type { PaginatedResponse } from '../Type/PaginatedResponseType';
import type { SortByDirection } from '../Type/SortOption';

interface InfiniteScrollResponse<T> {
    isLoading: boolean;
    error: Error|null;
    results: T[];
    hasNextPage: boolean;
}

const useInfiniteScroll = <T>(
    pageNum = 1,
    getter: (limit: number, page: number, sortBy?: string, sortDirection?: SortByDirection, filters?: any) => Promise<PaginatedResponse<T>>,  
    sortBy?: string, 
    sortDirection?: SortByDirection,
    filters?: any
): InfiniteScrollResponse<T> => {
    const [results, setResults] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error|null>(null);
    const [total, setTotal] = useState<number|null>(null);
    const isComplete = (total !== null) ? total <= results.length : false;
    const hasNextPage = !isComplete;

    useEffect(( ) => {
        const newResults = (pageNum === 1) ? [] : results;
        if(isComplete && pageNum > 1){
            return;
        }
        if(pageNum === 1){
            setResults(newResults);
        }
        setIsLoading(true);
        setError(null);

        const controller = new AbortController();
        const {signal} = controller;
        getter(16, pageNum, sortBy, sortDirection, filters).then((retrievedMaps: PaginatedResponse<T>) => {
            setResults(_ => {
                return [...newResults, ...retrievedMaps.items]
            });
            setTotal(retrievedMaps.total);
            setIsLoading(false);
        }).catch(error => {
            setIsLoading(false);
            if(signal.aborted){
                return;
            }
            setError(error);
        })

        return () => controller.abort();
    }, [pageNum, sortBy, sortDirection, filters]);

    return { isLoading, error, results, hasNextPage };
}

export default useInfiniteScroll;
