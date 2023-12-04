import { useState, useEffect } from "react";

const useFetchResource = (api_url) => {
    const [resource, setResource] = useState([])
    useEffect(() => {
        async function fetchResource(){
            let res = await fetch(api_url);
            let data = await res.json()
            setResource(data)
        }
        fetchResource()
    }, [api_url])

    return resource;
}

export default useFetchResource;