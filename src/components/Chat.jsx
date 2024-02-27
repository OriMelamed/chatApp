import { useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

const Chat = ({ room }) => {
    const [newMessage, setNewMessage] = useState("")
    const messagesRef = collection(db, 'messages')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"))
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            let messages = []
            snapShot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            })
            setMessages(messages)
        })
        return () => unsubscribe()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newMessage === "") return
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        })
        setNewMessage('')
    }

    return (
        <div>
            <div>
                {messages.map(m => <div key={m.id} style={{ display: 'inline' }}>
                    <span><strong>{m.user}</strong></span>
                    <p >{m.text}</p>
                </div>)}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='type your message here..'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button>Send</button>
            </form>
        </div >
    )
}

export default Chat