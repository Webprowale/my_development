import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonWalkingArrowLoopLeft } from "@fortawesome/free-solid-svg-icons";
function Card() {
  return (
    <div className="container">
      <div className="row mt-5 g-5">
        <div className="col-md-6 mb-md-5">
          <div className="card shadow rounded">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon
                  icon={faPersonWalkingArrowLoopLeft}
                  size="xl"
                  color="white"
                />
              </h5>
              <h3 className="fw-bold fText mb-3 mt-3">Anonymity</h3>
              <p className="card-text fwCard  mt-2 ">
                Our Platform ensures your privacy so that you stay anonymous
                everytime you send someone a secret message. You are anonymous
                until you ever choose to reveal your identity.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-md-5">
          <div className="card shadow rounded">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon
                  icon={faPersonWalkingArrowLoopLeft}
                  size="xl"
                  color="white"
                />
              </h5>
              <h3 className="fw-bold fText mb-3 mt-3">Safe & Secure</h3>
              <p className="card-text fwCard  mt-1 ">
                Safety of our users using this anonymous messaging platform is
                very important for us. We have got reporting systems so that you
                can report anything that you do not like to see.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-md-5">
          <div className="card shadow rounded">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon
                  icon={faPersonWalkingArrowLoopLeft}
                  size="xl"
                  color="white"
                />
              </h5>
              <h3 className="fw-bold fText mb-3 mt-3">24/7 Support</h3>
              <p className="card-text fwCard  mt-2 ">
                If there is anything that you need help with related to our
                anonymous messaging and feedback platform, We are always here
                for you. 24 hours a day and 7 days a week
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-md-5">
          <div className="card shadow rounded">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon
                  icon={faPersonWalkingArrowLoopLeft}
                  size="xl"
                  color="white"
                />
              </h5>
              <h3 className="fw-bold fText mb-3 mt-3">Easy 2 Use</h3>
              <p className="card-text fwCard  mt-2 ">
                We are constantly working on Kubool as a platform to make it as
                user friendly as possible. As of now you can just download our
                app, fill in your username & pass to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
