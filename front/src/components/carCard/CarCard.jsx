import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import style from "./style.module.css"

export default function CarCard({car}) {
  
  return (
    <Card sx={{ maxWidth: 345 }} className= {style.card}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image="/images/car.jpg"
      />
            <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {car.brand} {car.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <ul className ={style.data}>
            <li> Год выпуска: { car.year }</li>
            <li>Мощность: { car.power }</li>
            <li>КПП: { car.gear }</li>
            <li>ОбЪем двигателя: { car.engine }</li>
            <li>Салон: { car.seats }</li>
            <li>Стоимость: { car.price } р/сут.</li>
          </ul>
        </Typography>
      </CardContent>
      <CardActions>        
        <Button size="small">Подробнее</Button>
        <Button size="small">Забронировать</Button>
      </CardActions>
    </Card>
  );
}
