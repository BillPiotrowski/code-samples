import { useRef, useCallback, type Dispatch, type SetStateAction, type MutableRefObject } from 'react';

const useLastElementRef = (
    isLoading: boolean,
    hasNextPage: boolean,
    setPageNum: Dispatch<SetStateAction<number>>
): (member: any) => MutableRefObject<IntersectionObserver | null> | undefined => {
    const intObserver = useRef<IntersectionObserver|null>(null);

    const lastMemberRef = useCallback((member: any) => {
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
        return intObserver;
    },[isLoading, hasNextPage]);

    return lastMemberRef
};

export default useLastElementRef;
