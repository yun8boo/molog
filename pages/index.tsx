import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import MovieListItem from '../src/components/MovieListItem';
import { SearchMovieResponseType } from '../src/types/api/tmdb';

let timeId: NodeJS.Timeout
const IndexPage = () => {
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
      mutate('/api/movie_logs')
    }catch {
      console.log('error');
    }
  }

  const requestMovieInfo = async(title) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
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
    if(event.target.value === "") return
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
      <Link href='/movieLogs'><a>movie_logs</a></Link>
      <h1>Logを残す</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="title" onChange={onChange} />
        <input {...register("body")} placeholder="body" />
        <input type="submit" className='cursor-pointer' />
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

export default IndexPage