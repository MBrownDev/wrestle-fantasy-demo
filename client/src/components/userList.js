import * as React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const UserList = ({name, champion, brand, company}) => {
    return(
    <div style={{display: 'flex',flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Card sx={{ maxWidth: 350 }}>
            <CardMedia
                sx={{ height: 140 }}
                image='http://via.placeholder.com/350x140.png'
                title="green iguana"
            />
            <CardContent>
                <div style={{display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <div style={{width: 60}}>
                        <img src='http://via.placeholder.com/60x60.png' alt=''width='60px' height='60px'/>
                    </div>
                    <div>
                        <Typography variant="h5" component="div">
                        {name}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" color="text.secondary">
                            {champion}
                        </Typography>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Typography variant="body1" component="inline" color="text.secondary" style={{width: '50vw'}}>
                        Brand: {brand}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" style={{width: '50vw'}}>
                    Company: {company}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    </div>
    )
}

export default UserList;