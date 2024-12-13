import React, { useState } from "react";
import { LoginAPI, RegisterAPI } from "../Api/AuthApi";
import "../Sass/LoginComponent.scss";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify';
function RegisterComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Registration successful",{
        onClose: ()=> navigate('/')
      });
    } catch (err) {
      toast.error("Error occur, enter unique input")
    }
  };
  return (
    <div className="container-fluid pt-5 px-3 px-md-5">
      <div className="text-center">
        <h5 className="fs-1 display-5">
          Make the most of your professional life
        </h5>
      </div>
      <div className="row justify-content-center mt-3 px-md-5 px-2">
        <div className="col-md-6 d-flex flex-column px-md-5 rounded shadow px-3 py-5">
          <input
            type="email"
            className="mb-3 form-control mx-md-auto"
            placeholder="Enter Email Address"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            type="password"
            className="mb-3 form-control mx-md-auto"
            placeholder="Enter Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button
            className="btn btn-primary mb-2 fw-semibold rounded-pill"
            onClick={login}
          >
            Agree & Join
          </button>
          <hr className="hr-text" data-content="OR" />
          <GoogleButton className="mx-auto"
            onClick={() => {
              console.log("Google button clicked");
            }}
          />
          <p className="ms-3 mt-1 mx-md-auto">
            Already on Linkedin
            <Link to="/" className="fw-semibold fs-6 ms-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
