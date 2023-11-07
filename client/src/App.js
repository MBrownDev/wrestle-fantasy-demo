import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Test from './tester';

const socket = io.connect("http://localhost:3001")

function App() {
  //Username state
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("")

  //Room state
  const [room, setRoom] = useState("")

  //Messages states
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("")

  //turn test
  const [test, setTest] = useState(true);

  const joinRoom = () => {
    if (room !== "") {
      socket.emit('join_room', room)
    }
  }

  const sendMessage = () => {
      socket.emit("send_message", {message, room, test})
      setTest(false)
  }

  useEffect(() => {
    console.log(socket.id)
    socket.on("receive_users", (data) => {
      console.log(data.room)
      //setMessageReceived(data.message)
      //setTest(data.test)
    })
  },[socket])
  
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route
          path='/'
          element={<Login 
                    username={username} 
                    setUsername={setUsername}
                    room={room}
                    setRoom={setRoom}
                    socket={socket}
                    />}
        />
        <Route 
          path='/draft'
          element={
            <Test socket={socket} room={room}/>
          }/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
