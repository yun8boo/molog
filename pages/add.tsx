import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
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
      await fetch('/api/movie_logs', {method: 'POST', body: JSON.stringify(body)});
      await mutate('/api/movie_logs')
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
    <div className='flex flex-col items-center p-6'>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold mb-2 md:mb-0 pr-4" htmlFor="title">
            Title
          </label>
          <div className="w-96">
            <input {...register("title")} placeholder="title" onChange={onChange} id="title" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold mb-2 md:mb-0 pr-4" htmlFor="title">
            Body
          </label>
          <div className="w-96">
            <input {...register("body")} placeholder="body" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
        </div>
        <input type="submit" className='cursor-pointer shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' />
      </form>
      <ul className='flex flex-wrap'>
        {
          searchMovie && (
            searchMovie.results.map(result => {
              return (
                <li key={result.id} className='w-3/12'>
                  <MovieListItem movie={result} movieOnClick={movieOnClick} />
                </li>
              )
            })
          )
        }
      </ul>
    </div>
  )
}

export default Add