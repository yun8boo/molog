import useSWR from 'swr';
import MovieLogList from '../../src/components/MovieLogList';
import { MovieLogType } from '../../src/interfaces/movieLog';

const fetcher = (...args) => fetch('/api/movie_logs').then(res => res.json());

const MovieLogs = () => {
  const { data, error } = useSWR<MovieLogType[] | undefined>('/api/movie_logs', fetcher)

  if(error)return <p>error page</p>

  if(!data) return <p>loading...</p>

  return (
    <div>
      <MovieLogList movieLogs={data} />
    </div>
  )
}

export default MovieLogs