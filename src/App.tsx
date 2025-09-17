import './App.css'
import { trpc } from './trpc'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => trpc.userList.query(),
  })

  const { mutate } = useMutation({
    mutationFn: (name: string) => trpc.userCreate.mutate({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }) // 自动重新请求数据
    }
  })

  const { data: sayHiData } = useQuery({
    queryKey: ['sayHi'],
    queryFn: () => trpc.sayHi.query(),
  })

  const { mutate: logToServer, data: logToServerData } = useMutation({
    mutationFn: (message: string) => trpc.logToServer.mutate(message),
  })

  const { data: userData } = useQuery({
    queryKey: ['getSecret'],
    queryFn: () => trpc.getSecret.query()
  })

  if (isLoading) return <div>Loading...</div>

  return <div>
    {data?.map((user) => (
      <div key={user.id}>{user.name}</div>
    ))}
    <button onClick={() => mutate(Date.now().toString())}>Create User</button>

    {sayHiData}

    <button onClick={() => logToServer('Hello from client')}>Log to server</button>

    <hr />

    {logToServerData}

    <hr />

    {userData}
  </div>
}

export default App
