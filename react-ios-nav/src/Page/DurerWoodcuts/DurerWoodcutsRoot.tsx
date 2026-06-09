import React, { useState } from 'react';
import type { AppRootContext } from '../../AppRoot';
import SplitNavSection from '../../Component/SplitNav/SplitNavSection';
import useSplitNavContext from '../../Component/SplitNav/Context/useSplitNavContext';
import type { DurerWoodcutType } from '../../Type/DurerWoodcutType';

export interface DurerWoodcutsRootOutletContext extends AppRootContext {
    selectedWoodcut: DurerWoodcutType | null;
    setSelectedWoodcut: React.Dispatch<React.SetStateAction<DurerWoodcutType | null>>;
}

export const useDurerWoodcutsContext = () => useSplitNavContext<DurerWoodcutsRootOutletContext>();

const DurerWoodcutsRoot: React.FC = () => {
    const parentContext = useSplitNavContext<AppRootContext>();
    const [selectedWoodcut, setSelectedWoodcut] = useState<DurerWoodcutType | null>(null);

    const childContext: DurerWoodcutsRootOutletContext = {
        ...parentContext,
        selectedWoodcut,
        setSelectedWoodcut,
    };

    return <SplitNavSection context={childContext} />;
}

export default DurerWoodcutsRoot;
