import Link from 'next/link'
import { ReactNode } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

type Props = {
  children?: ReactNode
}

const ProctedPage = ({children}: Props) => {
  const [session, loading] = useSession()
  if(loading) return null

  if(!loading && !session) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <button className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-4 rounded shadow' onClick={() => signIn('google')}>Sign in with Google</button>
      </div>
    )
  }
  return (
    <div>
      <header className='flex justify-between p-6 shadow'>
        <Link href='/'><a><span className='font-bold'>molog</span></a></Link>
        <div className='flex items-center'>
          <div>
            <Link href="/add">
              <a className="flex items-center mr-2">
                <FontAwesomeIcon className="text-2xl" icon={faPlus} />
              </a>
            </Link>
          </div>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      </header>
      {children}
    </div>
  )
}

export default ProctedPage