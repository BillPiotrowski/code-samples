import React from 'react';
import { Outlet, useLocation, useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
// import { ArmySheetData, FFNWArmySheetData } from '../RulesetDefinitions/FalloutFactionsNukaWar';
import {useState, useEffect} from 'react';
// import { ArmySheetsLoader } from './ArmySheetsLoader';
// import { armiesPathSegmentName } from './ArmySheetsRoutes';
// import { GameEngineRootOutletContext } from '../GameEngineRoot.tsx';
// import { MessageType } from '../Message';
// import MirrorscapeAPI from '../../../api/MirrorscapeAPI';
// import { MessageData } from '../Message';
// import MirrorscapeUser from '../MirrorscapeUser';
// import styles from './ArmySheetsRoute.module.scss';
import type { NavListContext } from '../../Component/NavListContext';
import NavSectionRootArgs from '../../Component/NavSectionRoot';
import type { API } from '../../API';
import type { DurerWoodcutType } from '../../Type/DurerWoodcutType';
// import { NavListContext } from '../../AppMock/Components/NavList';
// import NavSectionRoot from '../../AppMock/Components/NavSectionRoot';

export interface DurerWoodcutsRootOutletContext extends NavListContext {
    // api: API;
    // setMessageHandler: (message: MessageData) => void;
    // mirrorscapeUser: MirrorscapeUser;
    editArmy: DurerWoodcutType|null;
    setEditArmy: React.Dispatch<React.SetStateAction<DurerWoodcutType | null>>;
}

// interface DurerWoodcutsRootProps {
//     api: API;
// }

const DurerWoodcutsRoot: React.FC = () => {

    // const loaderData = useLoaderData() as ArmySheetsLoader;
    
    const parentContext = useOutletContext() as NavListContext;
    // const navigate = useNavigate();

    // const [armySheets, setArmySheets] = useState<ArmySheetData[]>(loaderData.armySheets);
    const [editArmy, setEditArmy] = useState<DurerWoodcutType|null>(null);

    // const createFFNWNewArmySheet = async (armySheetName: string) => {
    //     setIsLoading(true);
    //     try {
    //         const response = await parentContext.mirrorscapeAPI.getFFNW().ffnwCreateCrewSheet(armySheetName);
    //         setArmySheets(prev => {
    //             return [
    //                 ...prev,
    //                 ...[response.crewSheet]
    //             ]
    //         })
    //         parentContext.setMessageHandler({text: `Successfully create new crew: ${response.crewSheet.armySheetName}.`, type: MessageType.success});
    //         setIsLoading(false);
    //         navigate(`ffnw/${response.crewSheet._id}`);
    //     }catch(e){
    //         const error = e as Error;
    //         parentContext.setMessageHandler({text: `Failed to create crew. ${error.message}`, type: MessageType.error});
    //         setIsLoading(false);
    //     }
    // }

    // const deleteArmySheetHandler = async (armySheetId: string) => {
    //     setIsLoading(true);
    //     try {
    //         const temp = await parentContext.mirrorscapeAPI.getFFNW().deleteArmySheet(armySheetId);
    //         setArmySheets(prev => {
    //             return prev.filter(armySheet => {
    //                 return armySheet._id !== armySheetId
    //             });
    //         })
    //         setIsLoading(false);
    //         parentContext.setMessageHandler({text: `Successfully deleted Crew`, type: MessageType.success});
    //         navigate(`/${armiesPathSegmentName}/`);
    //     }catch(e){
    //         const error = e as Error;
    //         parentContext.setMessageHandler({text: `Failed to delete crew. ${error.message}`, type: MessageType.error});
    //         setIsLoading(false);
    //         throw error;
    //     }
    // }

    const childContext: DurerWoodcutsRootOutletContext = {
        ...parentContext,
        ...{
            // armySheets: armySheets ?? [],
            // createFFNWNewArmySheetHandler: createFFNWNewArmySheet,
            // deleteFFNWArmySheetHandler: deleteArmySheetHandler,
            // mirrorscapeAPI: parentContext.mirrorscapeAPI,
            // setMessageHandler: parentContext.setMessageHandler,
            // mirrorscapeUser: parentContext.mirrorscapeUser,
            editArmy,
            setEditArmy
        }
    }

    console.log("Here!");

    return <NavSectionRootArgs context={childContext} />

    // return <div className={styles.armySheetRoute}>
    //     <Outlet context={childContext} />
    // </div>
}




export default DurerWoodcutsRoot;