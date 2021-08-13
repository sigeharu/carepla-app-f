import { AppProps } from 'next/app'
import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import React, { createContext, useEffect, useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import axiosBase from 'axios'

import { User } from '../types/types'
import { getCurrentUser } from '../lib/api/auth'
import CommonLayout from '../components/layouts/CommonLayout'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectUser } from '../slices/userSlice'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const router = useRouter()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  // const handleGetCurrentUser = async () => {
  //   try {
  //     const res = await getCurrentUser()
  //
  //     if (res?.data.isLogin === true) {
  //       setIsSignedIn(true)
  //       setCurrentUser(res?.data.data)
  //
  //       console.log(res?.data.data)
  //     } else {
  //       console.log('No current user')
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  //
  //   setLoading(false)
  // }
  //
  // useEffect(() => {
  //   handleGetCurrentUser()
  // }, [setCurrentUser])

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  // const Private = ({ children }: { children: React.ReactElement }) => {
  //   if (!loading) {
  //     if (isSignedIn && window.location.pathname !== '/signin') {
  //       return children
  //     } else {
  //       router.push('/signin')
  //     }
  //     {
  //       return <div>rendering...</div>
  //     }
  //   } else {
  //     router.push('/signin')
  //   }
  // }

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CommonLayout>
            <Component {...pageProps} />
          </CommonLayout>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default MyApp
