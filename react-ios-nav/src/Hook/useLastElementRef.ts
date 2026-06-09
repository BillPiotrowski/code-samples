import { useRef, useCallback, type Dispatch, type SetStateAction } from 'react';

const useLastElementRef = (
    isLoading: boolean,
    hasNextPage: boolean,
    setPageNum: Dispatch<SetStateAction<number>>
): (member: HTMLLIElement | null) => void => {
    const intObserver = useRef<IntersectionObserver|null>(null);

    const lastMemberRef = useCallback((member: HTMLLIElement | null) => {
        if(isLoading){
            return;
        }
        if(intObserver.current !== null){
            intObserver.current.disconnect()
        }
        intObserver.current = new IntersectionObserver(members => {
            if(members[0].isIntersecting && hasNextPage){
                setPageNum(prev => {
                    return prev + 1
                });
            }
        })
        if(member){
            intObserver.current.observe(member);
        }
    },[isLoading, hasNextPage]);

    return lastMemberRef
};

export default useLastElementRef;
