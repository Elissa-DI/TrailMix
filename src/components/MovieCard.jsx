/* eslint-disable react/prop-types */
import { FaPlay } from "react-icons/fa"

export const MovieCard = ({ movie, selectMovie }) => {
  //props.movie;
  //props.selectMovie;

  const moviUrl = "https://image.tmdb.org/t/p/w500"

  return (
    <div className="relative bg-red text-white text-xl rounded-lg other m-3" >
      {
        movie.poster_path ?
          <>
            <img src={`${moviUrl}${movie.poster_path}`} alt="cover-image" className="rounded-xl" />
            <div className="absolute top-0 w-full h-full flex flex-col justify-center items-center gap-5 bg-blue-200 rounded-lg opacity-0 hover:opacity-[80%] z-10">
              <h5 className="flex justify-center items-center m-2 font-bold z-40 font-serif text-black">{movie.title}</h5>
              <button
                onClick={() => {
                  selectMovie(movie);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="animate-pulse shadow-lg py-2 px-5 rounded-full bg-blue-950 hover:bg-blue-700 h-14 z-40"
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
    </div>



  )
}