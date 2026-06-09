import React, { useState } from 'react';
import type { AppRootContext } from '../../AppRoot';
import SplitNavSection from '../../Component/SplitNav/SplitNavSection';
import useSplitNavContext from '../../Component/SplitNav/useSplitNavContext';
import type { DurerWoodcutType } from '../../Type/DurerWoodcutType';

export interface DurerWoodcutsRootOutletContext extends AppRootContext {
    editArmy: DurerWoodcutType | null;
    setEditArmy: React.Dispatch<React.SetStateAction<DurerWoodcutType | null>>;
}

export const useDurerWoodcutsContext = () => useSplitNavContext<DurerWoodcutsRootOutletContext>();

const DurerWoodcutsRoot: React.FC = () => {
    const parentContext = useSplitNavContext<AppRootContext>();
    const [editArmy, setEditArmy] = useState<DurerWoodcutType | null>(null);

    const childContext: DurerWoodcutsRootOutletContext = {
        ...parentContext,
        editArmy,
        setEditArmy,
    };

    return <SplitNavSection context={childContext} />;
}

export default DurerWoodcutsRoot;
