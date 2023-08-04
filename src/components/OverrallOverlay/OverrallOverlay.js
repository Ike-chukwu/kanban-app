import React, { useEffect, useState } from "react";
import "./OverrallOverlay.scss";

const OverrallOverlay = (props) => {
  
  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   if (html) {
  //     html.style.overflow = props.subtaskOverlay ? "hidden" : "auto";
  //   }
  // }, [props.subtaskOverlay]);

  if (props.subtaskOverlay) {
    return (
      <div className="overall" onClick={() => props.setSubtaskOverlay(false)}>
        {props.children}
      </div>
    );
  }
};

export default OverrallOverlay;
