import { useSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import MovieLogList from '../../src/components/MovieLogList';
import { MovieLogType } from '../../src/interfaces/movieLog';

const MovieLogs = () => {
  const [session] = useSession();
  const [movieLogs, setMovieLogs] = useState<MovieLogType[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch('/api/movie_logs');
        if(!res.ok) {
          throw new Error
        }
        const json = await res.json()
        if(json) {
          setMovieLogs(json)
        } 
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData()
  }, [session])

  return (
    <div>
      <MovieLogList movieLogs={movieLogs} />
    </div>
  )
}

export default MovieLogs