import React, { ReactNode, useState, VFC } from 'react'
import axios from 'axios'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useMessage } from '../hooks/useMessage'

type Props = {
  handleSuccessfulAuthentication: any
}

export const Registration: VFC<Props> = (props) => {
  const { handleSuccessfulAuthentication } = props
  const router = useRouter()
  const { showMessage } = useMessage()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    axios
      .post(
        'http://localhost:3001/signup',
        {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === 'created') {
          handleSuccessfulAuthentication(response.data)
          showMessage({ title: 'ユーザー登録しました!', status: 'success' })
          router.push('/dashboard')
        } else {
          showMessage({
            title: 'ユーザー登録ができませんでした\n もう一度登録してください',
            status: 'error',
          })
        }
      })
      .catch(() => {
        showMessage({
          title: 'ユーザー登録ができませんでした',
          status: 'error',
        })
      })
    e.preventDefault()
  }

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          けあプラ ユーザー登録画面
        </Heading>
        <Divider my={4} />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} py={4} px={10}>
            <Input
              type="name"
              name="name"
              placeholder="名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              name="password_confirmation"
              placeholder="確認用パスワード"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <Button
              bg="teal.400"
              color="white"
              _hover={{ opacity: 0.8 }}
              type="submit"
            >
              登録
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  )
}
