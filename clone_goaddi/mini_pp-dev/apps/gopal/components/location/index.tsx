"use client";
import axios from "axios";
import { useEffect } from "react";

const SetLocation = () => {
  useEffect(() => {
    const getLocation = async () => {
      const ipapi = await axios.get("https://ipapi.co/json");
      const { ip, country_name, country_code, region, region_code } =
        ipapi?.data;

      console.log("our location details");
      console.log(ipapi?.data);
      localStorage.setItem("location_details", JSON.stringify(ipapi?.data));
    };
    getLocation();
  }, []);

  return null;
};

export default SetLocation;
