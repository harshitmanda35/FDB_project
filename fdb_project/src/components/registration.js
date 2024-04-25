import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../styling/registration.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const url = "http://localhost:3000/user";

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${url}/register`, {
      name: name,
      email: email,
      password: password,
      gender: gender,
      age: age,
    }).then((response) => {
      setUsername("");
      setEmail("");
      setPassword("");
      setGender("");
      setAge("");
      navigate("/");
      console.log(response);
    });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            id="username"
            name="username"
          />
        </div>
        <div className="">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            id="email"
            name="email"
          />
        </div>
        <div className="">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            id="password"
            name="password"
          />
        </div>
        <div className="">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className="form-control"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Your Gender"
            id="gender"
            name="gender"
          />
        </div>
        <div className="">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Your age"
            id="age"
            name="age"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;