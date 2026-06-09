import React from 'react';
// import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
} from "react-router-dom";
import AppRoot from './AppRoot';
import Index from './Page/Index';
import DurerWoodcutsRoot from './Page/DurerWoodcuts/DurerWoodcutsRoot';
import type { API } from './API';
import DurerWoodcutsList from './Page/DurerWoodcuts/DurerWoodcutsList';
import DurerWoodcutLoader from './Page/DurerWoodcuts/DurerWoodcutLoader';
import DurerWoodcutView from './Page/DurerWoodcuts/DurerWoodcutView';
// import MirrorscapeAPI from '../../api/MirrorscapeAPI';
// import Profile from './Profile/Profile';
// import MyMapsRoot from './MyMaps/MyMapsRoot';
// import MyMapsList from './MyMaps/MyMapsList';
// import MyMap from './MyMaps/MyMap';
// import BasicSettings from './Settings/BasicSettings';
// import MyScapesRoot, { MyScapesRootContext } from './Session/MyScapesRoot';
// import MyScapesList from './Session/MyScapesList';
// import SingleScape from './Session/SingleScape';
// import ffnwArmySheetsRoutes from '../GameEngine/Army/ArmySheetsRoutes';
// import MirrorscapeUser from '../GameEngine/MirrorscapeUser';
// import PlayerCharacters from '../GameEngine/PlayerCharacter/PlayerCharacters';
// import ErrorElement from '../GameEngine/ErrorElement';
// import PlayerCharactersList from '../GameEngine/PlayerCharacter/PlayerCharactersList';
// import FFNWCharacterSheetRoute from '../GameEngine/FFNW/CharacterSheet/FFNWCharacterSheetRoute';
// import ffnwCharacterSheetRoutes from '../GameEngine/FFNW/CharacterSheet/FFNWCharacterSheetRoutes';
// import DigitalContentIndex from '../Admin/DigitalContent/DigitalContentIndex';
// import DigitalContentList from '../Admin/DigitalContent/DigitalContentList';
// import MapSettingsList from '../Admin/MapSettings/MapSettingsList';
// import MapSettingsRoot from '../Admin/MapSettings/MapSettingsRoot';
// import CreateMapSetting from '../Admin/MapSettings/CreateMapSetting';
// import BundleIndex from '../Admin/Bundle/BundleIndex';
// import BundlesList from '../Admin/Bundle/BundlesList';
// import SingleBundle from '../Admin/Bundle/SingleBundle';
// import AssetIndex from '../Admin/Asset/AssetIndex';
// import AssetList from '../Admin/Asset/AssetList';
// import AssetEditRoot from '../Admin/Asset/AssetEditRoot';
// import { GetAssetFiltersResponse } from '../../data/Asset/Asset';
// import { getSingleAssetEditRoutes } from '../Admin/Asset/AssetRouter';
// import { Ruleset } from '../../data/Ruleset/Ruleset';
// import ScapeEditRoot from './Session/ScapeEditRoot';
// import RulesetsRoot from './Rulesets/RulesetsRoot';
// import getRulesetRoutes from './Rulesets/RulesetRouter';
// import ImageManagerView from './Components/ImageManagerView';
// import InputTextView from './Components/InputTextView';



const getAppRouter = (
    basename: string,
    // accessToken: string, 
    api: API,
    // mirrorscapeAPI: MirrorscapeAPI,
    // mirrorscapeUser: MirrorscapeUser,
    // mirrorscapeUser: MirrorscapeUser,
    // userId: string,
    // endpointUrl: string
    isSingleColumnLayout: boolean,
    // assetFilters: GetAssetFiltersResponse,
    // rulesets: Ruleset[]
) => {
    // const accessToken = mirrorscapeAPI.getAccessTokenString();
    // const endpointUrl = mirrorscapeAPI.getEndpointUrl();
    return createBrowserRouter([
        {
            path: "/",
            element: <AppRoot
                api={api}
                // mirrorscapeAPI={mirrorscapeAPI}
                // userId={userId} 
                // mirrorscapeUser={mirrorscapeUser}
                // assetFilters={assetFilters}
                // rulesets={rulesets}
            />,
            children: [
                {
                    index: true,
                    element: <Index />
                },
                {
                    path: "durer-woodcuts",
                    element: <DurerWoodcutsRoot />,
                    children: [
                        {
                            index: true,
                            element: <DurerWoodcutsList />
                        },
                        {
                            path: ":durerWoodcutId",
                            // element: <FFNWArmySheetRoute />,
                            // loader: async (args): Promise<FFNWArmySheetLoaderData> => {
                            //     return getFFNWArmySheetLoader(mirrorscapeAPI, args);
                            // },
                            element: <DurerWoodcutLoader />,
                            children: [
                                {
                                    index: true,
                                    element: <DurerWoodcutView />,
                                    // errorElement: <ErrorElement />,
                                },
                            ]
                        }

                    ]
                }

                // ffnwArmySheetsRoutes(mirrorscapeAPI.getAccessTokenString(), mirrorscapeAPI, mirrorscapeAPI.getEndpointUrl()),
                // {
                //     path: "my-scapes",
                //     element: <MyScapesRoot />,
                //     children: [
                //         {
                //             index: true,
                //             element: <MyScapesList />
                //         },
                //         {
                //             path: ':scapeId',
                //             element: <ScapeEditRoot />,
                //             children: [
                //                 {
                //                     index: true,
                //                     element: <SingleScape />
                //                 },
                //                 {
                //                     path: 'image',
                //                     element: <ImageManagerView
                //                         getImage={c => {
                //                             const context = c as MyScapesRootContext;
                //                             return context.editScape?.image ?? null;
                //                         }}
                //                         setImage={(c, image) => {
                //                             const context = c as MyScapesRootContext;
                //                             context.setEditScape(s => {
                //                                 if(s === null){
                //                                     return null;
                //                                 }
                //                                 return {
                //                                     ...s,
                //                                     image
                //                                 }
                //                             })
                //                         }}
                //                         getImageUploadUrl={async c => {
                //                             const context = c as MyScapesRootContext;
                //                             if(context.editScape === null){
                //                                 throw new Error('Can not get image upload url without a Scape set.');
                //                             }
                //                             return context.mirrorscapeAPI.getScapeAPI().getScapeImageUploadUrl(context.editScape.id); 
                //                         }}
                //                     />
                //                 },
                //                 {
                //                     path: 'name',
                //                     element: <InputTextView
                //                         getValue={c => {
                //                             const context = c as MyScapesRootContext;
                //                             return context.editScape?.name ?? '';
                //                         }}
                //                         onChange={(c, v) => {
                //                             const context = c as MyScapesRootContext;
                //                             context.setEditScape(s => {
                //                                 if(s === null){
                //                                     return null;
                //                                 }
                //                                 return {...s, name: v}
                //                             })
                //                         }}
                //                         children={<p>The name of the Scape.</p>}
                //                         label="Scape Name"
                //                     />
                //                 },
                //             ]
                //         },
                //     ]
                // },
                // {
                //     path: "rulesets",
                //     element: <RulesetsRoot />,
                //     children: getRulesetRoutes()
                // },
                // {
                //     path: "map-manager",
                //     element: <MyMapsRoot />,
                //     children: [
                //         {
                //             index: true,
                //             element: <MyMapsList />
                //         },
                //         {
                //             path: ':mapId',
                //             element: <MyMap />
                //         }
                //     ]
                // },
                // {
                //     path: 'digital-content-admin',
                //     element: <DigitalContentIndex />,
                //     children: [
                //         {
                //             index: true,
                //             element: <DigitalContentList />
                //         },
                //     ]
                // },
                // {
                //     path: 'bundle-admin',
                //     element: <BundleIndex />,
                //     children: [
                //         {
                //             index: true,
                //             element: <BundlesList />
                //         },
                //         {
                //             path: 'create',
                //             element: <SingleBundle />
                //         },
                //         {
                //             path: ':bundleId',
                //             element: <SingleBundle />
                //         },
                //     ]
                // },
                // {
                //     path: 'asset-admin',
                //     element: <AssetIndex />,
                //     children: [
                //         {
                //             index: true,
                //             element: <AssetList />
                //         },
                //         {
                //             path: 'create',
                //             element: <AssetEditRoot />,
                //             children: getSingleAssetEditRoutes(assetFilters)
                //         },
                //         {
                //             path: ':assetId',
                //             element: <AssetEditRoot />,
                //             children: getSingleAssetEditRoutes(assetFilters)
                //         },
                //     ]
                // },
                // {
                //     path: 'map-settings-admin',
                //     element: <MapSettingsRoot />,
                //     children: [
                //         {
                //             index: true,
                //             element: <MapSettingsList />
                //         },
                //         {
                //             path: 'create',
                //             element: <CreateMapSetting />
                //         },
                //     ]
                // },
                // {
                //     path: "account-settings",
                //     element: <BasicSettings />
                // },
                // {
                //     path: "display-settings",
                //     element: <BasicSettings />
                // },
                // {
                //     path: "characters",
                //     element: <PlayerCharacters accessTokenString={accessToken} endpointUrl={endpointUrl}/>,
                //     errorElement: <ErrorElement />,
                //     children: [
                //         {
                //             index: true,
                //             element: <PlayerCharactersList accessTokenString={accessToken} endpointUrl={endpointUrl} mirrorscapeAPI={mirrorscapeAPI} />,
                //         },
                //         {
                //             path: 'ffnw/:characterSheetId',
                //             element: <FFNWCharacterSheetRoute />,
                //             children: ffnwCharacterSheetRoutes(accessToken, mirrorscapeAPI, endpointUrl),
                //         },
                //     ]
                // },
            ]
        },
        // {
        //     path: "menu",
        //     element: <Menu />,
        // },
        // {
        //     path: "settings",
        //     element: <Settings />,
        //     children: getProfileRouter(mirrorscapeAPI),
        // },
        // {
        //     path: "session",
        //     element: <SessionMenu />,
        // },
    ],
    { basename: basename });
}

export default getAppRouter;
