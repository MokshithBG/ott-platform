import { useDispatch } from "react-redux";
import { API_OPITIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getPopularMovies = async () => {
            try {
                const data = await fetch("https://api.themoviedb.org/3/movie/popular", API_OPITIONS);
                const json = await data.json();
                dispatch(addPopularMovies(json.results));
            } catch (err) {
                console.error("Failed to fetch popular movies:", err);
                setTimeout(getPopularMovies, 2000);
            }
        };
        getPopularMovies();
    }, [dispatch]);
};

export default usePopularMovies;


