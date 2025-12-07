import { useRef, useState, useEffect } from "react";

export function useDebounce(delay = 300) {
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const debounceFn = (fn) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            fn();
        }, delay);
    }



    return debounceFn;
}