import React, { useState, useContext, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { signIn } from '../lib/api/auth'
import { SignInParams } from '../types/types'
import { setUser, setIsSignedIn } from '../slices/userSlice'
import { useAppDispatch } from '../app/hooks'
import { useMessage } from '../hooks/useMessage'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  useMergeRefs,
  VStack,
} from '@chakra-ui/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

// サインイン用ページ
const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { showMessage } = useMessage()
  const { isOpen, onToggle } = useDisclosure()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const params: SignInParams = {
      email: email,
      password: password,
    }

    try {
      const res = await signIn(params)
      console.log(res)

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        dispatch(setIsSignedIn(true))
        dispatch(setUser(res.data.data))

        router.push('/dashboard')
        showMessage({ title: 'ログインしました', status: 'success' })

        console.log('Signed in successfully!')
      } else {
        showMessage({
          title:
            '入力に誤りがあるかユーザーが登録されていません｡再入力または新規登録してください｡',
          status: 'error',
        })
      }
    } catch (err) {
      console.log(err)
      showMessage({
        title:
          '入力に誤りがあるかユーザーが登録されていません｡再入力または新規登録してください｡',
        status: 'error',
      })
    }
  }
  const inputRef = React.useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef)

  const onClickReveal = () => {
    onToggle()
    const input = inputRef.current
    if (input) {
      input.focus({ preventScroll: true })
      const length = input.value.length * 2
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length)
      })
    }
  }

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box bg="white" p={4} mt={8} borderRadius="md" shadow="md">
          <Text className="text-center text-xl py-5">ログイン</Text>
          <VStack spacing="4">
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                required
                placeholder="メール"
                value={email}
                margin="dense"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Flex justify="space-between">
                <FormLabel>パスワード</FormLabel>
              </Flex>
              <InputGroup>
                <InputRightElement>
                  <IconButton
                    bg="transparent !important"
                    variant="ghost"
                    aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                    onClick={onClickReveal}
                  />
                </InputRightElement>
                <Input
                  ref={mergeRef}
                  name="password"
                  placeholder="6文字以上"
                  margin="dense"
                  type={isOpen ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              size="lg"
              fontSize="md"
              disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
            >
              送信
            </Button>
            <Box textAlign="center">
              <Box variant="body2">
                まだアカウントをお持ちでない方は &nbsp;
                <Link href="/signup">
                  <a className="text-blue-600">こちらから作成できます!</a>
                </Link>
              </Box>
            </Box>
          </VStack>
        </Box>
      </form>
    </>
  )
}

export default SignIn
