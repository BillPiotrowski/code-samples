import { createContext, useContext } from 'react';

interface NavPathContext {
    previousPath: string | null;
    setPreviousPath: (path: string) => void;
}

const NavPathContext = createContext<NavPathContext>({
    previousPath: null,
    setPreviousPath: () => {},
});

export const useNavPath = () => useContext(NavPathContext);

export default NavPathContext;
