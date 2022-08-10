import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import cardstyle from "./cardcar.modules.scss"

export default function ImgMediaCard({car}) {
  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image="/images/car.jpg"
      />
            <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ul className ={cardstyle.data}>
            <li> Год выпуска: { car.year }</li>
            <li>Мощность: { car.power }</li>
            <li>КПП: { car.gear }</li>
            <li>ОбЪем двигателя: { car.engine }</li>
            <li>Салон: { car.seats }</li>
          </ul>
        </Typography>
      </CardContent>
      <CardActions>        
        <Link to="/car/:id">Подробнее</Link>
      </CardActions>
    </Card>
  );
}
