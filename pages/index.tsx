// import { memo, useEffect, useState, VFC } from 'react'
// import { useRouter } from 'next/router'
//
// import { Registration } from '../components/Registrations'
// import { Login } from '../components/Login'
// import axios from 'axios'
//
// const Home: VFC = () => {
//   const [loggedInStatus, setLoggedInStatus] = useState('未ログイン')
//   const [user, setUser] = useState({})
//
//   const handleLogin = (data: any) => {
//     setLoggedInStatus('ログインなう')
//     setUser(data.user)
//   }
//
//   const handleSuccessfulAuthentication = (data: string) => {
//     handleLogin(data)
//   }
//
//   useEffect(() => {
//     checkLoginStatus()
//   }, [])
//
//   const checkLoginStatus = () => {
//     axios
//       .get('http://localhost:3001/logged_in', { withCredentials: true })
//       .then((response) => {
//         if (response.data.logged_in && loggedInStatus === '未ログイン') {
//           setLoggedInStatus('ログインなう')
//           setUser(response.data.user)
//         } else if (
//           !response.data.logged_in &&
//           loggedInStatus === 'ログインなう'
//         ) {
//           setLoggedInStatus('未ログイン')
//           setUser({})
//         }
//       })
//       .catch((error) => {
//         console.log('ログインエラー', error)
//       })
//   }
//
//   const handleLogout = () => {
//     setLoggedInStatus('未ログイン')
//     setUser({})
//   }
//   const router = useRouter()
//
//   const handleLogoutClick = () => {
//     axios
//       .delete('http://localhost:3001/logout', { withCredentials: true })
//       .then((response) => {
//         handleLogout()
//       })
//       .catch((error) => console.log('ログアウトエラー', error))
//   }
//
//   return (
//     <div>
//       <h1>Home</h1>
//       <h2>ログイン状態: {loggedInStatus}</h2>
//
//       <button onClick={handleLogoutClick}>ログアウト</button>
//
//       <Registration
//         handleSuccessfulAuthentication={handleSuccessfulAuthentication}
//       />
//       <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} />
//     </div>
//   )
// }
// export default Home
// import React, { useState, useEffect, createContext } from 'react'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Redirect,
// } from 'react-router-dom'
// import { useRouter } from 'next/router'
//
// import CommonLayout from '../components/layouts/CommonLayout'
// import Home from '../components/pages/Home'
// import SignUp from '../components/pages/SignUp'
// import SignIn from '../components/pages/SignIn'
//
// import { getCurrentUser } from '../lib/api/auth'
// import { User } from '../types/types'
//
// // グローバルで扱う変数・関数
// export const AuthContext = createContext(
//   {} as {
//     loading: boolean
//     setLoading: React.Dispatch<React.SetStateAction<boolean>>
//     isSignedIn: boolean
//     setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
//     currentUser: User | undefined
//     setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
//   }
// )
//
// const Home2: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(true)
//   const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
//   const [currentUser, setCurrentUser] = useState<User | undefined>()
//   const router = useRouter()
//
//   // 認証済みのユーザーがいるかどうかチェック
//   // 確認できた場合はそのユーザーの情報を取得
//   const handleGetCurrentUser = async () => {
//     try {
//       const res = await getCurrentUser()
//
//       if (res?.data.isLogin === true) {
//         setIsSignedIn(true)
//         setCurrentUser(res?.data.data)
//
//         console.log(res?.data.data)
//       } else {
//         console.log('No current user')
//       }
//     } catch (err) {
//       console.log(err)
//     }
//
//     setLoading(false)
//   }
//
//   useEffect(() => {
//     handleGetCurrentUser()
//   }, [setCurrentUser])
//
//   // ユーザーが認証済みかどうかでルーティングを決定
//   // 未認証だった場合は「/signin」ページに促す
//   const Private = ({ children }: { children: React.ReactElement }) => {
//     if (!loading) {
//       if (isSignedIn) {
//         return children
//       } else {
//         router.push('/signin')
//       }
//       {
//         return <p>Redirecting...</p>
//       }
//     } else {
//       return <></>
//     }
//   }
//
//   return (
//     <Router>
//       <CommonLayout>
//         <Switch>
//           <Private>
//             <Route exact path="/" component={Home} />
//           </Private>
//         </Switch>
//       </CommonLayout>
//     </Router>
//   )
// }
//
// export default Home2
