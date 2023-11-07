import React, { useState, useEffect } from "react";
import List from '@mui/material/List'
import Axios from 'axios';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import Grid from '@mui/material/Grid'
import txt from "./test.json";
import gen from "./gencode.json";
import "./list.css"

import LI from './ListItem';
import io from 'socket.io-client';

//const socket = io.connect("http://localhost:3001")

const App = ({socket, room, username}) => {
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [count, setCount] = useState(0);
  
  const [champ, setChamp] = useState([])
  const [tag, setTag] = useState([])

  console.log(username)
  function handleRemove(id, item) {
    console.log(id)
    setUserList([...userList, item]);
    //setList(newList);
    socket.emit('update_list', id);
  }
  function checkLength() {
    setCount(list.length);
    localStorage.setItem('length', JSON.stringify(list.length))
    console.log(list.length)//, list);
    console.log(JSON.parse(localStorage.getItem('length')))
    //socket.emit('update_list', list)
  }

  function filterList(data){
    var champion = data.filter((champ) => champ.championship !== "")
    var tags = data.filter((tag) => tag.tag === true)
    setChamp(champion)
    setTag(tags)
    console.log(champion)
    console.log(tags)
  }
  function loadList(){
    console.log(`load`);
    //socket.emit('set_list', gen)
  }
  useEffect(() => {
    setTimeout(
     loadList
    ,2000)

    Axios.get("http://localhost:3001/getUsers").then((response)=> {
        console.log(response.data)
      socket.emit('set_list',response.data);
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
    
    socket.on('receive_list', (data) => {
        setList(data)
        filterList(data)
    })
  },[socket])

  function LogOutScreen(){
    return <div><h1>Please Log In</h1></div>
  }

  function LogInScreen() {
    return (
        <div>
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
        <List className="list1" sx={{ width: "100%", maxWidth: '100vw',bgcolor: "background.paper", margin: 0, border:'1px solid black' }}>
          <Lists list={list} onRemove={handleRemove} />
        </List>
            </Grid>
        <Grid item xs={6} md={4}>
          <div className="list-window">
            <div className="list-body">
                <div className="item-container">
                {userList.map((item) => (
                    <ul>
                        <li className="item-content" key={item.id}>{item.name}</li>
                    </ul>
                ))}
                </div>
            </div>
          </div>
          </Grid>
        </Grid>
          <button onClick={checkLength}> Status </button>
          <h2 data-testid='count'>{count}</h2>
          <LI />
        </div>
      );
  }

  return (
    <div style={{width: '66vw', margin: 'auto'}}>
        <Grid container spacing={0.5}>
            <Grid item xs={6} md={8}>
        <List className="list1" sx={{ width: "100%", maxWidth: '100vw',bgcolor: "background.paper", margin: 0, border:'1px solid black' }}>
          <Lists list={list} onRemove={handleRemove} />
        </List>
            </Grid>
        <Grid item xs={6} md={4}>
          <div className="list-window">
            <div className="list-body">
                <div className="item-container">
                {userList.map((item) => (
                    <ul>
                        <li className="item-content" key={item.id}>{item.name}</li>
                    </ul>
                ))}
                </div>
            </div>
          </div>
          </Grid>
        </Grid>
          <button onClick={checkLength}> Status </button>
          <h2 data-testid='count'>{count}</h2>
          <LI champ={champ} tag={tag}/>
    </div>
  );
};

const Lists = ({ list, onRemove }) => (
  <ul className="list2">
    {list.map((item) => (
      <Item key={item.id} item={item} onRemove={onRemove} />
    ))}
  </ul>
);

const Item = ({ item, onRemove }) => (
    <ListItem onClick={() => onRemove(item._id, item)} sx={{border: '1px solid black', borderRadius: '10px', margin: '5px'}}>
        <ListItemAvatar>
          <Avatar>
            <img src="http://via.placeholder.com/25x25.png" alt='' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} secondary={item.championship} />
        <ListItemText primary={item.brand} />
        <ListItemText sx={{display: 'flex', flexDirection:'column' ,justifyContent:'flex-end'}} primary={item.division} secondary={item.company} />
    </ListItem>
);

export default App;
