import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
     const navigate = useNavigate()
  let userCred = JSON.parse(sessionStorage.getItem("user-cred"));
  let userInfo = JSON.parse(sessionStorage.getItem("user-info"));
  const handleClick = ()=>{
    sessionStorage.removeItem("user-cred");
    sessionStorage.removeItem("user-info");
    navigate("/");
  }

  return (
    <div>
      <h4>Home</h4> <br /><br /><br />
      <button onClick={handleClick}>Sign Out</button> <br /><br />
      {userCred.email} <br /><br />
      {userInfo.age}
    </div>
  );
};

export default Home;
