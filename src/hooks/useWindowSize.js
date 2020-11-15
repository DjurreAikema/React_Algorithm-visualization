import React, {useState, useEffect} from 'react'

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: document.getElementById('main__body').clientWidth,
                height: document.getElementById('main__body').clientHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
