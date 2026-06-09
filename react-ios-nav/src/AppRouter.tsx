import {
  createBrowserRouter,
} from "react-router-dom";
import AppRoot from './AppRoot';
import Index from './Page/Index';
import type { API } from './API';
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
            />,
            children: [
                {
                    index: true,
                    element: <Index />
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
