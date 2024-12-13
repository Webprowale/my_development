import React, { useState } from "react";
import data from "./data";
function Accordion() {
  const [select, setSelect] = useState(null);
  const [action, setAction] = useState("+")
 const handleAnswer = (id)=>{
    setSelect(id === select ? null : id)
    setAction(data.id === action.indexOf("+")? "-" : "+")
 }
  return (
    <div className="wrapper">
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item bg-green-950 text-white my-1 w-60 mx-auto rounded-md px-1 py-2" key={dataItem.id} >
              <div className="title text-center font-bold flex justify-center ">
                <h3>{dataItem.Question}</h3>
                <span
                  className="text-3xl text-green-500"
                  onClick={()=>handleAnswer(dataItem.id)}
                
                >
                  {
                    action
                  }
                </span>
              </div>
              <div className="answers text-center">
                {
                    select === dataItem.id ?
                    <p>{dataItem.Answers}</p>
                    : null
                    }
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3 className="text-2xl text-red-600 text-bold">Data not Found</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Accordion;
