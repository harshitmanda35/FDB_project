import React, { useState } from "react";
import Axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "../styling/login.css";


const Login = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const url = "http://localhost:3000/user";
  const loginSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${url}/login`, {
      name: name,
      password: password,
    }).then((response) => {
      console.log(response)
      if (response.data.message === "Admin logged in successfully") {
        console.log("admin dashbord");
        // secureLocalStorage.setItem("admin_id", response.data.admin_id);
        // navigate("/admin");
        window.location.reload();
      } else {
        // secureLocalStorage.setItem("user_id", response.data.user_id);
        console.log("user dashboard");
        alert("user logged in ")
        // navigate("/user");
        window.location.reload();
      }
    });
  };

  return (
    <div className="container">
      {/* <video autoPlay loop muted className="background-video">
        <source
          src="https://www.shutterstock.com/shutterstock/videos/1063863823/preview/stock-footage-cheerful-friends-having-fun-in-cinema-joyful-couple-laughing-in-movie-theater-happy-woman-and.webm"
          type="video/mp4"
        />
      </video> */}
      <div className="background-text">
        <span className="animated-letter">Hotel Management System</span>
        {/* <span className="animated-letter">M</span>ix */}
      </div>
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your username"
            id="username"
            name="username"
          />

          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="your password"
            id="password"
            name="password"
          />
          <div className="button-container">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
            <p>
              new user?
              <Link to="/register" className="link">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;