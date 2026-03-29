import MovieCard from "./MovieCard"


const MovieList = ({ title , movies}) => {
    if(!movies||movies.length===0) return (
        <h1 className="text-white px-6 py-4">
        Loading {title}...
    </h1>
    );
    return (
    <div className="px-6">
        <h1 className="text-lg md:text-3xl py-4 text-white">{title+" :"}</h1>
        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex">
                {movies.map((movie)=>(
                    <MovieCard key={movie.id} posterPath={movie.poster_path}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default MovieList