import React, { useState } from "react";
import "./Input.scss";

const Input = (props) => {
  const [focus, setFocus] = useState(false);

  let renderedinput;

  const focusHandler = () => {
    setFocus(true);
  };

  switch (props.elementType) {
    case "input":
      renderedinput = (
        <input
          className="myinput"
          focused={focus.toString()}
          onBlur={focusHandler}
          pattern={props.pattern}
          required
          value={props.value}
          onChange={props.onChange}
          type="text"
        />
      );
      break;
    case "textarea":
      renderedinput = (
        <textarea
          className="myinput"
          cols="30"
          rows="10"
          focused={focus.toString()}
          onBlur={focusHandler}
        //   pattern={props.pattern}
        //   required
          value={props.value}
          onChange={props.onChange}
          type="text"
        >
        </textarea>
      );
      break;

    default:
      break;
  }

  return (
    <>
      {renderedinput}
      {/* <p className="error-message">{props.errorMessage}</p> */}
    </>
  );
};

export default Input;
