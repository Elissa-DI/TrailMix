/* eslint-disable react/prop-types */
import { FaPlay } from "react-icons/fa"

export const MovieCard = ({ movie, selectMovie }) => {
  //props.movie;
  //props.selectMovie;

  const moviUrl = "https://image.tmdb.org/t/p/w500"

  return (
    <div className="relative bg-red text-white text-xl rounded-lg other m-3">
      {
        movie.poster_path ?
          <>
            <img src={`${moviUrl}${movie.poster_path}`} alt="cover-image" className="rounded-xl" />
            <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center gap-5 bg-blue-300 rounded-lg opacity-0 hover:opacity-20">
              <h5 className="flex justify-center items-center m-2 font-bold opacity-80 z-50">{movie.title}</h5>
              <button
                onClick={() => { selectMovie(movie) }}
                className="animate-pulse shadow-lg py-2 px-5 rounded-full bg-blue-950 h-14"
              >
                <FaPlay size={18} />
              </button>
            </div>
          </>
          :
          <div>
            no image found
          </div>
      }
      <h5 className="flex justify-center items-center m-2 font-semibold"> {movie.title}</h5>
    </div>



  )
}