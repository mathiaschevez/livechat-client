import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  transports: ['websocket'],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log('user connected');
});

socket.on("connect_error", (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);

  // some additional description, for example the status code of the initial HTTP response
  // console.log(err.description);

  // some additional context, for example the XMLHttpRequest object
  // console.log(err.context);
});

export default socket;