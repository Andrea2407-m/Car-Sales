import { CarModel } from "../api/Car";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from "next/link";

export interface CarCardProps{
    car: CarModel;
}

export function CarCard( {car} : CarCardProps ){
    return (
        <Link
        href="/car/[make]/[brand]/[id]"
        as={`/car/${car.make}/${car.model}/${car.id}`}
        style={{textDecoration: 'none'}}
      >
        <Card sx={{ maxWidth: 345 }} >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={car.make+ ' '+ car.model}
            subheader={car.price}
          />
          <CardMedia
            component="img"
            height="194"
            image={car.photoUrl}
            alt={car.make+ ' '+ car.model}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {car.details}
            </Typography>
          </CardContent>
        </Card>
        </Link>
      );

}