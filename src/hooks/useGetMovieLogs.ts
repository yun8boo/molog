import useSWR from 'swr';
import { MovieLogType } from '../interfaces/movieLog';

const fetcher = () => fetch('/api/movie_logs').then(res => res.json());

export const useGetMovieLogs = () => {
  return useSWR<MovieLogType[] | undefined>('/api/movie_logs', fetcher)

}