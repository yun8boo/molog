import { SearchResultMovie } from "../types/api/tmdb"

interface Props {
  movie: SearchResultMovie
  movieOnClick: (title: string, imgSrc: string | null) => void
}

const MovieListItem = ({movie, movieOnClick}: Props) => {
  const imgSrc = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no_image.png'
  const onClick = () => {
    movieOnClick(movie.title, movie.poster_path)
  }
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <p>{movie.title}</p>
      <img src={imgSrc} title={movie.title}/>
    </div>
  )
}

export default MovieListItem