/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './App.css'
import { useState, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import Axios from 'axios'
import { MovieCard } from './components/MovieCard';
import YouTube from 'react-youtube';
import { FaCopyright } from "react-icons/fa"

function App() {
  const imageUrl = "https://image.tmdb.org/t/p/w1280"
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})
  const [playTrailer, setPlayTrailer] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const apiUrl = "https://api.themoviedb.org/3/";
  const apiKey = "253eb6a5f22792e1412b47d42d247239"
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    try {
      const { data } = await Axios.get(`${apiUrl}/${type}/movie`, {
        params: {
          api_key: apiKey,
          query: searchKey,
        },
      });
      setMovies(data.results);
      await selectMovie(data.results[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMovie = async (id) => {
    try {
      const { data } = await Axios.get(`${apiUrl}/movie/${id}`, {
        params: {
          api_key: apiKey,
          append_to_response: "videos",
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const selectMovie = useCallback(async (movie) => {
    if (!movie) {
      setNotFound(true)
      return;
    }
    try {
      const data = await fetchMovie(movie.id);
      // Now the movie object is loaded, so you can read its properties
      setPlayTrailer(false);
      setSelectedMovie(data);
    } catch (error) {
      console.log(error);
      // handle error here, e.g. show an error message to the user
      setPlayTrailer(false);
      setSelectedMovie(movie);
    }
  }, [movies])

  const renderTrailer = () => {
    try {
      if (selectedMovie && selectedMovie.videos && selectedMovie.videos.results && selectedMovie.videos.results.length > 0) {
        const trailer = selectedMovie.videos.results.find((vid) => vid.name === "Official Trailer");
        const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;
        return (
          <YouTube
            videoId={key}
            className='youtubeContainer sm:w-20'
            opts={{
              playerVars: {
                autoplay: true,
              },
            }}
          />
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    fetchMovies()
  }, [])

  const renderMovies = () => {
    return movies.map((movie) => {
      return <MovieCard
        key={movie.id}
        movie={movie}
        selectMovie={selectMovie}
      />
    })
  }
  const MemoMovies = useMemo(() => {
    return renderMovies
  }, [movies])
  // console.log(movies[0].original_title);
  const [searchKey, setSearchKey] = useState("")
  const searching = (e) => {
    setNotFound(false)
    const targetValue = e.target.value;
    if (targetValue.includes(" ")) {
      setSearchKey(targetValue);
    } else {
      setSearchKey(targetValue);
    }
  };

  const searchMovie = (e) => {
    e.preventDefault()
    console.log(searchKey);
    fetchMovies(searchKey)
  }

  const inputRef = useRef(null)
  const handleRef = () => {
    const value = inputRef.current.value;
    if (value === "") {
      inputRef.current.focus()
    } else {
      inputRef.current.value = ""
    }
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className={`grid grid-row-3 h-full `} >
      <header className='header grid grid-cols-2 gap-10 py-1 px-10'>
        <div className='flex gap-2'>
          <img src="/img/logo.png" alt="Logo" className='w-10 h-12 mt-3' />
          <h1 className="title hidden md:block">TrailMix</h1>
        </div>
        <form onSubmit={searchMovie} className="flex justify-end items-center">
          <input type="text" name="searchInput" id="seachInput" onChange={searching} className="search" ref={inputRef} placeholder='search trailer....' />
          {/* <button type="submit" className=" searchButton" onClick={handleRef}><AiOutlineSearch size={25} className=''/></button> */}
        </form>
      </header>
      <section className={`h-[80vh]`}>
        <div style={{ background: `url(${imageUrl}${selectedMovie.backdrop_path}) ` }} className='h-full bg-cover bg-no-repeat'>
          <div className='all'>
            {selectedMovie.videos && playTrailer ? (
              <>
                <div className='' >
                  {renderTrailer()}
                </div>
                <div className='' >
                  <h1 className='text-5xl'>{selectedMovie.title}</h1>
                  {selectedMovie.overview ? <p className='my-2 text-xl'>{selectedMovie.overview}</p> : null}
                </div>
                <div className=''>
                  {playTrailer && (
                    <button className='bg-blue-900 hover:bg-blue-950  font-bold py-2 px-4 border border-blue-900 rounded my-3' onClick={() => { setPlayTrailer(false) }}>
                      Close
                    </button>
                  )}
                </div>
              </>
            ) : (

              <div className=''>
                <h1 className='text-5xl p-2'>{selectedMovie.title}</h1>
                {selectedMovie.overview ? <p className='my-2 text-xl'>{selectedMovie.overview}</p> : null}
                {!playTrailer && (
                  <button onClick={() => setPlayTrailer(true)} className='bg-blue-900 hover:bg-blue-950  font-bold py-2 my-3 px-4 border border-blue-900 rounded '>
                    Play Trailer
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <main>
        <div className='py-5 px-10 movie'>
          <p className='font-bold text-white text-xl'>Recent Movies</p>
        </div>
        <div className='grid grid-cols-3  gap-3 movie'>
          {
            movies ? MemoMovies() :
              <div className='shadow-md'></div>
          }
        </div>
      </main>
      <footer className=' bg-slate-700'>
        {notFound && <p className='title'>no movie found with that name</p>}
        <p className='items-center flex justify-center text-white'>
          &copy; {currentYear} Created by &nbsp;
          <a href="https://www.linkedin.com/in/elissa-dusabe-415161256/" className=' text-blue-400' title='My Linkedin'>
            Elissa
          </a>
        </p>
      </footer>
    </div>
  )
}
export default App;












