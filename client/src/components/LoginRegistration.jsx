import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginRegistration() {
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const content = await axios.post('http://localhost:3001/user/register', {
        name: signupName,
        email: signupEmail,
        password: signupPassword
      });
      if(content.Success === true){
        alert("User register successfully!");
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
      }
      else{
        alert("User already registered!");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const content = await axios.post('http://localhost:3001/user/login', {
        email: loginEmail,
        password: loginPassword
      });

      if(content.Success ==  true){
        alert("Login Successfully!");
        setLoginEmail('');
        setLoginPassword('');
        navigate('/profile');
      }
      else{
        alert("Login Failed!");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  }

  const switchContent = () => {
    const content = document.getElementById("content");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      content.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      content.classList.remove("active");
    });
  };

  return (
    <div
      className="content justify-content-center align-items-center d-flex shadow-lg"
      id="content"
    >
      {/* Registration Form */}
      <div className="col-md-6 d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="header-text mb-4">
            <h1>Create Account</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              id="name"
              onChange={(event) => setSignupName(event.target.value)}
              value={signupName}
              placeholder="Name"
              className="form-control form-control-lg lg-light fs-6"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              id="email"
              onChange={(event) => setSignupEmail(event.target.value)}
              value={signupEmail}
              placeholder="Email"
              className="form-control form-control-lg lg-light fs-6"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              id="password"
              onChange={(event) => setSignupPassword(event.target.value)}
              value={signupPassword}
              placeholder="Password"
              className="form-control form-control-lg lg-light fs-6"
            />
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button
              type="submit"
              className="btn border-white text-white w-50 fs-6"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      {/*  Login Form */}
      <div className="col-md-6 right-box">
        <form onSubmit={loginHandleSubmit}>
          <div className="header-text mb-4">
            <h1>Sign In</h1>
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              className="form-control form-control-lg lg-light fs-6"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              className="form-control form-control-lg lg-light fs-6"
            />
          </div>
          <div className="input-group mb-5 d-flex justify-content-between">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" />
              <label
                htmlFor="formcheck"
                className="form-check-label text-secondary"
              >
                <small>Remember me</small>
              </label>
            </div>
            <div className="forget">
              <small>
                <a href="#">Forgot Password</a>
              </small>
            </div>
          </div>
          <div className="input-group mb-3 justify-content-center">
            <button type="submit" className="btn border-white text-white w-50 fs-6">
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Switch Panel */}
      <div className="switch-content">
        <div className="switch">
          <div className="switch-panel switch-left">
            <h1>Hello, Again</h1>
            <p>We are happy to see you back</p>
            <button
              className="hidden btn text-white w-50 fs-6"
              id="login"
              onClick={switchContent}
            >
              Login
            </button>
          </div>
          <div className="switch-panel switch-right">
            <h1>Welcome</h1>
            <p>Join our Unique Platform, Explore a new Experience</p>
            <button
              className="hidden btn text-white w-50 fs-6"
              id="register"
              onClick={switchContent}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegistration;
