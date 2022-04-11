import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { InputAdornment, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        phoneno: "",
        address: "",
        password: "",
      },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        dispatch(userRegister(values));
        // console.log(values);
      },
    });
  const [text, setText] = useState("Show");
  const [visible, setVisible] = useState("password");
  const icon =
    visible === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />;
  const visibility = () => {
    setVisible((visible) => (visible === "password" ? "text" : "password"));
    setText((text) => (text === "Show" ? "Hide" : "Show"));
  };
  return (
    <div className="registerpage">
      <div className="brand">
        <Typography
          sx={{
            fontSize: { xs: "50px", sm: "60px" },
            fontFamily: "Aladin",
            fontWeight: "bold",
            color: "#fff",
          }}
          variant="h1"
        >
          Car Corner
        </Typography>
      </div>
      <div className="formcontainer">
        <form onSubmit={handleSubmit}>
          <div>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Roboto Condensed",
                fontSize: { sm: "35px", xs: "28px" },
              }}
            >
              Register Here
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.username && touched.username}
              value={values.username}
              helperText={
                errors.username && touched.username && errors.username
              }
              name="username"
              id="username"
              label="userName"
              placeholder="Enter the userName"
              fullWidth
              sx={{ margin: "5px" }}
            />
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email && touched.email}
              value={values.email}
              helperText={errors.email && touched.email && errors.email}
              name="email"
              id="email"
              label="Email"
              placeholder="Enter Email"
              fullWidth
              sx={{ margin: "5px" }}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneno}
              error={errors.phoneno && touched.phoneno}
              helperText={errors.phoneno && touched.phoneno && errors.phoneno}
              name="phoneno"
              margin="dense"
              id="phoneno"
              label="Phone No"
              variant="outlined"
              placeholder="Enter your phone no"
              fullWidth
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              error={errors.address && touched.address}
              helperText={errors.address && touched.address && errors.address}
              name="address"
              margin="dense"
              id="address"
              label="Contact Address"
              variant="outlined"
              placeholder="Enter your Address"
              fullWidth
            />
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password && touched.password}
              value={values.password}
              helperText={
                errors.password && touched.password && errors.password
              }
              name="password"
              id="password"
              label="password"
              type={visible}
              placeholder="Enter the password"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={text}>
                      <IconButton onClick={() => visibility()}>
                        {icon}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              sx={{ margin: "5px" }}
            />
            <Button type="submit" variant="contained" color="success">
              Register
            </Button>
          </div>
          <div style={{ margin: "5px" }}>
            <label className="account">Already have an Account?</label>
            <Button
              color="success"
              variant="text"
              onClick={() => history.push("/login")}
            >
              Log In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formvalidationSchema = Yup.object({
  username: Yup.string().required("Please enter your userName"),
  email: Yup.string()
    .email("Please enter the valid email")
    .required("please enter yor email"),
  password: Yup.string()
    .min(8, "Too short password")
    .required("please fill the password"),
  phoneno: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Why not fill this phone no 🤯")
    .min(8, "Please Enter the valid phone number")
    .max(10, "Please Enter the valid phone number"),
  address: Yup.string().max(250).required("Please fill the address"),
});
