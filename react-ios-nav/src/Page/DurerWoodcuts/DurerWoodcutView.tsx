import NavListView from '../../Component/SplitNav/SplitNavView';
import { useDurerWoodcutContext } from './DurerWoodcutLoader';

const DurerWoodcutView = () => {
    const parentContext = useDurerWoodcutContext();
    if(parentContext.isLoading || parentContext.selectedWoodcut === null){
        return <NavListView isLoading={true} />
    }

    return <NavListView title={parentContext.selectedWoodcut.name}>
        <h2>Some cool stuff about the woodcut</h2>
    </NavListView>
}

export default DurerWoodcutView;