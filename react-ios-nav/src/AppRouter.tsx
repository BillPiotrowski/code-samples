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
import ArtistsRoot from './Page/Artists/ArtistsRoot';
import ArtistsList from './Page/Artists/ArtistsList';
import ArtistLoader from './Page/Artists/ArtistLoader';
import ArtistView from './Page/Artists/ArtistView';

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
                },
                {
                    path: "artists",
                    element: <ArtistsRoot />,
                    children: [
                        {
                            index: true,
                            element: <ArtistsList />
                        },
                        {
                            path: ":artistId",
                            element: <ArtistLoader />,
                            children: [
                                {
                                    index: true,
                                    element: <ArtistView />,
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
