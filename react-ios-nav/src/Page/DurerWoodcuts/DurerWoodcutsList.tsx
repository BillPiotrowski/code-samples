import { Link } from 'react-router-dom';
import NavListView from '../../Component/SplitNav/SplitNavView';
import type { PaginatedDurerWoodcutResponseType } from '../../Type/DurerWoodcutType';
import InfiniteScroll from '../../Component/InfiniteScroll';
import { useDurerWoodcutsContext } from './DurerWoodcutsRoot';
import Header from '../../Component/Header';
import type { SortOption } from '../../Type/SortOption';

const sortByOptions: SortOption[] = [
    {name: 'ID Descending', property: 'id', direction: 'DESC'},
    {name: 'ID Ascending', property: 'id', direction: 'ASC'},
    {name: 'Name Ascending', property: 'name', direction: 'ASC'},
    {name: 'Name Descending', property: 'name', direction: 'DESC'},
];

const DurerWoodcutsList = () => {
    const parentContext = useDurerWoodcutsContext();

    const getter = (limit: number, pageNum: number, sortBy?: string, sortDirection?: string): Promise<PaginatedDurerWoodcutResponseType> => {
        return parentContext.api.getWoodcuts(limit, pageNum, sortBy, sortDirection);
    }
    console.log("Here 3")

    return <NavListView title="Characters">
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
            createListElement={(bundle, _, ref) => {
                return <li ref={ref}><Link to={`${bundle.id}`}>{bundle.name}</Link></li>
            }}
            sortOptions={sortByOptions}
            filters={{}}
        />
    </NavListView>
}

export default DurerWoodcutsList;