import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

const EditPage = () => {
  const { id } = useRouter().query
  const {register, handleSubmit} = useForm()
  const onSubmit = (data) => {
    try {
      mutate(`/api/movie_logs/${id}`, async logs => {
        const body = JSON.stringify(data)
        await fetch(`/api/movie_logs/${id}`, {method: 'PATCH', body});
      })
    }catch {
      console.log('error');
    }
  }
  return (
    <div className='flex flex-col items-center p-6'>
      <h1>編集</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
          <label className="block text-gray-500 font-bold mb-2 md:mb-0 pr-4" htmlFor="title">
            Title
          </label>
          <div className="w-96">
            <input {...register("title")} placeholder="title" id="title" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-bold mb-2 md:mb-0 pr-4" htmlFor="title">
            Body
          </label>
          <div className="w-96">
            <input {...register("body")} placeholder="body" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
          </div>
        </div>
        <input type="submit" className='cursor-pointer shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' />
      </form>
    </div>
  )
}

export default EditPage