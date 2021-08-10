import { useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import { TodayTask } from '../types/types'
import { GET_TODAY_TASK } from '../queries/queries'
import Cookie from 'universal-cookie'

const cookie = new Cookie()
const endpoint = 'https://carepla.hasura.app/v1/graphql'
let graphQLClient: GraphQLClient

interface TasksRes {
  todayTask: TodayTask[]
}

const fetchTodayTask = async () => {
  const { todayTask: data } = await graphQLClient.request<TasksRes>(
    GET_TODAY_TASK
  )
  return data
}

export const useQueryTodayTask = () => {
  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])
  return useQuery<TodayTask[], Error>({
    queryKey: 'todayTask',
    queryFn: fetchTodayTask,
    staleTime: 0,
  })
}
