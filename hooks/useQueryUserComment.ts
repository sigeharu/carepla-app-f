import { useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'
import { useQuery } from 'react-query'
import { UserComment } from '../types/types'
import { GET_USER_COMMENT } from '../queries/queries'
import Cookie from 'universal-cookie'
import axios from 'axios'

type Data = {
  id: string
  comment: string
  user_id: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const useQueryUserComment = () => {
  const getDiary = async () => {
    const { data } = await axios.get<Data[]>(
      'http://localhost:3001/api/v1/diaries'
    )
    return data
  }
  return useQuery<Data[], Error>({
    queryKey: 'diary',
    queryFn: getDiary,
    staleTime: 0,
  })
}
