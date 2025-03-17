import { useEffect, useRef, useState } from 'react'
import './App.css'
import socket from './util/socket';
import { addMessage } from './redux/slices/messagesSlice';
import { useDispatch, useSelector } from './redux/store';
import { flushSync } from 'react-dom';

export default function App() {
  const messageListRef = useRef<HTMLUListElement>(null);
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.messages);

  const [newMessage, setNewMessage] = useState('')

  function scrollToLastMessage() {
    const lastChild = messageListRef.current?.lastElementChild;
    lastChild?.scrollIntoView({
      block: 'end',
      inline: 'nearest',
      behavior: 'smooth'
    })
  }

  async function createMessage(message: string) {
    if (message.length > 0) {
      setNewMessage('');
      socket.emit('chatMessage', message);
    } else return;
  }

  useEffect(() => {
    socket.on("chatMessage", (message) => {
      flushSync(() => dispatch(addMessage(message)));
      scrollToLastMessage();
    });

    return () => {
      socket.off("chatMessage");
    };
  }, [dispatch]);

  return (
    <div className='h-screen flex flex-col p-4 gap-2'>
      <div className='text-2xl font-bold text-center'>Live Chat</div>
      {messages === null ? ("Loading") : (
        <div className='flex-1 flex flex-col gap-2 min-h-0'>
          <ul ref={messageListRef} className='flex-1 overflow-y-auto flex flex-col gap-1 min-h-0'>
            {messages.map((msg, index) => (
              <li key={index} className='text-left font-bold'>
                {msg}
              </li>
            ))}
          </ul>
          <div className='flex gap-3 w-full'>
            <input
              className='border border-black dark:border-white flex-1 px-2'
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") createMessage(newMessage);
              }}
            />
            <button
              disabled={!(newMessage.length > 0)}
              onClick={() => createMessage(newMessage)}
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
