import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
// import { ArmySheetsRouteRouteOutletContext } from './ArmySheetsRoute';
// import NavListView from '../../AppMock/Components/NavListView';
// import InfiniteScroll from '../../AppMock/Components/InfiniteScroll/InfiniteScroll';
import NavListView from '../../Component/NavListView';
import type { PaginatedDurerWoodcutResponseType } from '../../Type/DurerWoodcutType';
import InfiniteScroll from '../../Component/InfiniteScroll';
import type { DurerWoodcutsRootOutletContext } from './DurerWoodcutsRoot';
import Header from '../../Component/Header';
import type { SortOption } from '../../Type/SortOption';
// import { PaginatedArmiesResponse } from '../../../data/Army/ArmyResponse';
// import { SortOption } from '../../AppMock/Components/SortOptions/SortOptions';
// import Header from '../../AppMock/Components/Header/Header';
// import ArmySheetCreate from './ArmySheetCreate';

const sortByOptions: SortOption[] = [
    {name: 'ID Descending', property: 'id', direction: 'DESC'},
    {name: 'ID Ascending', property: 'id', direction: 'ASC'},
    {name: 'Name Ascending', property: 'name', direction: 'ASC'},
    {name: 'Name Descending', property: 'name', direction: 'DESC'},
];

const DurerWoodcutsList = () => {
    const parentContext = useOutletContext() as DurerWoodcutsRootOutletContext;
    const navigate = useNavigate();

    parentContext.setTitle('Characters');
    

    // useEffect(() => {
    //     parentContext.setModal(null);
    // }, [parentContext.assetListFilters]);

    // useEffect(() => {
    //     parentContext.setTools([
    //         {
    //             title: 'Filters',
    //             toggleCallback: async () => {
    //                 parentContext.setModal(<AssetsFilters filters={parentContext.assetListFilters} setFilters={parentContext.setAssetListFilters} />)
    //             }
    //         }
    //     ])
    // }, [parentContext.assetListFilters])

    const getter = (limit: number, pageNum: number, sortBy?: string, sortDirection?: string): Promise<PaginatedDurerWoodcutResponseType> => {
        return parentContext.api.getWoodcuts(limit, pageNum, sortBy, sortDirection);
    }
    console.log("Here 3")

    return <NavListView segueDirection={parentContext.direction} >
        <Header
            title="Characters"
            // action={{
            //     name: "Create",
            //     onClick: ()=> {
            //         parentContext.setModal(<ArmySheetCreate
            //             rulesets={parentContext.rulesets}
            //             isLoading={false}
            //             createNewArmySheet={async (armySheetName: string, rulesetId: string): Promise<void> => {
            //                 const army = await parentContext.mirrorscapeAPI.getCharacterAPI().createArmy({name: armySheetName, rulesetId})
            //                 parentContext.setModal(null);
            //                 navigate(`${army.rulesetId}/${army.id}`);
            //             } }
            //         />)
            //     }
            // }}
        />
        <InfiniteScroll
            getter={getter}
            createListElement={(bundle, index, ref) => {
                // return <li>Some thing</li>
                return <li ref={ref}><Link to={`${bundle.id}`}>{bundle.name}</Link></li>
            }}
            sortOptions={sortByOptions}
            filters={{}}
        />
    </NavListView>
}

export default DurerWoodcutsList;