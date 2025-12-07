import { useRef } from "react";
import { useEffect } from "react";


export function usePrev(value){
    const ref = useRef();

    useEffect(() =>{
        if(value != ref.current){
            ref.current = value;
        }
    }, [value])

    return ref.current;
}