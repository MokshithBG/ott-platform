import { useDispatch } from "react-redux";
import { API_OPITIONS } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getNowPlayingMovies = async () => {
            try {
                const data = await fetch('https://api.themoviedb.org/3/movie/now_playing', API_OPITIONS);
                const json = await data.json();
                dispatch(addNowPlayingMovies(json.results));
            } catch (err) {
                console.error("Failed to fetch now playing movies:", err);
                setTimeout(getNowPlayingMovies, 2000);
            }
        };
        getNowPlayingMovies();
    }, [dispatch]);
};

export default useNowPlayingMovies;


