import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

const EditPage = () => {
  const { id } = useRouter().query
  const {register, handleSubmit} = useForm()
  const onSubmit = (data) => {
    try {
      mutate(`/api/movie_logs/${id}`, async logs => {
        console.log({logs});
        const body = JSON.stringify(data)
        const updateLogs = await fetch('/api/movie_logs', {method: 'PATCH', body});
        const filteredLogs = logs.filter(log => log.id !== id)
        console.log({filteredLogs});
        return [...filteredLogs, updateLogs]
      })
    }catch {
      console.log('error');
    }
  }
  return (
    <div className='flex flex-col items-center p-6'>
      <h1>編集</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="title" />
        <input {...register("body")} placeholder="body" />
        <input type="submit" />
      </form>
    </div>
  )
}

export default EditPage