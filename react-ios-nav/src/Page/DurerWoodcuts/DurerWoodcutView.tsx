import React from 'react';
// import FFNWArmySheetView from './FFNWArmySheetView';
import { useNavigate } from 'react-router-dom';
import NavListView from '../../Component/SplitNav/SplitNavView';
import { useDurerWoodcutContext } from './DurerWoodcutLoader';
// import { FFNWArmySheetRouteOutletContext } from './FFNWArmySheetRoute';
// import { FalloutFactionNukaWarCharacterSheetData } from '../RulesetDefinitions/FalloutFactionsNukaWar';
// import NavListView from '../../AppMock/Components/NavListView';

const DurerWoodcutView = () => {
    const parentContext = useDurerWoodcutContext();
    // const characterSheets = parentContext.characterSheetStates.map(s => s.characterSheet);
    // const characterSheets: FalloutFactionNukaWarCharacterSheetData[] = [];
    if(parentContext.isLoading || parentContext.editArmy === null){
        return <NavListView isLoading={true} />
    }
    const navigate = useNavigate();

    return <NavListView title="Somename">
        <div>
            <h2>Some cool stuff about the woodcut</h2>
        </div>
        {/* <FFNWArmySheetView
            segueDirection={parentContext.direction}
            armySheet={parentContext.armySheet}
            mirrorscapeUser={parentContext.mirrorscapeUser}
            characterSheets={characterSheets}
            mirrorscapeAPI={parentContext.mirrorscapeAPI}
            parentContext={parentContext}
            createCharacterLinkHandler={() => {
                parentContext.setModal(null);
                navigate('createNewCharacter');
            }}
            addExistingLinkHandler={() => {
                parentContext.setModal(null);
                navigate('addExistingCharacter');
            }}
        /> */}
    </NavListView>
}

export default DurerWoodcutView;