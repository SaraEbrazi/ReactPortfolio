import toast from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useCharacter(url,query) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
        const controller = new AbortController();
        const signal = controller.signal;
        async function fetchData() {
          try {
            setIsLoading(true);
            const { data } = await axios.get(
              `${url}=${query}`,
              { signal }
            );
    
            setCharacters(data.results.slice(0, 5));
    
            const { data: episodesData } =
              await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}
            `);
    
            const episodesId = data.episodes.splice("/").at(-1);
          } catch (err) {
            if (axios.isCancel()) {
                setCharacters([]);
                toast.error(err.response.data.error); 
            }
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchData();
    
        return () => controller.abort();
    }, [query]);
    
    return { isLoading, characters }; 
}