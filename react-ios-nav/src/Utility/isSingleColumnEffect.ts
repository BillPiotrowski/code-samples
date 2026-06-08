import React, {useState, useLayoutEffect} from 'react';

const useIsSingleColumnLayout = (): boolean => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    const [width, height] = size;
    /**
     * @todo calculate if retina pixels
     */
    return width < 800;
}

export default useIsSingleColumnLayout;