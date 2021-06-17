import { MovieLogType } from "../interfaces/movieLog";

interface Props {
  movieLog: MovieLogType
}

const MovieLogListItem = ({ movieLog }: Props) => {
  const imgSrc = movieLog.imgSrc ? `https://image.tmdb.org/t/p/w500/${movieLog.imgSrc}` : '/no_image.png'
  return (
    <div className='flex flex-col shadow-md rounded'>
      <img src={imgSrc} />
    </div>
  )
}

export default MovieLogListItem