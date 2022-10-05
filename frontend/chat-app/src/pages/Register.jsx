import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import useInput from "../hooks/use-input";
import PasswordRequisite from "../PasswordRequisite";

const Register = () => {
  const [pwdRequisite, setPwdRequisite] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const validatePassword = (value) => {
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);

    if (capsLetterCheck && numberCheck && pwdLengthCheck && specialCharCheck) {
      return true;
    }

    return false;
  };
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: passwordChangeHandler,
    reset: resetPasswordInput,
  } = useInput((value) => validatePassword(value));

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordInputHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput,
  } = useInput((value) => {
    if (value !== "" && enteredPassword !== "" && value === enteredPassword) {
      return true;
    }
  });

  const handleOnKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };

  const passwordFocusHandler = (event) => {
    setPwdRequisite(true);
  };

  const passwordBlurHandler = (event) => {
    setPwdRequisite(false);
  };

  let formIsValid = false;

  if (
    enteredUsernameIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !enteredUsernameIsValid &&
      !enteredEmailIsValid &&
      !enteredPasswordIsValid &&
      enteredConfirmPasswordIsValid
    ) {
      return;
    }
    alert("form");
    resetUsernameInput();
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };
  return (
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
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <Paragraph color="red">
            Email must include @ and not be empty
          </Paragraph>
        )}
        {enteredEmailIsValid && (
          <Paragraph color="green">Looks good!</Paragraph>
        )}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          onFocus={passwordFocusHandler}
          value={enteredPassword}
          onKeyUp={handleOnKeyUp}
        />
        {pwdRequisite && !enteredPasswordIsValid ? (
          <PasswordRequisite
            capsLetterFlag={checks.capsLetterCheck ? "green" : "red"}
            numberFlag={checks.numberCheck ? "green" : "red"}
            pwdLengthFlag={checks.pwdLengthCheck ? "green" : "red"}
            specialCharFlag={checks.specialCharCheck ? "green" : "red"}
          />
        ) : null}
        {enteredPasswordIsValid && (
          <Paragraph color="green">Looks good!</Paragraph>
        )}
        <input
          type="Password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={confirmPasswordChangeHandler}
          onFocus={confirmPasswordBlurHandler}
          value={enteredConfirmPassword}
        />
        {confirmPasswordInputHasError && (
          <Paragraph color="red">Password does not match!</Paragraph>
        )}
        {enteredConfirmPasswordIsValid && (
          <Paragraph color="green">Passwords match!</Paragraph>
        )}
        <button disabled={!formIsValid} type="submit">
          Sign Up
        </button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </FormContainer>
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

export default Register;
