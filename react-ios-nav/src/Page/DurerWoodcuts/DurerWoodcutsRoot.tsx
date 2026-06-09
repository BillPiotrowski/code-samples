import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { SplitNavContext } from '../../Component/SplitNav/SplitNavContext';
import type { AppRootContext } from '../../AppRoot';
import SplitNavSection from '../../Component/SplitNav/SplitNavSection';
import type { DurerWoodcutType } from '../../Type/DurerWoodcutType';

export interface DurerWoodcutsRootOutletContext extends SplitNavContext, AppRootContext {
    editArmy: DurerWoodcutType | null;
    setEditArmy: React.Dispatch<React.SetStateAction<DurerWoodcutType | null>>;
}

const DurerWoodcutsRoot: React.FC = () => {
    const parentContext = useOutletContext<SplitNavContext & AppRootContext>();
    const [editArmy, setEditArmy] = useState<DurerWoodcutType | null>(null);

    const childContext: DurerWoodcutsRootOutletContext = {
        ...parentContext,
        editArmy,
        setEditArmy,
    };

    console.log("Here!");

    return <SplitNavSection<DurerWoodcutsRootOutletContext> context={childContext} />;
}

export default DurerWoodcutsRoot;
