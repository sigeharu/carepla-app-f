import { VFC, memo, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { resetEditedDiary, setEditedDiary } from '../slices/diarySlice'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Diary, EditedDiary } from '../types/types'
import { useMutateDiary } from '../hooks/useMutateDiary'
import {
  Box,
  Heading,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { DiaryEditModalMemo } from '../app/DiaryEditModal'

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
      {/*<Text className="text-blue-600">*/}
      {/*  {dayjs(diary.created_at).format('YYYY年MM月DD日')}*/}
      {/*</Text>*/}
      <Text className="text-pink-50 font-bold pl-2"> {diary.comment}</Text>

      {/*<PencilAltIcon*/}
      {/*  className="h-10 w-10 text-blue-500 cursor-pointer float-right"*/}
      {/*  onClick={() => {*/}
      {/*    dispatch(*/}
      {/*      setEditedDiary({*/}
      {/*        id: diary.id,*/}
      {/*        comment: diary.comment,*/}
      {/*        user_id: diary.user_id,*/}
      {/*      })*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<TrashIcon*/}
      {/*  className="h-5 w-5 mx-3 text-blue-500 cursor-pointer float-right"*/}
      {/*  onClick={() => {*/}
      {/*    deleteDiaryMutation.mutate(diary.id)*/}
      {/*  }}*/}
      {/*/>*/}

      <DiaryEditModalMemo
        selectedItem={selectedItem}
        onCloseDialog={onCloseDialog}
        diary={diary}
      />
    </Box>
  )
}
export const DiaryItemMemo = memo(DiaryItem)
