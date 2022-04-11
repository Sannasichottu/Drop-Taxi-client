import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import BookingCar from "./pages/BookingCar.js";
import Forgotpassword from "./pages/Forgotpassword.js";
import Resetpassword from "./pages/Resetpassword.js";
import Navbar from "./components/Navbar.js";
import Paper from "@mui/material/Paper";
import UserBookings from "./pages/UserBookings";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgotpassword" exact component={Forgotpassword} />
        <Route
          path="/resetpassword/:userId/:token"
          exact
          component={Resetpassword}
        />
        <>
          <Paper
            elevation={0}
            style={{ borderStyle: "none", minHeight: "100vh" }}
          >
            <Navbar />
            <Route path="/home" exact component={Home} />
            <Route path='/booking/:carid' exact component={BookingCar} />
            <Route path="/userbookings" exact component={UserBookings} />
          </Paper>
        </>
      </Switch>
    </div>
  );
}

export default App;
