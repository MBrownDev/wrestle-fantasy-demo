import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const coreDemo = ({name, champion, brand, company}) => {
    return (
        <>
        <Card sx={{height: 100, width: 540, display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '25vw'}}>
        <CardMedia
            sx={{height: 100, width: 100}}
            image='http://via.placeholder.com/140x140.png'
            title="green iguana"
        />
        </div>
        <div style={{width: '80vw'}}>
            <CardContent sx={{padding: 1, width: '100%'}}>
                <Typography variant="h6" component="div" sx={{padding: 0}}>
                    {name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{paddingBottom: 0}}>
                    {champion}
                </Typography>
            </CardContent>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                <CardContent sx={{width: '15vw', padding: 0, paddingLeft: 1}}>
                    <Typography variant="body2" color="text.secondary" style={{display: 'inline-block'}}>
                        Brand: {brand}
                    </Typography>
                    
                </CardContent>
                <CardContent sx={{width: '15vw', padding: 0, paddingLeft: 1}}>
                    <Typography variant="body2" color="text.secondary" style={{}}>
                        Company: {company}
                    </Typography>
                </CardContent>
            </div>
        </div>
    </Card>
        </>
    );
}

export default coreDemo;
