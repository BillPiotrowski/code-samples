import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import getAppRouter from './AppRouter';
import SplashScreen from './Component/SplashScreen';
import { API } from './API';

interface AppMockArgs {
    baseUrl: string;
}

const App: React.FC<AppMockArgs> = args => {
    const [hasLoaded, setHasLoaded] = useState(false);

    /**
     * @todo migrate this to a loading process at the start of app.
     */
    useEffect(() => {
        new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            setHasLoaded(true);
        });

    }, []);

    if(!hasLoaded){
        return <SplashScreen />
    }

    const router = getAppRouter(
        args.baseUrl,
        new API(),
    );

    return (
        <RouterProvider router={router} fallbackElement={undefined} future={undefined} />
    );
}

export default App
