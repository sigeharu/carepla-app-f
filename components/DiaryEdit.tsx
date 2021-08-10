import React, { VFC, memo, FormEvent, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectDiary, setEditedDiary } from '../slices/diarySlice'
import { useMutateDiary } from '../hooks/useMutateDiary'
import { selectUser } from '../slices/userSlice'

const DiaryEdit: VFC = () => {
  const editedDiary = useAppSelector(selectDiary)
  const User = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const { createDiaryMutation, updateDiaryMutation } = useMutateDiary()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedDiary.id === null) createDiaryMutation.mutate(editedDiary)
    else {
      updateDiaryMutation.mutate(editedDiary)
    }
  }

  if (updateDiaryMutation.isLoading) {
    return <span>Updating...</span>
  }
  if (createDiaryMutation.isLoading) {
    return <span>Creating...</span>
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="一言をどうぞ!"
          type="text"
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
        <button
          className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
          disabled={!editedDiary.comment}
        >
          {editedDiary.id === null ? '新規作成' : '一言変更'}
        </button>
      </form>
    </div>
  )
}
export const DiaryEditMemo = memo(DiaryEdit)
