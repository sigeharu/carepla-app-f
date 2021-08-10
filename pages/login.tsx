import { FormEvent, memo, useEffect, useState, VFC } from 'react'
import axios from 'axios'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Button,
  Link,
  Text,
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/useMessage'

export const Login: VFC = () => {
  const history = useHistory()
  const { showMessage } = useMessage()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInStatus, setLoggedInStatus] = useState('未ログイン')
  const [user, setUser] = useState({})
  const handleLogin = (data: any) => {
    setLoggedInStatus('ログインなう')
    setUser(data.user)
  }
  const handleSuccessfulAuthentication = (data: string) => {
    handleLogin(data)
  }
  useEffect(() => {
    checkLoginStatus()
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    axios
      .post(
        'http://localhost:3001/login',
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          handleSuccessfulAuthentication(response.data)
          showMessage({ title: 'ログインしました', status: 'success' })
          history.push('/dashboard')
        } else {
          showMessage({ title: 'ユーザーが見つかりません', status: 'error' })
        }
      })
      .catch(() => {
        showMessage({ title: 'ログインできません', status: 'error' })
      })
    e.preventDefault()
  }
  const checkLoginStatus = () => {
    axios
      .get('http://localhost:3001/logged_in', { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === '未ログイン') {
          setLoggedInStatus('ログインなう')
          setUser(response.data.user)
        } else if (
          !response.data.logged_in &&
          loggedInStatus === 'ログインなう'
        ) {
          setLoggedInStatus('未ログイン')
          setUser({})
        }
      })
      .catch((error) => {
        console.log('ログインエラー', error)
      })
  }
  const handleLogout = () => {
    setLoggedInStatus('未ログイン')
    setUser({})
  }
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          けあプラ ログイン画面
        </Heading>
        <Divider my={4} />
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} py={4} px={10}>
            <Input
              type="email"
              name="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              type="password"
              name="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button
              bg="teal.400"
              color="white"
              _hover={{ opacity: 0.8 }}
              type="submit"
            >
              ログイン
            </Button>
          </Stack>
        </form>
        <Text>
          ユーザー登録がまだの方は{' '}
          <Link color="teal.500" href="/registrations">
            こちらからユーザー登録できますよ!
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}
