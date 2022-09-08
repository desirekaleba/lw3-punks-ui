import { useEffect, useState } from "react";

const useMediaQuery = (screen = "(max-width: 768px)") => {
    const [matches, setMatches] = useState<boolean>(false);

    const onResizeScreen = (event: MediaQueryList | boolean) => {
        setMatches(typeof event === "boolean" ? event : event.matches);
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const matchMedia = window.matchMedia(screen);
        setMatches(matchMedia.matches);

        try {
            matchMedia.addEventListener("change", onResizeScreen);
        } catch (error) {
            matchMedia.addListener(onResizeScreen);
        }

        return () => {
            try {
                matchMedia.removeEventListener("change", onResizeScreen);
            } catch (error) {
                matchMedia.removeListener(onResizeScreen);
            }
        };
    }, [screen]);

    return [matches, setMatches];
};

export default useMediaQuery;
