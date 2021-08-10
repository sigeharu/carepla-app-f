import React, { VFC } from 'react'
import Link from 'next/link'
import { Box, Flex, Heading, HStack, useDisclosure } from '@chakra-ui/react'
import { MenuDrawer } from './MenuDrawer'
import { MenuIconButton } from './MenuIconButton'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  resetIsSignedIn,
  resetUser,
  selectIsSignedIn,
} from '../slices/userSlice'
import { signOut } from '../lib/api/auth'
import Button from '@material-ui/core/Button'
import Cookies from 'js-cookie'

export const Header: VFC = () => {
  const dispatch = useAppDispatch()
  const isSignedIn = useAppSelector(selectIsSignedIn)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')

        // setIsSignedIn(false)
        dispatch(resetIsSignedIn())
        dispatch(resetUser())

        router.push('/signin')

        console.log('Succeeded in sign out')
      } else {
        console.log('Failed in sign out')
      }
    } catch (err) {
      console.log(err)
    }
  }
  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示

    if (isSignedIn) {
      return (
        <Button color="inherit" onClick={handleSignOut}>
          ログアウト
        </Button>
      )
    } else {
      return (
        <>
          <Button color="inherit">
            <Link href={'/signin'}>
              <a>ログイン</a>
            </Link>
          </Button>
          <Button color="inherit">
            <Link href={'/signup'}>
              <a>新規作成</a>
            </Link>
          </Button>
        </>
      )
    }
  }

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 4, md: 5 }}
      >
        <Flex align="center" as="a" _hover={{ cursor: 'pointer' }}>
          <Link href={'/dashboard'}>
            <Heading as="h1" fontSize={{ base: 'lg', md: 'lg' }}>
              けあプラ
            </Heading>
          </Link>
        </Flex>
        <AuthButtons />
        <MenuIconButton onOpen={onOpen} />
        <MenuDrawer onClose={onClose} isOpen={isOpen} />
      </Flex>
    </>
  )
}
