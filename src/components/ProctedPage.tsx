import Link from 'next/link'
import { ReactNode } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

type Props = {
  children?: ReactNode
}

const ProctedPage = ({children}: Props) => {
  const [session, loading] = useSession()
  if(loading) return null

  if(!loading && !session) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded shadow' onClick={() => signIn('google')}>Sign in with Google</button>
      </div>
    )
  }
  return (
    <div>
      <header className='flex justify-between p-6 shadow'>
        <Link href='/'><a><span className='font-bold'>molog</span></a></Link>
        <div>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      </header>
      {children}
    </div>
  )
}

export default ProctedPage