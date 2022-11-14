import { GetServerSideProps } from "next"
import { CarModel } from "../../../../api/Car";
import { openDB } from "../../../openDB";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


interface CarDetailProps{
    car: CarModel | null | undefined;
}

const Img = styled('img')({
    width: '100%'
  });

export default function CarDetails( {car} : CarDetailProps){
    if(!car){
        return <h1>Not found,</h1>
    }
    return (
        <Paper key={car.id}
          sx={{
            p: 2,
            margin: 'auto',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container  spacing={2} >
            <Grid  item xs={12} sm={6} md={5}>
                <Img alt="complex" src={car.photoUrl}/>
              
            </Grid>
            <Grid item xs={12}  container sm={6} md={7}>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5" component="div">
                    {car.make+' ' +car.model}
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                    $ {car.price}
                  </Typography>
                  <Typography  variant="body2" gutterBottom>
                   Year: {car.year}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    KM: {car.kilometers}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    Fuel: {car.fuelType}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="text.secondary">
                    Details: {car.details}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      );
}

export const getServerSideProps: GetServerSideProps = async (context)=>{
    const id=context.params.id;
    const db= await openDB();
    const car=await db.get<CarModel | undefined>(`SELECT * FROM CAR WHERE id= ${id}`);
    return{
        props:{
            car: car || null,
        },
    }
}