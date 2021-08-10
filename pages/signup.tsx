import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { signUp } from '../lib/api/auth'
import { SignUpParams } from '../types/types'
import { setUser, setIsSignedIn } from '../slices/userSlice'
import { useAppDispatch } from '../app/hooks'

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
import { useMessage } from '../hooks/useMessage'

// サインアップ用ページ
const SignUp: () => void = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isOpen, onToggle } = useDisclosure()
  const { showMessage } = useMessage()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const params: SignUpParams = {
    name: name,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await signUp(params)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        dispatch(setIsSignedIn(true))
        dispatch(setUser(res.data.data))

        router.push('/dashboard')
        showMessage({
          title: '新規作成しました!',
          status: 'success',
        })
        showMessage({
          title: 'ようこそ『けあプラ』へあなたを歓迎します!',
          status: 'info',
        })
      } else {
        showMessage({
          title: '入力に誤りがあります｡再度登録してください｡',
          status: 'error',
        })
      }
    } catch (err) {
      showMessage({
        title: '入力に誤りがあります｡再度登録してください｡',
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
        <Box bg="white" p={4} mt={0} borderRadius="md" shadow="md">
          <Text className="text-center text-xl py-5">新規ユーザー作成</Text>
          <VStack spacing="4">
            <FormControl>
              <FormLabel>名前</FormLabel>
              <Input
                required
                value={name}
                placeholder="名前"
                margin="dense"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                required
                value={email}
                placeholder="メールアドレス"
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
            <FormControl>
              <FormLabel>パスワード確認</FormLabel>
              <Input
                required
                label="パスワード確認"
                type="password"
                value={passwordConfirmation}
                margin="dense"
                autoComplete="current-password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              size="lg"
              fullWidth
              colorScheme="blue"
              disabled={
                !name || !email || !password || !passwordConfirmation
                  ? true
                  : false
              }
            >
              送信
            </Button>
          </VStack>
        </Box>
      </form>
    </>
  )
}

export default SignUp
