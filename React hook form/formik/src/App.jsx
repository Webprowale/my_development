import { useState } from "react";
import "./App.css";
import Basic from "./Basic";
import Advance from "./Advance";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  const [viewForm, setviewForm] = useState("basic");

  return (
    <>
      <nav className="d-flex mb-5">
        <button className="btn"
         onClick={() => setviewForm("basic")}
         style={{
           backgroundColor: viewForm == "basic" ? "green" : "",
           color: viewForm == "basic" ? "white" : "",
         }}
        >
          Basic
        </button>
        <button
          className="btn fw-bold"
          onClick={() => setviewForm("advance")}
          style={{
            backgroundColor: viewForm == "advance" ? "green" : "",
            color: viewForm == "advance" ? "white" : "",
          }}
        >
          Advance
        </button>
      </nav>
      {viewForm == "basic" ? <Basic /> : <Advance />}
    </>
  );
}

export default App;
