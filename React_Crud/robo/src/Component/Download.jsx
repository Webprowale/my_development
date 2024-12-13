import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGooglePlay,faAmazon } from '@fortawesome/free-brands-svg-icons';
function Download() {
  return (
    <div className="container-fluid hero">
      <div className="text-md-center p-5">
        <h2 className="text-white fw-bold">Register To Robonymous!</h2>
        <p className="text-white fw-semibold mb-5">
          Robonymous is easy to use,  and fun to play with! Simply
          register to the website and get started with Robonymous now. After you register to
          the website, easily login your account and share the profile link with
          friends to get going. Receive anonymous messages from friends online!
        </p>
        
        {/* <div className="d-flex justify-content-center mb-5 flex-wrap">
          <div className="text-center mx-2">
          <button className=" downBtn my-3">
          <FontAwesomeIcon icon={faAmazon}  className="downIcon"/>
              <div className="">
                <h4 className="fw-semibold">Available</h4>
                <p>on App Store</p>
              </div>
            </button>
          </div>
          <div className="text-center mx-2">
            <button className=" downBtn  my-3">
              <FontAwesomeIcon icon={faGooglePlay}  className="downIcon" />
              <div className="">
                <h4 className="fw-semibold">Available</h4>
                <p>on Play Store</p>
              </div>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Download;
