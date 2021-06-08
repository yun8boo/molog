import { signIn, signOut, useSession } from 'next-auth/client';

const IndexPage = () => {
  const [ session, loading ] = useSession()
  return (
    <>
      {!session && (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}>signOut</button>
        </>
      )}
    </>
  )
}

export default IndexPage