import React, { useEffect, useState } from "react";
import Axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../Styling/location.css";
import { useNavigate } from "react-router-dom";

const AddLocation = () => {
  const [zipcode, setZipcode] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3000/location";
  const locationSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${url}/create`, {
      zipcode: zipcode,
      city: city,
      state: state,
    }).then((response) => {
      setZipcode("");
      setcity("");
      setstate("");
    });
  };

  const returnHome = (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <>
      <form onSubmit={locationSubmit}>
      <h2>Add Location</h2>
        <div className="form-group">
          <label htmlFor="zipcode" className="label">
            Zipcode
          </label>
          <input
            type="text"
            className="input"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter the zipcode"
            id="zipcode"
            name="zipcode"
          />

          <label htmlFor="city" className="label">
            City
          </label>
          <input
            type="text"
            className="input"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            placeholder="Enter the city"
            id="city"
            name="city"
          />

          <label htmlFor="state" className="label">
            State
          </label>
          <input
            type="text"
            className="input"
            value={state}
            onChange={(e) => setstate(e.target.value)}
            placeholder="Enter the state"
            id="state"
            name="state"
          />

          <button type="submit" className="button">
            Add the location
          </button>
          <button type="butoon" onClick={returnHome} className="button">
            Return Home
          </button>
        </div>
      </form>
    </>
  );
};

export default AddLocation;