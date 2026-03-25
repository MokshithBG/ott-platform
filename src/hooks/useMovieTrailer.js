import { useDispatch } from "react-redux";
import { API_OPITIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieVideos = async () =>{

    const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos", API_OPITIONS)
    const json = await data.json()

    const trailer = json.results.filter((video) => video.type === "Trailer")

    const trailerVideo = trailer[0]

    dispatch(addTrailerVideo(trailerVideo));
    }

    useEffect(()=>{
        getMovieVideos();
    },[])
}

export default useMovieTrailer