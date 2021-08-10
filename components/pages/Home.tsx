// import React, { useContext } from 'react'
//
// import { AuthContext } from '../../pages/_app'
// import { Box, Flex } from '@chakra-ui/react'
// import SignIn from '../../pages/signin'
//
// // とりあえず認証済みユーザーの名前やメールアドレスを表示
// const Home: React.FC = () => {
//   const { isSignedIn, currentUser } = useContext(AuthContext)
//   console.log(currentUser)
//
//   return (
//     <>
//       {isSignedIn && currentUser ? (
//         <>
//           <Flex align="center" justify="center" height="50vh">
//             <Box bg="pink.50" w="lg" p={4} borderRadius="md" shadow="md">
//               <h1 className="text-center justify-center text-blue-500 font-bold">
//                 ようこそ!けあプラへ
//               </h1>
//               <h2 className="text-center justify-center font-bold text-blue-800">
//                 ユーザー名: {currentUser?.name}
//               </h2>
//             </Box>
//           </Flex>
//         </>
//       ) : (
//         <>
//           <SignIn />
//         </>
//       )}
//     </>
//   )
// }
//
// export default Home
