import { useEffect } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import Cookie from 'universal-cookie'
import { CREATE_USER_COMMENT } from '../queries/queries'
import { UserComment } from '../types/types'
import { useDispatch } from 'react-redux'
import { resetEditedUserComment } from '../slices/uiSlice'

const cookie = new Cookie()
const endpoint = 'https://carepla.hasura.app/v1/graphql'
let graphQLClient: GraphQLClient

export const useAppMutate = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  useEffect(() => {
    graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`,
      },
    })
  }, [cookie.get('token')])
  const createUserCommentMutation = useMutation(
    (comment: string) =>
      graphQLClient.request(CREATE_USER_COMMENT, { comment: comment }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<UserComment[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData('tasks', [
            ...previousTodos,
            res.insert_userComment_one,
          ])
        }
        dispatch(resetEditedUserComment())
      },
      onError: () => {
        dispatch(resetEditedUserComment())
      },
    }
  )
  return {
    createUserCommentMutation,
  }
}
