import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { memo, VFC } from 'react'
import Link from 'next/link'

type Props = {
  onClose: () => void
  isOpen: boolean
}

export const MenuDrawer: VFC<Props> = (props) => {
  const { onClose, isOpen } = props

  return (
    <Drawer placement="right" size={'sm'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton mt={'12px'} onClose={onClose} />
        <DrawerHeader>けあプラ</DrawerHeader>
        <DrawerBody p={0} bg="gray.100">
          <Link href={'/dashboard'}>
            <Button w="100%" onClick={onClose}>
              トップページ
            </Button>
          </Link>
          <Link href={'/comment-index'}>
            <Button w="100%" onClick={onClose}>
              日記一覧
            </Button>
          </Link>
          <Link href={'/weekly-carepla-index'}>
            <Button w="100%" onClick={onClose}>
              週間けあプラ
            </Button>
          </Link>
          <Link href={'/setting'}>
            <Button w="100%" onClick={onClose}>
              設定
            </Button>
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
