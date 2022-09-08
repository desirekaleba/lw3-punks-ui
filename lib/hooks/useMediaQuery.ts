import { useEffect, useState } from "react";

const useMediaQuery = (screen = "(max-width: 768px)") => {
    const [matches, setMatches] = useState<boolean>(false);

    const onResizeScreen = (event: MediaQueryListEvent | boolean) => {
        setMatches(typeof event === "boolean" ? event : event.matches);
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const matchMedia = window.matchMedia(screen);
        setMatches(matchMedia.matches);

        try {
            matchMedia.addEventListener("change", onResizeScreen);
        } catch (error) {
            matchMedia.removeEventListener("change", onResizeScreen);
        }

        return () => {
            try {
                matchMedia.removeEventListener("change", onResizeScreen);
            } catch (error) {
                matchMedia.removeEventListener("change", onResizeScreen);
            }
        };
    }, [screen]);

    return [matches, setMatches];
};

export default useMediaQuery;
