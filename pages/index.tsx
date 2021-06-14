import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

const IndexPage = () => {
  const {register, handleSubmit} = useForm()
  const onSubmit = async (data) => {
    try {
      const body = JSON.stringify(data)
      await fetch('/api/movie_logs', {method: 'POST', body});
      mutate('/api/movie_logs')
    }catch {
      console.log('error');
    }
  }
  return (
    <div className='flex flex-col items-center p-6'>
      <Link href='/movieLogs'><a>movie_logs</a></Link>
      <h1>Logを残す</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="title" />
        <input {...register("body")} placeholder="body" />
        <input type="submit" className='cursor-pointer' />
      </form>
    </div>
  )
}

export default IndexPage