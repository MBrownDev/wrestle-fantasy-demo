import React, {useState, useEffect} from "react";
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import { ListItemAvatar, Avatar, ListItemText, Typography, Divider } from "@mui/material";
import '../src/index.css'
import '../src/list.css'
import txt from './gencode.json'

const ListItem = () => {

    return(
        <div style={{height: '88px', width: '630px', display:'flex', flexDirection:'row' , border: '2px solid black', borderRadius:'10px'}}>
            <div style={{width: '25vw', display: 'flex', flexDirection:'column', alignItems:'center', alignContent:'center', justifyContent: 'center'}}>
                <div style={{position: 'relative', width: '70px', height: '70px', border: '1px solid #151515', borderRadius: '50%'}}>
                <img src="http://via.placeholder.com/25x25.png" alt='' width='100%' height='100%' style={{objectFit:'cover', borderRadius: '50%'}}/>
                </div>
            </div>
            <div style={{width:'25vw', display:'flex', flexDirection: 'column', margin:'auto'}}>
                <h3>Roman Reigns</h3>
                <h5 style={{margin:0}}>Universal</h5>
            </div>
            <div style={{width:'25vw', display:'flex', flexDirection: 'column', margin:'auto'}}>
                <h4>Smackdown</h4>
            </div>
            <div style={{width:'25vw', display:'flex', flexDirection: 'column', margin:'auto'}}>
                <h4>Avg Rating</h4>
                <h5 style={{margin:0}}>WWE</h5>
            </div>
        </div>
    );
}

const ListSquare = ({champ, tag}) => {
    console.log(JSON.parse(localStorage.getItem('length')),"H")
    return (
        <>
        <div>
            <Grid container spacing={2} className='list-square'>
                <Grid item xs={12} md={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{display: 'flex', flexDirection:'column', alignItems:'center', alignContent:'center', justifyContent: 'center'}}>
                        <div style={{position: 'relative', width: '60px', height: '60px', border: '1px solid #151515', borderRadius: '50%'}}>
                            <img src="http://via.placeholder.com/25x25.png" alt='' width='100%' height='100%' style={{objectFit:'cover', borderRadius: '50%'}}/>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div style={{display:'flex', flexDirection: 'column'}}>
                        <h3 style={{height: '10px'}}>Roman Reigns</h3>
                        <h5 style={{margin:0}}>Universal</h5>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div style={{display:'flex', flexDirection: 'column', margin:'auto'}}>
                        <h4>Smackdown</h4>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div style={{display:'flex', flexDirection: 'column', margin:'auto'}}>
                        <h4 style={{height:'10px'}}>Avg Rating</h4>
                        <h5 style={{margin:0}}>WWE</h5>
                    </div>
                </Grid>
            </Grid>
        </div>

        <div className="container">
        <h3>Men</h3>
        <Divider />
        <div>
        {
            champ.map((list)=>{
                return(
                    <>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <div style={{ display: 'inline-flex', flexDirection: 'row', gap: 20}}>
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="http://via.placeholder.com/25x25.png" />
                    </ListItemAvatar>
                    <ListItemText 
                        primary= {list.name}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {list.championship}
                            </Typography>
                            </React.Fragment>
                        }
                    />
                    <ListItemText
                        sx={{display: 'inline-block'}} 
                        primary= {list.brand}
                    />
                    </div>
                    <Divider variant="inset" component="li" />
                    </List>
                    </>
                )
            })}
        </div>
        <h3>Tag Teams</h3>
        <Divider />
        <div>
        {
            tag.map((list)=>{
                return(
                    <>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <div style={{ display: 'inline-flex', flexDirection: 'row'}}>
                    <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="http://via.placeholder.com/25x25.png" />
                    </ListItemAvatar>
                    <ListItemText 
                        primary= {list.name}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {list.division}
                            </Typography>
                            </React.Fragment>
                        }
                    />
                    </div>
                    <Divider variant="inset" component="li" />
                    </List>
                    </>
                )
            })}
        </div>
        </div>
        </>
    );
}
export default ListSquare;