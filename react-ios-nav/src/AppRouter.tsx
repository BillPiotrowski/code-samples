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

const getAppRouter = (
    basename: string,
    api: API
) => {
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
                            element: <DurerWoodcutLoader />,
                            children: [
                                {
                                    index: true,
                                    element: <DurerWoodcutView />,
                                },
                            ]
                        }

                    ]
                }
            ]
        },
    ],
    { basename: basename });
}

export default getAppRouter;
