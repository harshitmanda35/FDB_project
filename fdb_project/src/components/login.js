import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styling/login.css";


const Login = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("admin_id", response.data.admin_id);
        localStorage.setItem("isAdmin", true);
        navigate("/department");
        window.location.reload();
      } else {
        console.log("user dashboard");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("isAdmin", false);
        alert("user logged in ")
        navigate("/hotels");
        window.location.reload();
      }
    });
  };

  return (
    <div className="h-screen w-full bg-gray-100">

      <div className="text-4xl pt-8">
        <span className="">Hotel Management System</span>
      </div>

      <div className="w-11/12 sm:w-2/6 m-auto flex flex-col items-center">
        <h2 className="text-3xl my-5 font-bold">Login</h2>
        <form className="login-form border rounded m-auto bg-white p-8" onSubmit={loginSubmit}>
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
          <div className="mt-4">
            <button type="submit" className="btn bg-green-600 py-2 px-4 text-white rounded">
              Log In
            </button>
            <p className="mt-2">
              new user?
              <Link to="/register" className="link ml-2 underline">
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