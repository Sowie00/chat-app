import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import useInput from "../hooks/use-input";
import axios from "axios";
import { loginRoute } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!enteredUsernameIsValid && !enteredPasswordIsValid) {
      return;
    }

    const { data } = await axios.post(loginRoute, {
      username: enteredUsername,
      password: enteredPassword,
    });
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      navigate("/");
    }

    resetUsernameInput();
    resetPasswordInput();
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="" />
            <h1>C H A T</h1>
          </div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />
          {usernameInputHasError && (
            <Paragraph color="red">Username field cannot be empty</Paragraph>
          )}
          {enteredUsernameIsValid && (
            <Paragraph color="green">Looks good!</Paragraph>
          )}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <Paragraph color="red">Password field cannot be empty</Paragraph>
          )}
          {enteredPasswordIsValid && (
            <Paragraph color="green">Looks good!</Paragraph>
          )}
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000176;
    padding: 3rem 5rem;
    border-radius: 2rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid teal;
      border-radius: 0.4rem;
      color: white;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #09a2f4;
        outline: none;
        background-color: transparent;
      }
    }
    button {
      background-color: teal;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #591c85;
      }
    }
    span {
      color: white;
      a {
        color: #4e0eff;
        font-weight: bold;
        text-decoration: none;
      }
    }
  }
`;

const Paragraph = styled.div`
  color: ${(props) => props.color};
`;

export default Login;
