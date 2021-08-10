import React from 'react'

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// import Header from '../../components/layouts/Header'
import { Header } from '../../components/Header'
import { Flex, SimpleGrid, Container, HStack, Box } from '@chakra-ui/react'

// const useStyles = makeStyles(() => ({
//   container: {
//     marginTop: '3rem',
//   },
// }))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  // const classes = useStyles()

  return (
    <SimpleGrid w="100%" h="100%">
      <Box w="100%">
        <Header />
      </Box>
      <Container size="md" mt="4">
        {children}
      </Container>
    </SimpleGrid>
  )
}

export default CommonLayout
