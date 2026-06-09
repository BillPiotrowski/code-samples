import React, {useEffect, useState} from 'react';
// import { FFNWArmySheetData, FFNWCrewSheetQuestLine } from "../RulesetDefinitions/FalloutFactionsNukaWar"
import { useParams, useOutletContext, Outlet, useNavigate } from "react-router-dom";
import type { DurerWoodcutsRootOutletContext } from './DurerWoodcutsRoot';
// import MirrorscapeAPI from "../../../api/MirrorscapeAPI";
// import { FalloutFactionNukaWarCharacterSheetData } from "../RulesetDefinitions/FalloutFactionsNukaWar";
// import FFNWArmySheetRoute, { FFNWArmySheetRouteOutletContext } from './FFNWArmySheetRoute';
// import { ArmySheetsRouteRouteOutletContext } from './ArmySheetsRoute';
// import { FFNWCrewSheetSetTerritoryControlInput } from '../../../api/playEngine/ffnw/territory/ffnwCrewSheetSetTerritoryControl';
// import { CharacterSheetData } from '../PlayerCharacter/PlayerCharacterData';

// export interface FFNWArmySheetLoaderData {
//     armySheet: FFNWArmySheetData,
//     characterSheets: FalloutFactionNukaWarCharacterSheetData[]
// }

// export const getFFNWArmySheetLoader = async (
//     mirrorscapeAPI: MirrorscapeAPI,
//     args: LoaderFunctionArgs<any>
// ): Promise<FFNWArmySheetLoaderData> => {
//     const armySheetId = args.params.armyId;
//     if(armySheetId === undefined){
//         throw new Error('army sheet id is undefined');
//     }
//     const response = await mirrorscapeAPI.getFFNW().getArmySheetByIdAndCharacters(armySheetId);
//     return {
//         armySheet: response.crewSheet,
//         characterSheets: response.items
//     }
// }

export interface DurerWoodcutContext extends DurerWoodcutsRootOutletContext {
    isLoading: boolean;
}

// interface DurerWoodcutLoaderArgs {
//     mirrorscapeAPI: MirrorscapeAPI
// }

const DurerWoodcutLoader: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const params = useParams();
    const parentContext = useOutletContext() as DurerWoodcutsRootOutletContext;
    const durerWoodcutId = params.durerWoodcutId;
    const navigate = useNavigate();

    useEffect(() => {
        if(durerWoodcutId === undefined){
            setError(new Error('army sheet id is undefined'));
            return;
        }
        if(
            parentContext.editArmy !== null &&
            parentContext.editArmy.id === durerWoodcutId
        ){
            setIsLoading(false);
            return;
        }
        parentContext.api.getWoodcutById(durerWoodcutId)
        .then((response) => {
            setIsLoading(false);
            parentContext.setEditArmy(response);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    
    // const ffnwArmySheet = (parentContext.editArmy !== null) ? parentContext.editArmy as FFNWArmySheetData : null;

    const context: DurerWoodcutContext = {
        isLoading,
        ...parentContext,
    //     armySheet: ffnwArmySheet,
    //     deleteArmySheetHandler: async function (armySheetId: string): Promise<void> {
    //         try {
    //             if(ffnwArmySheet === null){
    //                 throw new Error('Missing army.');
    //             }
    //             const result = await parentContext.mirrorscapeAPI.getArmyAPI().deleteArmy(ffnwArmySheet.id);
    //             navigate('..');
    //         } catch(e) {
    //             console.log(e);
    //             setError(e as Error);
    //         }
    //     },
    //     setFactionIdHandler: async function (factionId: string | null): Promise<void> {
    //         try {
    //             if(ffnwArmySheet === null){
    //                 throw new Error('Missing army.');
    //             }
    //             const response = await parentContext.mirrorscapeAPI.getFFNW().ffnwSetCrewSheetFaction(ffnwArmySheet.id, factionId);
    //             const updatedArmy: FFNWArmySheetData = {
    //                 ...ffnwArmySheet,
    //                 factionId: response.factionId,
    //                 factionName: response.factionName,
    //                 questLine: response.questLine
    //             }
    //             parentContext.setEditArmy(updatedArmy);
    //         } catch(e) {
    //             console.log(e);
    //             setError(e as Error);
    //         }
    //     },
    //     addCharacterSheetToCrew: async function (characterSheetId: string): Promise<void> {
    //         if(ffnwArmySheet === null){
    //             throw new Error('missing army sheet');
    //         }
    //         const response = await parentContext.mirrorscapeAPI.getFFNW().addCharacterSheetToCrew(ffnwArmySheet.id, characterSheetId);
    //         const updatedArmy: FFNWArmySheetData = {
    //             ...ffnwArmySheet,
    //             characterCount: response.characters.length,
    //             characterSheetIds: response.characters.map(c => c.id),
    //             characters: response.characters
    //         }
    //         parentContext.setEditArmy(updatedArmy);
    //     },
    //     characterSheetStates: [],
    //     removeCharacterFromCrewHandler: async function (characterId: string): Promise<void> {
    //         if(ffnwArmySheet === null){
    //             throw new Error('missing army sheet');
    //         }
    //         const response = await parentContext.mirrorscapeAPI.getFFNW().removeCharacterSheetFromCrew(ffnwArmySheet.id, characterId);
    //         const updatedArmy: FFNWArmySheetData = {
    //             ...ffnwArmySheet,
    //             characterCount: response.characters.length,
    //             characterSheetIds: response.characters.map(c => c.id),
    //             characters: response.characters
    //         }
    //         parentContext.setEditArmy(updatedArmy);
    //     },
    //     createNewCharacterSheetHandler: function (characterName: string): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     crewQuestLineSelectionHandler: function (questLineId: string | null): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     updateQuestLineProgress: function (newQuestLine: FFNWCrewSheetQuestLine): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     setTier: function (tier: number): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     setExperienceHandler: function (experienceAvailable: number, experienceSpent: number): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     setStashHandler: function (caps: number, parts: number): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     setTemporaryReputationHandler: function (temporaryReputation: number): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     addChemHandler: function (chemId: string, increaseBy: number, costPer: number | null): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     useChemHander: function (chemId: string): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     setTerritoryControlHandler: function (crewSheetId: string, editTerritories: FFNWCrewSheetSetTerritoryControlInput[]): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     setCrewSheetHomeTurfHandler: function (crewSheetId: string, homeTurfLocationId: string | null): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     deleteCharacterSheetHandler: function (characterSheetId: string): Promise<void> {
    //         throw new Error('Function not implemented.');
    //     },
    //     factionId: ffnwArmySheet?.factionId ?? null,
    //     setCharacterSheet: function (value: React.SetStateAction<CharacterSheetData | null>): void {
    //         throw new Error('Function not implemented.');
    //     },
    //     characterSheet: null
    }

    return <Outlet context={context} />

}

export default DurerWoodcutLoader;