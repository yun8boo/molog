import { signIn, signOut, useSession } from 'next-auth/client';
import Hoge from '../src/components/Hoge'

const IndexPage = () => {
  const [ session, loading ] = useSession()
  return (
    <>
      {!session && (
        <>
          <p>Not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
          <Hoge />
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