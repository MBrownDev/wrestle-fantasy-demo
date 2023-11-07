import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({username, setUsername, room , setRoom, socket}) => {
    const navigate = useNavigate();

    const joinRoom = () => {
        if (room !== "") {
          socket.emit('join_room', {username,room})
        }
        navigate('/draft', {replace: true})
    }

    const getUser = () => {
        console.log(username, ":", room)
    }

    return (
        <div>
            <input 
                placeholder='Room Number...' 
                onChange={(event) => {
                setRoom(event.target.value);
            }}/>
            <input 
                placeholder='Username...' 
                onChange={(event) => {
                    setUsername(event.target.value);
            }}/>
            <button onClick={joinRoom}>Join Room</button>
        </div>
    );
}

export default Login;