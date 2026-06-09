import React, { useEffect, useRef, useState } from 'react';
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
    const parentContextRef = useRef(parentContext);
    const artistId = params.artistId;

    useEffect(() => {
        const ctx = parentContextRef.current;
        if (artistId === undefined) {
            setError(new Error('artist id is undefined'));
            return;
        }
        if (
            ctx.selectedArtist !== null &&
            ctx.selectedArtist.id === artistId
        ) {
            setIsLoading(false);
            return;
        }
        ctx.api.getArtistById(artistId)
            .then((response) => {
                ctx.setSelectedArtist(response);
            }).catch((error) => {
                setError(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [artistId]);

    const context: ArtistContext = {
        isLoading,
        ...parentContext,
    };

    return <Outlet context={context} />;
}

export default ArtistLoader;
