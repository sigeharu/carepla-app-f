import { memo, ReactNode, VFC } from 'react'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const HeaderLayout: VFC<Props> = (props) => {
  const { children } = props
  return (
    <>
      <Header />
      {children}
    </>
  )
}
