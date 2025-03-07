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
    setNewMessage('');
    socket.emit('chatMessage', message);
  }

  useEffect(() => {
    // Listen for real-time messages
    socket.on("chatMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [dispatch]);

  return (
    <div className='flex flex-col w-full gap-6'>
      <div className='text-2xl font-bold'>Live Chat</div>
      {messages === null ? "Loading" : <div className='flex flex-col gap-6 w-full'>
        <div className='flex gap-3 w-full'>
          <input
            className='border border-black dark:border-white flex-1 px-2'
            type='text'
            value={newMessage}
            onChange={e => setNewMessage(e.currentTarget.value)}
          />
          <button onClick={() => createMessage(newMessage)}>Send Message</button>
        </div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
}
