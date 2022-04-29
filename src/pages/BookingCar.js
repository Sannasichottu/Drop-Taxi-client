/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsAction";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
// import { useParams } from "react-router-dom";
import {
  Divider,
  Box,
  Button,
  Checkbox,
  Dialog,
  CircularProgress,
  Typography,
  FormControlLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  // const { id } = useParams();
  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars]);
  // console.log(car);

  return car ? <BookCar car={car} /> : <CircularProgress color="inherit" />;
}

function BookCar({ car }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [value, setvalue] = useState([null, null]);
  const rent = car.rentPerHour;
  useEffect(() => {
    // console.log(totalHours, totalAmount, rent);
    setTotalAmount(totalHours * rent);
  }, [driver, totalHours, rent]);
  useEffect(() => {
    if (driver) return setTotalAmount(totalAmount + 30 * totalHours);
  }, [driver]);
  function selectTimeSlots(values) {
    setvalue(values);
    setFrom(moment(values[0]).format("MMM DD yyyy"));
    setTo(moment(values[1]).format("MMM DD yyyy"));
    // console.log(values[0], values[1]);
    // console.log(Math.abs(values[1] - values[0]) / 36e5);
    setTotalHours(Math.abs(values[1] - values[0]) / 36e5);
  }
  const onSubmit = () => {
    const reqObj = {
      user: user,
      car: car._id,
      totalHours: totalHours,
      totalAmount: totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
    setTimeout(() => {
      displayRazorpay();
    }, 500);
  };
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay sdk failed to load.Are you online");
      return;
    }

    const data1 = JSON.parse(localStorage.getItem("order"));
    const data = data1.data;
    // console.log(data1);
    const options = {
      key: "rzp_test_wt6S48PF3wQ702",
      amount: data.amount,
      currency: "INR",
      name: "Drop Taxi",
      description: "Booking Transaction",
      image:
        "https://image.shutterstock.com/z/stock-vector-king-car-logo-design-template-vector-illustration-466912277.jpg",
      order_id: data.id,
      prefill: {
        name: username,
        contact: user.phoneno,
        email: user.email,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <section className="carpage">
      <div className="carinfo">
        <div>
          <img src={car.image} alt={car.name} className="carimage" />
        </div>
        <div className="info">
          {/* <Divider type="horizontal">Car Info</Divider> */}
          <Typography variant="h5">
            <b>Car Info</b>
          </Typography>
          <div style={{ textAlign: "center" }}>
            <h6>
              <b>{car.name}</b>
            </h6>
            <h6>
              ₹{car.rentPerHour} <b>Rent Per hour</b> /-
            </h6>
            <h6>
              <b>Fuel Type : </b>
              {car.fuelType}
            </h6>
            <h6>
              <b>Max Persons : </b>
              {car.capacity}
            </h6>
          </div>
        </div>
      </div>
      <br />
      <Divider type="horizontal" />
      <Typography variant="h5">Select Time Slots</Typography>
      <div className="centcont">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateRangePicker
            startText="start Date"
            value={value}
            onChange={selectTimeSlots}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <br />
        <Button
          className="btn1 mt-2"
          variant="outlined"
          onClick={() => {
            setShowModal(true);
          }}
        >
          See Booked Slots
        </Button>
      </div>
      {from && to && (
        <div>
          <p>
            Total Hours : <b>{totalHours}</b>
          </p>
          <p>
            Rent Per Hour : <b>{car.rentPerHour}</b>
          </p>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              />
            }
            label="Driver Required"
          />

          {/* <label></label> */}

          <h3>Total Amount : {totalAmount}</h3>
          <Button variant="outlined" onClick={() => onSubmit()}>
            Book Now
          </Button>
        </div>
      )}

      {car.name && (
        <Dialog open={showModal} title="Booked time slots">
          <div className="p-2">
            {car.bookedTimeSlots.length > 0 &&
              car.bookedTimeSlots.map((slot) => {
                return (
                  <Button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </Button>
                );
              })}
            {car.bookedTimeSlots.length === 0 ? (
              <h6>Car is not booked yet</h6>
            ) : (
              ""
            )}

            <div className="text-right mt-5">
              <Button
                className="btn1"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                CLOSE
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </section>
  );
}

export default BookingCar;
