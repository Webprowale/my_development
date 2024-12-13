import React from "react";
import Navbar from "./Navbar";
import her0 from "../assets/her00.png";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="container-fluid hero pt-3">
      <Navbar />
      <div className="row mt-md-5  heroRow">
        <div className="col-md-6 pt-5">
          <div className="d-flex flex-column pt-3 ps-md-5">
            <h3 className=" text-white  her0Bold">Send Secret</h3>
            <h3 className=" text-white  her0Bold">Anonymous Messages </h3>
            <h3 className=" text-white  her0Bold">Online</h3>
          </div>
          <p className=" text-white ps-md-5 ">
            Robonymous is an interactive anonymous messaging app with a dare
            game. Create your Profile Link and Send it to all your contacts to
            check what do your friends think about you. With the help of Kubool,
            you can send and recieve anonymous compliments easily for free!
          </p>
          <button className="hBtn ms-md-5 mb-5 fw-bold"><Link to='/register'>Get Started</Link></button>
        </div>
        <div className="col-md-6">
          <img src={her0} alt="" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
