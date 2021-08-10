import { VFC } from 'react'
import { useQueryClient } from 'react-query'
import { Diary } from '../types/types'

const ClearCarePla: VFC = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<Diary[]>('diaries')
  console.log(data)
  return (
    <>
      <p>過去の一言</p>
      {data?.map((diary) => (
        <p key={diary.id}>{diary.comment}</p>
      ))}
    </>
  )
}

export default ClearCarePla
