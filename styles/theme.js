import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage: `url("https://source.unsplash.com/user/sigemiyasigemiya/likes/")`,
        backgroundColor: 'gray.100',
        color: 'gray.800',
        opacity: 0.85,
      },
    },
  },
})
