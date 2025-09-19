import './App.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
]

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function App() {
  const postQuery = useQuery({
    queryKey: ['posts'], // unique key
    queryFn: () => wait(1000).then(() => [...POSTS])
  })

  if (postQuery.isLoading) return <h1>Loading...</h1>
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>

  return <div>
    {postQuery.data?.map(post => {
      return <div key={post.id}>{post.title}</div>
    })}
  </div>
}

export default App
