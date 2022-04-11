import axios from "axios";
import { API_URL } from "../../globalconstant.js";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/home";
    }, 500);
  } catch (error) {
    console.log(error);
    window.alert(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(`${API_URL}/api/users/register`, reqObj);
    console.log(response);
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  } catch (error) {
    console.log(error);
    window.alert("Email already exist");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userForgotpass = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(
      `${API_URL}/api/users/forgotpassword`,
      reqObj
    );
    console.log(response);
    window.alert("Verification link sent to the registered email");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } catch (error) {
    console.log(error);
    window.alert(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userResetpass = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  const { userId, token } = reqObj;
  try {
    const response = await axios.post(
      `${API_URL}/api/users/password-reset/${userId}/${token}`,
      reqObj
    );
    console.log(response);
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  } catch (error) {
    console.log(error);
    window.alert(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
