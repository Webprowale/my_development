import React from "react";

const TextWithNewlines = ({ text }) => {
  return (
    <div>
      {text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default TextWithNewlines;
