import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function CallToActionWithIllustration() {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          パートナーと充実の毎日を作ろう
          <br />
          <Text as={'span'} color={'orange.400'}>
            けあプラ
          </Text>
        </Heading>
        <Text color={'gray.800'} maxW={'3xl'}>
          けあプラとは､どんな方にも使いやすい計画を作れるアプリです｡
          高年齢層の方にも使いやすく､ついつい手を触れてしまいたくなるような設計になっています｡
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Link href={'/signup'}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
            >
              かんたんユーザー作成
            </Button>
          </Link>

          <Button rounded={'full'} px={6}>
            もっと詳しく知りたい
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
