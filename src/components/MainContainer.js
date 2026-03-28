import { useSelector } from "react-redux"
import VideoBackground from "./VideoBackground"
import VideoTitle from "./VideoTitle"

const MainContainer = () => {
    const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

    if (!movies) return (
        <div className="bg-black h-screen flex items-center justify-center">
            <h1 className="text-white text-2xl animate-pulse">Loading...</h1>
        </div>
    );

    const mainMovie = movies[1];
    const { original_title, overview, id } = mainMovie;

    return (
        <div className="pt-[30%] bg-black md:pt-0">
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer;