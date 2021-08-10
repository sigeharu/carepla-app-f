import React, { VFC } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useQueryDiary } from '../hooks/useQueryDiary'
import { selectUser } from '../slices/userSlice'
import { useAppSelector } from '../app/hooks'
import { DiaryItemMemo } from './DiaryItem'
import dayjs from 'dayjs'

export const DiaryList: VFC = () => {
  const User = useAppSelector(selectUser)

  const { status, data } = useQueryDiary()
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'Error'}</div>
  return (
    <Box p={4} borderRadius="md" shadow="md">
      {data?.map(
        (diary) =>
          diary.user_id === User?.id && (
            <Box key={diary.id} bg="teal.300" p={2} m={1} rounded={10}>
              <Text className="font-bold">
                {dayjs(diary.created_at).format('YYYY/MM/DD')}
              </Text>
              <DiaryItemMemo diary={diary} />
            </Box>
          )
      )}
    </Box>
  )
}
