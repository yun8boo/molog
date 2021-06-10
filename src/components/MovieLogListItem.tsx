import Image from 'next/image'
import { MovieLogType } from "../interfaces/movieLog";

interface Props {
  movieLog: MovieLogType
}

const MovieLogListItem = ({ movieLog }: Props) => {
  return (
    <div className='flex flex-col shadow-md rounded'>
      <Image width={100} height={300} src={'/movie-sample.jpg'} />
    </div>
  )
}

export default MovieLogListItem