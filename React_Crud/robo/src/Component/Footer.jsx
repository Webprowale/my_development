import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram,faTwitter } from "@fortawesome/free-brands-svg-icons";
function Footer() {
  const time = new Date();
  const currentYear = time.getFullYear();
  return (
    <div className="container-fluid bg-black pb-5">
        <div className="col-6 ps-5">
      <div className=" d-flex pt-5">
        <FontAwesomeIcon icon={faFacebook} className="footIcon mx-1" />
        <FontAwesomeIcon icon={faInstagram} className="footIcon mx-1" />
        <FontAwesomeIcon icon={faTwitter}  className="footIcon mx-1" />
      </div>
      <div className="text-white mt-5">
        <p className="fw-semibold px-2">
        Copyright &copy; {currentYear} Robonymous ||
          <Link> Privacy Policy</Link>
        </p>
        <p className="text-white px-2">
          Shout Out to: <Link>Webprowale</Link>
        </p>
      </div>
      </div>
    </div>
  );
}

export default Footer;
