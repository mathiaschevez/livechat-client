import { useEffect, useState } from 'react'
import './App.css'
import socket from './util/socket';

export default function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('')

  console.log(messages)

  async function createMessage(message: string) {
    socket.emit('chat message', message);
  }

  useEffect(() => {
    // Listen for real-time messages
    socket.on("chat message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);



  return (
    <div>
      <h2>Live Chat</h2>
      <input type='text' value={newMessage} onChange={e => setNewMessage(e.currentTarget.value)}/>
      <button onClick={() => createMessage(newMessage)}>Send Message</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
