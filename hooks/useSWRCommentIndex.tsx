import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

type Data = {
  id: string
  comment: string
  user_id: string
}

export default function useSWRCommentIndex() {
  const key = `http://localhost:3001/api/v1/diaries/`
  const { data, error } = useSWR<Data, Error>(key)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data)
  return {
    comment: data.comment,
  }
}
