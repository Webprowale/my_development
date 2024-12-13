import React, { useState } from "react";
import { LoginAPI, GoogleSignAPI } from "../Api/AuthApi";
import "../Sass/LoginComponent.scss";
import Linkedin from "../assets/linkedin.png";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const login = async (credentials) => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      console.log(credentials)
      toast.success("Signed In to Linkdin!",{
        onclose:()=> navigate("/home")
      });
    } catch (err) {
      toast.error("Please check your credentials");
    }
  };
   const signInWithGoogle = ()=>{
  let res =  GoogleSignAPI();
  console.log(res);
   }

  return (
    <div className="container-fluid pt-5 px-3 px-md-5">
      <img src={Linkedin} width={200} height={45} />
      <div className="d-flex align-items-center justify-content-center mt-5 ">
        <div className="shadow rounded pt-3 d-flex flex-column px-4 py-5">
          <h3 className="fs-4 fw-semibold">Sign in</h3>
          <p className="fs-6 mb-3 mb-md-4">
            Stay updated on your professional world
          </p>
          <input
            type="email"
            className="mb-3 form-control"
            placeholder="Enter Email Address"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <input
            type="password"
            className="mb-1 form-control"
            placeholder="Enter Password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Link to="/" className="fw-semibold fs-6 mb-3">
            Forgoten password?
          </Link>
          <button
            className="btn btn-primary mb-2 fw-semibold rounded-pill"
            onClick={login}
          >
            Sign in
          </button>
          <hr className="hr-text" data-content="OR" />
          <GoogleButton className="mx-md-auto"
            onClick={signInWithGoogle}
          />
           <p className="mx-md-auto ">
            New to Linkedin
            <Link to="/signup" className="fw-semibold fs-6 ms-1">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
