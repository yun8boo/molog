import { signIn, signOut, useSession } from 'next-auth/client';

const IndexPage = () => {
  const [ session, loading ] = useSession()
  console.log(session);
  const post = async() => {
    const url = '/api/movie_logs'
    const body = {
      title: 'ユージュアル・サスペクツ',
      body: '面白かった'
    }
    await fetch(url, {method: 'POST', body: JSON.stringify(body)})
  }
  return (
    <>
      {!session && (
        <div className='flex  flex-col items-center justify-center h-screen'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded shadow' onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      )}
      {session && (
        <>
          <p>Signed in as {session.user.id}</p>
          <p><button onClick={post}>post</button></p>
          <button onClick={() => signOut()}>signOut</button>
        </>
      )}
    </>
  )
}

export default IndexPage