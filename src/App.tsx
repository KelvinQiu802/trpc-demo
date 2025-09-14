import './App.css'
import { trpc } from './trpc'

function App() {
  return <div>
    <button onClick={async () => {
      const user = await trpc.userCreate.mutate({ name: "123" })
      console.log("user created", user)
    }}>Create User</button>
    <button onClick={async () => {
      const users = await trpc.userList.query();
      console.log("users", users)
    }}>Get User</button>
  </div>
}

export default App
