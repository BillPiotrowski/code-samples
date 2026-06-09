import React, { useState } from 'react';
import type { AppRootContext } from '../../AppRoot';
import SplitNavSection from '../../Component/SplitNav/SplitNavSection';
import useSplitNavContext from '../../Component/SplitNav/Context/useSplitNavContext';
import type { Artist } from '../../Type/PersonType';

export interface ArtistsRootOutletContext extends AppRootContext {
    selectedArtist: Artist | null;
    setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
}

export const useArtistsContext = () => useSplitNavContext<ArtistsRootOutletContext>();

const ArtistsRoot: React.FC = () => {
    const parentContext = useSplitNavContext<AppRootContext>();
    const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

    const childContext: ArtistsRootOutletContext = {
        ...parentContext,
        selectedArtist,
        setSelectedArtist,
    };

    return <SplitNavSection context={childContext} />;
}

export default ArtistsRoot;
