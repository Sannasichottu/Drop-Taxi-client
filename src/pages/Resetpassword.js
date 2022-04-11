import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userResetpass } from "../redux/actions/userActions";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import { InputAdornment, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

function Resetpassword() {
  const userId = useParams().userId;
  const token = useParams().token;
  const dispatch = useDispatch();
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
        userId: userId,
        token: token,
      },
      validationSchema: formvalidationSchema,
      onSubmit: (values) => {
        dispatch(userResetpass(values));
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
    <div className="resetpage">
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
              Reset Password
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
            <TextField
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword && touched.confirmPassword}
              value={values.confirmPassword}
              helperText={
                errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword
              }
              name="confirmPassword"
              id="confirmPassword"
              label="confirm password"
              type={visible}
              placeholder="Enter confirm Password"
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
              Update password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resetpassword;

const formvalidationSchema = Yup.object({
  password: Yup.string().required("Required Field"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});
