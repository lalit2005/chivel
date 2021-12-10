import getConfigs from '@/utils/configs'
import { useUser } from '@/utils/contexts/useUser'
import withRedirectIfAutheticated from '@/utils/withRedirectIfAutheticated'
import { Provider } from '@supabase/gotrue-js'
import AppLayout from 'layouts/AppLayout'
import supabase from 'libs/supabase'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ImGithub, ImGoogle, ImTwitter } from 'react-icons/im'

const LoginPage: NextPage = () => {
  const { user, signIn } = useUser()
  const { baseUrl } = getConfigs()
  const router = useRouter()
  const redirectTo =
    baseUrl + (router.query.returnTo?.toString() ?? '/dashboard')
  console.log(redirectTo)

  const handleSignIn = (provider: Provider) => {
    signIn({ provider: provider }, { redirectTo })
  }
  return (
    <AppLayout>
      <div>
        <h1 className='mt-20  text-5xl font-extrabold text-center font-cal'>
          WELCOME BACK 👋
        </h1>
        <div className='mt-20 text-lg'>
          <button
            className='block px-10 py-2 mx-auto my-5 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline'
            type='button'
            onClick={handleSignIn.bind(null, 'google')}
          >
            <ImGoogle className='relative inline-block mr-3 bottom-px' />
            Sign in with Google
          </button>
          <button
            className='block px-10 py-2 mx-auto my-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline'
            type='button'
            onClick={handleSignIn.bind(null, 'twitter')}
          >
            <ImTwitter className='relative inline-block mr-3 bottom-px' /> Sign
            in with Twitter
          </button>
          <button
            className='block px-10 py-2 mx-auto my-5 font-bold text-black bg-white rounded hover:bg-gray-100 focus:outline-none focus:shadow-outline'
            type='button'
            onClick={handleSignIn.bind(null, 'github')}
          >
            <ImGithub className='relative inline-block mr-3 bottom-px' />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

export default withRedirectIfAutheticated(LoginPage, {
  redirectTo: '/dashboard',
})
