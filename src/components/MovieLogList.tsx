import Link from 'next/link';
import { MovieLogType } from "../interfaces/movieLog"
import MovieLogListItem from "./MovieLogListItem"

interface Props {
  movieLogs: MovieLogType[]
}

const MovieLogList = ({movieLogs}: Props) => {
  return (
    <ul className='flex flex-wrap m-6'>
      {movieLogs.map(movieLog => {
        return (
          <li className='sm:w-1/2 md:w-1/3 lg:w-1/4' key={movieLog.id}>
            <Link href={`/movieLogs/${movieLog.id}`}>
              <a><MovieLogListItem movieLog={movieLog} /></a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default MovieLogList