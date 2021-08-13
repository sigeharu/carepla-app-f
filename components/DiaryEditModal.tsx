import { FormEvent, memo, useRef, VFC } from 'react'
import { Button, Center, FormControl, HStack, Textarea } from '@chakra-ui/react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Diary } from '../types/types'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectDiary, setEditedDiary } from '../slices/diarySlice'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { useMessage } from '../hooks/useMessage'

export interface Props {
  selectedItem: number
  onCloseDialog: () => void
  diary: Diary
}

const DiaryEditModal: VFC<Props> = (props) => {
  const { selectedItem, onCloseDialog, diary } = props
  const editedDiary = useAppSelector(selectDiary)
  const dispatch = useAppDispatch()
  const { updateDiaryMutation, deleteDiaryMutation } = useMutateDiary()
  const { showMessage } = useMessage()

  const initialRef = useRef()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateDiaryMutation.mutate(editedDiary)
    showMessage({ title: '一言編集しました!', status: 'success' })
    onCloseDialog()
  }
  return (
    <>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        initialFocusRef={initialRef}
        isOpen={diary.id === selectedItem}
        onClose={onCloseDialog}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>日記の編集</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submitHandler}>
            <ModalBody pb={6}>
              <FormControl>
                <Textarea
                  ref={initialRef}
                  type="textarea"
                  onChange={(e) => {
                    dispatch(
                      setEditedDiary({
                        id: diary.id,
                        comment: e.target.value,
                        user_id: diary.user_id,
                      })
                    )
                  }}
                  value={editedDiary.comment}
                />
              </FormControl>
            </ModalBody>

            <Center>
              <ModalFooter>
                <HStack spacing="5">
                  <Button colorScheme="green" type="submit">
                    変更
                  </Button>
                  <Button
                    colorScheme="orange"
                    onClick={() => deleteDiaryMutation.mutate(diary.id)}
                  >
                    削除
                  </Button>
                  <Button onClick={onCloseDialog}>閉じる</Button>
                </HStack>
              </ModalFooter>
            </Center>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export const DiaryEditModalMemo = memo(DiaryEditModal)
