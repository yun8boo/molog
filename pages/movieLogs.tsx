import { useSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import MovieLogList from '../src/components/MovieLogList';

const MovieLogs = () => {
  const [session] = useSession();
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch('/api/movie_logs');
        if(!res.ok) {
          throw new Error
        }
        const json = await res.json()
        if(json) {
          setContent(json)
        } 
      } catch (error) {
        console.log('サインインしてね');
      }
    }
    fetchData()
  }, [session])

  console.log(content);

  return (
    <div>
      <MovieLogList />
    </div>
  )
}

export default MovieLogs