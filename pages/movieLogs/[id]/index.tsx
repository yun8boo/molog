import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr';
import { MovieLogType } from '../../../src/interfaces/movieLog';

const fetcher = (...args) => fetch(`/api/movie_logs/${args[0]}`).then(res => res.json())

const MovieLog = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error } = useSWR<MovieLogType | undefined>(`/api/movie_logs/${id}`, () => fetcher(id))
  const handleDelete = async () => {
    try {
      await fetch(`/api/movie_logs/${id}`, {method: 'DELETE'});
      router.push('/movieLogs');
      return undefined
    }catch {
      console.log('error');
    }    
  }

  if(error) return <p>error page</p>

  if(!data) return null

  return (
    <div className='flex flex-col items-center'>
      <Image width={200} height={240} src={'/movie-sample.jpg'} />
      <p>{data.title}</p>
      <p>{data.body}</p>
      <Link href={`/movieLogs/${id}/edit`}><a>編集</a></Link>
      <button onClick={handleDelete}>削除</button>
    </div>
  )
}

export default MovieLog