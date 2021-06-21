import Link from 'next/link'
import Image from 'next/image'
import { useGetMovieLogs } from '../src/hooks/useGetMovieLogs'
import MovieLogList from '../src/components/MovieLogList';

const MovieLogs = () => {
  const { data, error } = useGetMovieLogs()

  if(error)return <p>error page</p>

  if(!data) return <p>loading...</p>

  if(!data.length) {
    return (
      <div className="content-container flex items-center justify-center flex-col">
        <div className="mb-4">
          <Image src='/cinema.svg' height={500} width={500} />
        </div>
        <Link href="/add">
          <a className="font-bold text-xl">
            最初のログを残そう
          </a>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <MovieLogList movieLogs={data} />
    </div>
  )
}

export default MovieLogs