import React, { useEffect, useState } from 'react';
import { useParams, Outlet, useOutletContext } from 'react-router-dom';
import { useArtistsContext, type ArtistsRootOutletContext } from './ArtistsRoot';

export interface ArtistContext extends ArtistsRootOutletContext {
    isLoading: boolean;
}

export const useArtistContext = () => useOutletContext<ArtistContext>();

const ArtistLoader: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [_, setError] = useState<Error | null>(null);
    const params = useParams();
    const parentContext = useArtistsContext();
    const artistId = params.artistId;

    useEffect(() => {
        if (artistId === undefined) {
            setError(new Error('artist id is undefined'));
            return;
        }
        if (
            parentContext.selectedArtist !== null &&
            parentContext.selectedArtist.id === artistId
        ) {
            setIsLoading(false);
            return;
        }
        parentContext.api.getArtistById(artistId)
            .then((response) => {
                parentContext.setSelectedArtist(response);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }, []);

    const context: ArtistContext = {
        isLoading,
        ...parentContext,
    };

    return <Outlet context={context} />;
}

export default ArtistLoader;
