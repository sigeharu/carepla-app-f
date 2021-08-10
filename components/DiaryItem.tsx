import { VFC, memo, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { resetEditedDiary, setEditedDiary } from '../slices/diarySlice'
import { Diary } from '../types/types'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { Box, Text } from '@chakra-ui/react'
import { DiaryEditModalMemo } from './DiaryEditModal'

interface Props {
  diary: Diary
}

const DiaryItem: VFC<Props> = ({ diary }) => {
  const dispatch = useAppDispatch()
  const [selectedItem, setSelectedItem] = useState<number>(null)
  const { deleteDiaryMutation } = useMutateDiary()
  const onOpenDialog = (id: number) => {
    setSelectedItem(id)
  }
  const onCloseDialog = () => {
    setSelectedItem(null)
    dispatch(resetEditedDiary())
  }
  if (deleteDiaryMutation.isLoading) {
    return <p>Deleting</p>
  }
  return (
    <Box
      className="flex mt-2"
      bg="blue.800"
      p={2}
      shadow="md"
      borderWidth="1px"
      rounded={10}
      onClick={() => {
        dispatch(
          setEditedDiary({
            id: diary.id,
            comment: diary.comment,
            user_id: diary.user_id,
          })
        ),
          onOpenDialog(diary.id)
      }}
    >
      <Text className="text-pink-50 font-bold pl-2"> {diary.comment}</Text>

      <DiaryEditModalMemo
        selectedItem={selectedItem}
        onCloseDialog={onCloseDialog}
        diary={diary}
      />
    </Box>
  )
}
export const DiaryItemMemo = memo(DiaryItem)
