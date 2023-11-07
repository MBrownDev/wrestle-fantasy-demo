import React, {useEffect, useState} from "react";
import Grid from '@mui/material/Grid'
import List from "@mui/material/List"
import Axios from 'axios'
import { Divider, ListItemText, ListItemAvatar, Avatar, Typography } from "@mui/material";

import UserList from "./components/userList"
import CoreDemo from "./components/coreDemo"

import './list.css'

const Tester = ({socket, room}) => {
    const [roomId, setRoomId] = useState("");

    const [wList, setList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [userCount, setCount] = useState([]);

    const [men, setMen] = useState([])
    const [women, setWomen] = useState([])
    const [champ, setChamp] = useState([])
    const [tag, setTag] = useState([])

    function filterList(data){
        var champion = data.filter((champ) => champ.championship !== "")
        var male = data.filter((men) => men.division === "Men")
        var female = data.filter((women) => women.division === "Women")
        var tags = data.filter((tag) => tag.tag === true)
        setMen(male)
        setWomen(female)
        setChamp(champion)
        setTag(tags)
        console.log(champion)
        console.log(tags)
        console.log(userCount)
    }

    //emitts id of list item to be removed to socket.
    function handleRemove(id, item) {
        console.log(id)
        setUserList([...userList, item]);
        //setList(newList);
        socket.emit('update_list', {id, room});
    }

    useEffect(() => {
        //receives username & room emitted from socket.
        socket.on('receive_users', (data) => {
            console.log(data.username,' ', data.room)
            setCount((userCounts) => [...userCounts, data.username])
            setRoomId(data.room);
        })

        //pull list of wrestlers from database
        Axios.get("http://localhost:3001/getUsers").then((response)=> {
            console.log(response.data)
            var list = response.data;
            console.log(room)
        socket.emit('set_list', {list, room});
        });

        Axios.get("http://localhost:3001/getChampions").then((response) => {
            console.log(response)
        })
        
        function fetchTesst() {
            fetch("http://localhost:3001/api")
                .then((res) => res.json())
                .then((data) => setList(data))
                .catch((err) => console.error(err))
        }
        //fetchTesst();
        
        //receives current state of list emitted from socket
        socket.on('receive_list', (data) => {
            console.log(data)
            setList(data)
            filterList(data)
        })

    },[socket])

    return(
        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid item md={2} sx={{border: '1px solid black'}}>
                {
                    userCount.map((users) => {
                        return(
                            <ul>
                                <li>{users}</li>
                            </ul>
                        )
                    })
                }
            </Grid>
            <Grid item md={7} sx={{border: '1px solid red', display: 'flex', justifyContent: 'center', paddingTop: '25px'}}>
                <div style={{display:'flex', width: '750px', height: '700px', border: '2px solid red', borderRadius: '25px', justifyContent: 'center'}}>
                    <div className="container2">
                        <h3>Men</h3>
                        <Divider />
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            {
                                men.map((list) => {
                                    return(
                                        <>
                                            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                                            <div onClick={() => handleRemove(list._id, list)} style={{ display: 'inline-flex', flexDirection: 'row', gap: 20, padding: 10, width: 600}}>
                                                <CoreDemo name={list.name} champion={list.championship} brand={list.brand} company={list.company}/>
                                            </div>
                                            <Divider variant="inset" component="li" />
                                            </List>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <h3>Women</h3>
                        <Divider />
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            {
                                women.map((list) => {
                                    return(
                                        <>
                                            <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                                            <div onClick={() => handleRemove(list._id, list)} style={{ display: 'inline-flex', flexDirection: 'row', gap: 20, padding: 10, width: 600}}>
                                                <CoreDemo name={list.name} champion={list.championship} brand={list.brand} company={list.company}/>
                                            </div>
                                            <Divider variant="inset" component="li" />
                                            </List>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <h3>Tag Teams</h3>
                        <Divider />
                        <div>
                        {
                            tag.map((list)=>{
                                return(
                                    <>
                                    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
                                    <div onClick={() => handleRemove(list._id, list)} style={{ display: 'inline-flex', flexDirection: 'row', gap: 20, padding: 10, width: 600}}>
                                        <Grid item md={3} >
                                            <ListItemAvatar>
                                            <Avatar sx={{margin: 'auto'}} alt="Remy Sharp" src="http://via.placeholder.com/25x25.png" />
                                            </ListItemAvatar>
                                        </Grid>
                                        <Grid item md={3}>
                                            <ListItemText 
                                                primary= {list.name}
                                                secondary={
                                                    <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body6"
                                                        color="text.primary"
                                                    >
                                                        {list.division}
                                                    </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <ListItemText
                                                sx={{display: 'flex', justifyContent: 'center'}} 
                                                primary= {list.brand}
                                            />
                                            </Grid>
                                            <Grid item md={3} sx={{display: 'flex',justifyContent: 'flex-end'}}>
                                            <ListItemText
                                                sx={{display: 'flex', justifyContent: 'flex-end'}} 
                                                primary= {list.company}
                                            />
                                        </Grid>
                                    </div>
                                    <Divider variant="inset" component="li" />
                                    </List>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item md={3} sx={{border: '1px solid blue'}}>
                <div className="list-window">
                    <div className="list-body">
                        <div className="item-container">
                        {userList.map((item) => (
                            <ul style={{width: '100%', padding: 0}}>
                                <UserList name={item.name} champion={item.championship} brand={item.brand} company={item.company}/>
                            </ul>
                        ))}
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Tester;