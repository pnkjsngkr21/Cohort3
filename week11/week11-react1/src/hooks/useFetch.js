import { useEffect } from "react";
import { useState } from "react";


export function useFetch(url) {
    const [post, setPost] = useState({});

    async function getDetails() {
        const response = await fetch(url);
        const data = await response.json();
        setPost(data);
    }

    useEffect(() =>{
        getDetails();

    }, [url])

    return {
        post
    }
}