import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import { MovieLogType } from '../../../src/interfaces/movieLog';

const MovieLog = () => {
  const [session] = useSession();
  const { id } = useRouter().query
  const [movieLog, setMovieLog] = useState<MovieLogType | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch(`/api/movie_logs/${id}`);
        if(!res.ok) {
          throw new Error
        }
        const json = await res.json()
        console.log(json);
        if(json) {
          setMovieLog(json)
        } 
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData()
  }, [session])

  const handleDelete = () => {
    console.log('delete');
  }

  if(!movieLog) return null

  return (
    <div className='flex flex-col items-center'>
      <Image width={200} height={240} src={'/movie-sample.jpg'} />
      <p>{movieLog.title}</p>
      <p>{movieLog.body}</p>
      <Link href={`/movieLogs/${id}/edit`}><a>編集</a></Link>
      <button onClick={handleDelete}>削除</button>
    </div>
  )
}

export default MovieLog