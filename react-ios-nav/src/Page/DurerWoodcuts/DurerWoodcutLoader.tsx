import React, {useEffect, useState} from 'react';
import { useParams, Outlet, useOutletContext } from "react-router-dom";
import { useDurerWoodcutsContext, type DurerWoodcutsRootOutletContext } from './DurerWoodcutsRoot';

export interface DurerWoodcutContext extends DurerWoodcutsRootOutletContext {
    isLoading: boolean;
}

export const useDurerWoodcutContext = () => useOutletContext<DurerWoodcutContext>();

const DurerWoodcutLoader: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [_, setError] = useState<Error | null>(null);
    const params = useParams();
    const parentContext = useDurerWoodcutsContext();
    const durerWoodcutId = params.durerWoodcutId;

    useEffect(() => {
        if(durerWoodcutId === undefined){
            setError(new Error('woodcut id is undefined'));
            return;
        }
        if(
            parentContext.selectedWoodcut !== null &&
            parentContext.selectedWoodcut.id === durerWoodcutId
        ){
            setIsLoading(false);
            return;
        }
        parentContext.api.getWoodcutById(durerWoodcutId)
        .then((response) => {
            setIsLoading(false);
            parentContext.setSelectedWoodcut(response);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    
    const context: DurerWoodcutContext = {
        isLoading,
        ...parentContext,
    }

    return <Outlet context={context} />

}

export default DurerWoodcutLoader;