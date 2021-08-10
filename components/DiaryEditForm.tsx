import React, { VFC, memo, FormEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectUser } from '../slices/userSlice'
import { selectDiary, setEditedDiary } from '../slices/diarySlice'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { Box, Center, Textarea, VStack } from '@chakra-ui/react'
import { useQueryDiary } from '../hooks/useQueryDiary'
import dayjs from 'dayjs'
import { DiaryItemMemo } from './DiaryItem'
import { useMessage } from '../hooks/useMessage'

const DiaryEditForm: VFC = () => {
  const dispatch = useAppDispatch()
  const editedDiary = useAppSelector(selectDiary)
  const User = useAppSelector(selectUser)
  const { createDiaryMutation, updateDiaryMutation } = useMutateDiary()
  const { data, isLoading } = useQueryDiary()
  const { showMessage } = useMessage()
  const now = dayjs()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedDiary.id === null) {
      createDiaryMutation.mutate(editedDiary)
      showMessage({ title: '一言作成しました!', status: 'success' })
    }
  }

  if (createDiaryMutation.isLoading) {
    return <span>Creating...</span>
  }
  return (
    <Box>
      <VStack className="justify-center text-center">
        {data?.map(
          (diary) =>
            now.isSame(diary.created_at, 'day') &&
            diary.user_id === User?.id && <DiaryItemMemo diary={diary} />
        )}
      </VStack>

      <form onSubmit={submitHandler}>
        <Textarea
          className="my-2 px-3 py-2 border border-gray-300"
          placeholder="ここに一言書いてね"
          type="text"
          bg="white"
          onChange={(e) =>
            dispatch(
              setEditedDiary({
                ...editedDiary,
                comment: e.target.value,
                user_id: User.id,
              })
            )
          }
          value={editedDiary.comment}
        />

        <Center>
          <button
            className="disabled:opacity-40 mt-2 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
            disabled={!editedDiary.comment}
          >
            新規作成
          </button>
        </Center>
      </form>
    </Box>
  )
}
export const DiaryEditFormMemo = memo(DiaryEditForm)
