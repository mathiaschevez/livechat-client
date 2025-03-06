import { useEffect, useState } from 'react'
import './App.css'
import socket from './util/socket';
import { addMessage } from './redux/slices/messagesSlice';
import { useDispatch, useSelector } from './redux/store';

export default function App() {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.messages);

  const [newMessage, setNewMessage] = useState('')

  async function createMessage(message: string) {
    socket.emit('chat message', message);
  }

  useEffect(() => {
    // Listen for real-time messages
    socket.on("chat message", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("chat message");
    };
  }, [dispatch]);

  return (
    <div>
      <h2>Live Chat</h2>
      {messages === null ? "Loading" : <div>
        <input type='text' value={newMessage} onChange={e => setNewMessage(e.currentTarget.value)}/>
        <button onClick={() => createMessage(newMessage)}>Send Message</button>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
}
