import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
function Login() {
  return (
    <div className="container-fluid hero login">
      <div className=" mx-auto formBody">
        <div className="text-center">
        <span className="fs-1 text-black"><Link to="/">🧸</Link></span>
        <h2 className="fw-bold  fs-2 fText">Member Login</h2>
        <p className="mb-5 fw-semibold">
          Recieve anonymous compliments from your friends and send
          anonymous messages to your friends for free.
        </p>
        </div>
        <form>
          <div class="mb-3 inputBody  ps-3 mx-auto">
            <span>
              <FontAwesomeIcon icon={faUser} size="2xl" color="#C33764" />
            </span>
            <input
              type="text"
              class=""
              placeholder=" Enter Username"
              name="username"
            />
          </div>

          <div class=" mb-3 inputBody  ps-3 mx-auto">
            <span>
              <FontAwesomeIcon icon={faLock} size="2xl" color="#C33764" />
            </span>
            <input type="password" class="" placeholder="Enter Password" name="password" />
          </div>
          <button className="formBtn hero text-white px-5 py-2 rounded-pill w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
