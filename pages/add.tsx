import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { useGetMovieLogs } from '../src/hooks/useGetMovieLogs';
import MovieListItem from '../src/components/MovieListItem';
import { SearchMovieResponseType } from '../src/types/api/tmdb';

let timeId: NodeJS.Timeout
const Add = () => {
  const router = useRouter()
  const [searchMovie, setSearchMovie] = useState<SearchMovieResponseType | null>(null)
  const [imgSrc, setImgSrc] = useState<string>("")
  const {register, handleSubmit, setValue} = useForm()
  const onSubmit = async (data) => {
    try {
      const body = {
        ...data,
        imgSrc
      }
      await mutate('/api/movie_logs', async movieLogs => {
        const newMovieLog = await fetch('/api/movie_logs', {method: 'POST', body: JSON.stringify(body)});
        const updatedMovieLogs = [...movieLogs, newMovieLog]
        return updatedMovieLogs
      })
      router.push('/')
    }catch {
      console.log('error');
    }
  }

  const requestMovieInfo = async(title) => {
    const url = `https://api.themoviedb.org/3/search/movie?language=ja&query=${title}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    const res = await fetch(url);
    const json = await res.json()
    if(!!json.total_results) {
      setSearchMovie(json)
    }
  }

  const lazyFUnction = (func: Function, ms: number) => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      func()
    }, ms)
  }

  const onChange = async (event) => {
    if(event.target.value === "") {
      setSearchMovie(null);
      return
    }
    lazyFUnction(() => requestMovieInfo(event.target.value), 400);
  }

  const movieOnClick = useCallback(
    (title: string, imgSrc: string | null) => {
      setImgSrc(imgSrc || '')
      setValue("title", title)
    },
    [],
  )

  return (
    <div className='content-container flex p-6'>
      <form className='flex flex-col justify-center w-2/4' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold mb-2 md:mb-0 pr-4" htmlFor="title">
            Title
          </label>
          <div>
            <input {...register("title")} placeholder="title" onChange={onChange} id="title" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold mb-2 md:mb-0 pr-4" htmlFor="title">
            Body
          </label>
          <div>
            <textarea {...register("body")} rows={20} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
        </div>
        <input type="submit" className='cursor-pointer shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' />
      </form>
      <div className="ml-2 overflow-y-scroll w-2/4">
        <ul className='flex flex-wrap items-center'>
          {
            searchMovie && (
              searchMovie.results.map(result => {
                return (
                  <li key={result.id} className='w-1/3 sm:w-full'>
                    <MovieListItem movie={result} movieOnClick={movieOnClick} />
                  </li>
                )
              })
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Add