import { useSelector } from "react-redux"
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector((store) => store?.movies);

    const nowPlayingMovies = movies?.nowPlayingMovies;
    const popularMovies = movies?.popularMovies;

    if (!nowPlayingMovies || !popularMovies) return (
        <div className="bg-black h-screen flex items-center justify-center">
            <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
        </div>
    );

    return (
        <div className="bg-black">
            <div className="mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
                <MovieList title="Now Playing" movies={nowPlayingMovies} />
                <MovieList title="Trending" movies={popularMovies} />
                <MovieList title="Popular" movies={popularMovies} />
                <MovieList title="Upcoming Movies" movies={nowPlayingMovies} />
                <MovieList title="Horror" movies={nowPlayingMovies} />
            </div>
        </div>
    )
}

export default SecondaryContainer;