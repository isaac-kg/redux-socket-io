import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const SocketApp = () => {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("")
  const sendMessage = () => {
    //Emit is for pushing a message 
    socket.emit("send-message", message);
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessageReceived(data)
    })
  }, [socket]);

  return (
    <div>
      <input placeholder="Message...."  onChange={e => setMessage(e.target.value)}/>
      <button onClick={() => sendMessage()}>Send Message</button>
      <h3>Message</h3>
      <p>{messageReceived}</p>
    </div>
  );
}

export default SocketApp;
