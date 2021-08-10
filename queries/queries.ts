import { gql } from 'graphql-request'

export const GET_TODAY_TASK = gql`
  query GetTodayTask {
    todayTask {
      id
      title
      comment
      scheduledTaskTime
      created_at
      updated_at
    }
  }
`

export const GET_USER_COMMENT = gql`
  query GetUserComment {
    userComment {
      id
      comment
      created_at
    }
  }
`
export const CREATE_USER_COMMENT = gql`
  mutation CreateUserComment {
    insert_userComment_one(object: { comment: $comment }) {
      id
      comment
      created_at
    }
  }
`
