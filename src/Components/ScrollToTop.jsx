import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(search);
        if (params.has('category') || params.get('scroll') === 'menu') {
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname, search]);

    return null;
}
