import { useDispatch } from "react-redux";
import { API_OPITIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieVideos = async () => {
            try {
                const data = await fetch(
                    "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
                    API_OPITIONS
                );
                const json = await data.json();
                const trailer = json?.results?.filter((video) => video?.type === "Trailer");
                const trailerVideo = trailer?.length > 0 ? trailer[0] : json?.results?.[0];
                if (trailerVideo) dispatch(addTrailerVideo(trailerVideo));
            } catch (err) {
                console.error("Failed to fetch trailer:", err);
            }
        };

        if (movieId) getMovieVideos();
    }, [movieId, dispatch]);
};

export default useMovieTrailer;