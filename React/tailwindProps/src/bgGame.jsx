import React, { useState } from "react";
const bgGame = () => {
  const [color, setColor] = useState("");
  const [ismovedup, setMovedUp] = useState(false);
  const [ismovedY, setMovedY] = useState(false);
  const [ismovedP, setMovedP] = useState(false);
  const bgGreen = () => {
    setColor("green");
    setMovedUp(true);
  };

  const bgYellow = () => {
    setColor("yellow");
    setMovedY(true);
  };
  const bgPurple = () => {
    setColor("purple");
    setMovedP(true);
  };
  return (
    <div
      className=" relative w-full h-screen bg-red-200 items-center justify-center "
      style={{ backgroundColor: color }}
    >
      <div className="flex bg-white rounded-xl shadow-lg w-74 py-4 px-1 gap-x-4 absolute left-[35%]  bottom-10 px-5 duration-100 ease-in-out transform hover:-translate-y-1">
        <button
          className={`p-2 px-5 rounded-full bg-green-500 text-white font-semibold transition-all duration-300 ease-in-out tranform  ${
            ismovedup ? "-translate-y-1" : ""
          }`}
          onClick={bgGreen}
        >
          Green
        </button>
        <button
          className={`p-2 px-5 rounded-full bg-yellow-500 text-white font-semibold transition-all duration-300 ease-in-out ${
            ismovedY ? "-translate-y-1" : ""
          }`}
          onClick={bgYellow}
        >
          Yellow
        </button>
        <button
          className={`p-2 px-5 rounded-full bg-purple-500 text-white font-semibold transition-all duration-300 ease-in-out ${
            ismovedP ? "-translate-y-1" : ""
          }`}
          onClick={bgPurple}
        >
          Purple
        </button>
      </div>
    </div>
  );
};

export default bgGame;
