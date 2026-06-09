import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import getAppRouter from './AppRouter';
import useIsSingleColumnLayout from './Utility/isSingleColumnEffect';
import SplashScreen from './Component/SpashScreen';
import { API } from './API';
// import { GetAssetFiltersResponse } from '../../data/Asset/Asset';
// import { Ruleset } from '../../data/Ruleset/Ruleset';



interface AppMockArgs {
    baseUrl: string;
    // accessTokenString: string;
    // endpointUrl: string;
    // userId: string;
}

const App: React.FC<AppMockArgs> = args => {
//  const mirrorscapeAPI = new MirrorscapeAPI(args.accessTokenString, args.endpointUrl);
    // const mirrorscapeUser: MirrorscapeUser = {username: "test"}
    const useSingleColumn = useIsSingleColumnLayout();
    // const [assetFilters, setAssetFilters] = useState<GetAssetFiltersResponse|null>(null);
    // const [rulesets, setRulesets] = useState<Ruleset[]|null>(null);

    const [hasLoaded, setHasLoaded] = useState(false);

    /**
     * @todo migrate this to a loading process at the start of app.
     */
    useEffect(() => {
        new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            console.log("completed loading.");
            setHasLoaded(true);
        });
        // const temp = setTimeout(resolve, 2000)).then(() => {
        //     // your code here
        // }
        // mirrorscapeAPI.getAdminAPI().getAllAssetFilters().then(f => {
        //     setAssetFilters(f);
        //     return mirrorscapeAPI.getCharacterAPI().listRulesets(10, 1, 'name', 'asc', {});
        // }).then(r => {
        //     setRulesets(r.items);
        // }).catch((e)=>{
        //     console.log(`Error while fetching asset filters.`);
        //     console.log(e);
        // });

    }, []);

    if(!hasLoaded){
        return <SplashScreen />
    }

    const router = getAppRouter(
        args.baseUrl,
        new API(),
        // mirrorscapeUser,
        // args.userId,
        useSingleColumn,
        // assetFilters,
        // rulesets
    );

    return (
        <RouterProvider router={router} fallbackElement={undefined} future={undefined} />
    );
}

export default App
