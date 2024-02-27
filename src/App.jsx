import { useState, useRef } from 'react'
import './App.css'
import { Auth } from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'

const coockies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(coockies.get("auth-token"))
  const [room, setRoom] = useState(null)
  const roomInputRef = useRef(null)

  if (!isAuth) {
    return (
      <>
        <h1>Homepage</h1>
        <Auth setIsAuth={setIsAuth} />
      </>
    )
  }
  return (<div>
    {
      room
        ?
        <div>
          <Chat room={room} />
        </div>
        :
        <div>
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => { setRoom(roomInputRef.current.value) }}>Enter Chat</button>
        </div>
    }
  </div>)
}

export default App
