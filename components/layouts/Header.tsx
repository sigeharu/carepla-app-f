// import React, { useContext, useState } from 'react'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import Cookies from 'js-cookie'
// import { useAppDispatch, useAppSelector } from '../../app/hooks'
// import { makeStyles, Theme } from '@material-ui/core/styles'
//
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
// import MapIcon from '@material-ui/icons/Map'
// import TimelineIcon from '@material-ui/icons/Timeline'
// import ChatIcon from '@material-ui/icons/Chat'
//
// import { signOut } from '../../lib/api/auth'
//
// import {
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
// } from '@material-ui/core'
// import {
//   resetUser,
//   resetIsSignedIn,
//   setIsSignedIn,
//   selectIsSignedIn,
// } from '../../slices/userSlice'
//
// const useStyles = makeStyles((theme: Theme) => ({
//   iconButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     textDecoration: 'none',
//     color: 'inherit',
//   },
//   linkBtn: {
//     textTransform: 'none',
//   },
// }))
//
// const Header: React.FC = () => {
//   const dispatch = useAppDispatch()
//   const isSignedIn = useAppSelector(selectIsSignedIn)
//   // const { loading } = useContext(AuthContext)
//   const classes = useStyles()
//   const router = useRouter()
//   const [open, setOpen] = useState(false)
//   const handleDrawerOpen = () => {
//     setOpen(true)
//   }
//   const handleDrawerClose = () => {
//     setOpen(false)
//   }
//
//   const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     try {
//       const res = await signOut()
//
//       if (res.data.success === true) {
//         // サインアウト時には各Cookieを削除
//         Cookies.remove('_access_token')
//         Cookies.remove('_client')
//         Cookies.remove('_uid')
//
//         // setIsSignedIn(false)
//         dispatch(resetIsSignedIn())
//         dispatch(resetUser())
//
//         router.push('/signin')
//
//         console.log('Succeeded in sign out')
//       } else {
//         console.log('Failed in sign out')
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   }
//
//   const AuthButtons = () => {
//     // 認証完了後はサインアウト用のボタンを表示
//     // 未認証時は認証用のボタンを表示
//
//     if (isSignedIn) {
//       return (
//         <Button
//           color="inherit"
//           className={classes.linkBtn}
//           onClick={handleSignOut}
//         >
//           ログアウト
//         </Button>
//       )
//     } else {
//       return (
//         <>
//           <Button color="inherit" className={classes.linkBtn}>
//             <Link href={'/signin'}>
//               <a>ログイン</a>
//             </Link>
//           </Button>
//           <Button color="inherit" className={classes.linkBtn}>
//             <Link href={'/signup'}>
//               <a>新規作成</a>
//             </Link>
//           </Button>
//         </>
//       )
//     }
//   }
//
//   return (
//     <>
//       <AppBar>
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.iconButton}
//             color="inherit"
//             onClick={handleDrawerOpen}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             <Link href={'/'}>
//               <a>け あ プ ラ</a>
//             </Link>
//           </Typography>
//           <AuthButtons />
//         </Toolbar>
//       </AppBar>
//       <Drawer open={open}>
//         <IconButton onClick={handleDrawerClose}>
//           <ChevronLeftIcon />
//         </IconButton>
//         <Divider />
//         <List>
//           <Link href={'/dashboard'}>
//             <ListItem>
//               <TimelineIcon />
//               <ListItemText primary="けあプラメイン画面" />
//             </ListItem>
//           </Link>
//
//           <Link href={'/carepla-edit'}>
//             <ListItem>
//               <ChatIcon />
//               <ListItemText primary="けあプラ作成画面" />
//             </ListItem>
//           </Link>
//
//           <Link href={'/comment-index'}>
//             <ListItem>
//               <MapIcon />
//               <ListItemText primary="一言一覧" />
//             </ListItem>
//           </Link>
//
//           <Link href={'/schedule'}>
//             <ListItem>
//               <MapIcon />
//               <ListItemText primary="スケジュール一覧" />
//             </ListItem>
//           </Link>
//         </List>
//       </Drawer>
//     </>
//   )
// }
//
// export default Header
