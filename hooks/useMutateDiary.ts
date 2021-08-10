import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedDiary } from '../slices/diarySlice'
import { useQueryClient, useMutation } from 'react-query'
import { Diary, EditedDiary } from '../types/types'

export const useMutateDiary = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createDiaryMutation = useMutation(
    (diary: Omit<EditedDiary, 'id'>) =>
      axios.post<Diary>('http://localhost:3001/api/v1/diaries/', diary),
    {
      onSuccess: (res) => {
        const previousDiary = queryClient.getQueryData<Diary[]>('diary')
        if (previousDiary) {
          queryClient.setQueryData<Diary[]>('diary', [
            res.data,
            ...previousDiary,
          ])
          console.log('on success の実行結果', previousDiary, res.data)
        }
        dispatch(resetEditedDiary())
      },
    }
  )
  const updateDiaryMutation = useMutation(
    (diary: EditedDiary) =>
      axios.put<Diary>(
        `http://localhost:3001/api/v1/diaries/${diary.id}/`,
        diary
      ),
    {
      onSuccess: (res, variables) => {
        const previousDiary = queryClient.getQueryData<Diary[]>('diary')
        if (previousDiary) {
          queryClient.setQueryData<Diary[]>(
            'diary',
            previousDiary.map((diary) =>
              diary.id === variables.id ? res.data : diary
            )
          )
        }
        dispatch(resetEditedDiary())
      },
    }
  )
  const deleteDiaryMutation = useMutation(
    (id: number) => axios.delete(`http://localhost:3001/api/v1/diaries/${id}/`),
    {
      onSuccess: (res, variables) => {
        const previousDiary = queryClient.getQueryData<Diary[]>('diary')
        if (previousDiary) {
          queryClient.setQueryData<Diary[]>(
            'diary',
            previousDiary.filter((diary) => diary.id !== variables)
          )
        }
        dispatch(resetEditedDiary())
      },
    }
  )
  return { deleteDiaryMutation, createDiaryMutation, updateDiaryMutation }
}
