import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const history = useHistory();
  const { cars } = useSelector((state) => state.carsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllCars());
  });
  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  if (!user) {
    history.push("/");
  }
  return (
    <section className="bodycontent">
      {totalCars ? (
        totalCars.map((car) => {
          return (
            <Card
              key={car._id}
              sx={{
                maxWidth: "350px",
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={car.image}
                alt={car.name}
                sx={{ borderRadius: "10px", overflow: "hidden" }}
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {car.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Rent Per Hour</b>:{car.rentPerHour}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => history.push(`/booking/${car._id}`)}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          );
        })
      ) : (
        <CircularProgress color="inherit" />
      )}
    </section>
  );
}

export default Home;
