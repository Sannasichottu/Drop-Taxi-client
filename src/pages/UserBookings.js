import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import moment from "moment";
import { Typography, Card } from "@mui/material";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  });

  return bookings.length > 0 ? (
    <section>
      <Typography variant="h3" className="text-center mt-2">
        My Bookings
      </Typography>
      <div className="bodycontent1">
        {bookings
          .filter((o) => o.user === user._id)
          .map((booking) => {
            return (
              <Card
                key={booking._id}
                sx={{ maxWidth: 250, margin: "10px", borderRadius: "10px" }}
              >
                <div
                  style={{ borderRadius: 5, overflow: "hidden" }}
                  className="imgbook"
                >
                  <img
                    src={booking.car.image}
                    height="140"
                    width="100%"
                    alt={booking.car.name}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="p">
                    <b>{booking.car.name}</b>
                  </Typography>
                  <Typography variant="p">
                    Total hours : <b>{booking.totalHours}</b>
                  </Typography>
                  <Typography variant="p">
                    Rent per hour : <b>{booking.car.rentPerHour}</b>
                  </Typography>
                  <Typography variant="p">
                    Total amount : <b>{booking.totalAmount}</b>
                  </Typography>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <Typography variant="p">
                    Transaction Id : <b>{booking.transactionId}</b>
                  </Typography> */}
                  <Typography variant="p">
                    From: <b>{booking.bookedTimeSlots.from}</b>
                  </Typography>
                  <Typography variant="p">
                    To: <b>{booking.bookedTimeSlots.to}</b>
                  </Typography>
                  <Typography variant="p">
                    Date of booking:{" "}
                    <b>{moment(booking.createdAt).format("MMM DD yyyy")}</b>
                  </Typography>
                </div>
              </Card>
            );
          })}
      </div>
    </section>
  ) : (
    <div>
      <h1> No booking history.Start booking....</h1>
    </div>
  );
}

export default UserBookings;
