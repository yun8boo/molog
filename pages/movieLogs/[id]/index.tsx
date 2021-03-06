import Link from 'next/link';
import { useRouter } from 'next/router'
import useSWR from 'swr';
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
    <div className='flex m-6'>
      <img src={data.imgSrc ? `https://image.tmdb.org/t/p/w500/${data.imgSrc}` : '/no_image.png'} />
      <div className="flex flex-col ml-6 w-full">
        <div>
          <p className="font-bold text-2xl">{data.title}</p>
        </div>
        <div>
          <p>{data.body}</p>
        </div>
        <div className="flex justify-center mt-4">
          <Link href={`/movieLogs/${id}/edit`}>
            <a className="transition border-solid border-2 border-purple-500 hover:border-purple-700 rounded py-4 px-4 text-purple-500 font-bold w-48 text-center">編集</a>
          </Link>
          <button className="transition ml-2 border-solid border-2 bg-red-400 hover:bg-red-500 rounded py-4 px-4 text-white font-bold w-48 text-center" onClick={handleDelete}>削除</button>
        </div>
      </div>
    </div>
  )
}

export default MovieLog