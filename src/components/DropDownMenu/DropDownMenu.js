import React, { useState, useContext, useEffect } from "react";
import "./DropDownMenu.scss";
import suns from "../../assets/icon-light-theme.svg";
import moons from "../../assets/icon-dark-theme.svg";
import Board from "../../assets/icon-board.svg";
import "./DropDownMenu.scss";
import {  useSelector } from "react-redux";
import NewBoardOverlay from "../NewBoardOverlay/NewBoardOverlay";
import { AuthContext } from "../context/auth-context";

const DropDownMenu = (props) => {
  const { light, checkValueExists, clickedItem, modeToggler, clickHandler } =
    useContext(AuthContext);

  const [status, setStatus] = useState(true);
  const [boardOverlay, setBoardOverlay] = useState(false);
  const itemInFocus = checkValueExists();

  const dataPack = useSelector((state) => state);
  const boardData = dataPack.boards;

  let activeBoardObjId;

  if (itemInFocus) {
    activeBoardObjId = boardData.find((item) => item.value == clickedItem).id;
  }

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = props.dropStatus ? "hidden" : "scroll";
    }
  }, [props.dropStatus]);

  {
    if (props.dropStatus) {
      return (
        <div
          className={light ? "dropDown" : "dark dropDown"}
          onClick={() => props.setDropStatus(false)}
        >
          <div className="cover" onClick={(e) => e.stopPropagation()}>
            <h3 className="overall-title">all boards(3)</h3>
            <ul className="categories">
              {itemInFocus &&
                boardData.map((cat, index) => {
                  if (clickedItem == cat.value && activeBoardObjId == cat.id) {
                    return (
                      <li
                        key={cat.id}
                        id={cat.value}
                        className={"item active"}
                        onClick={clickHandler}
                      >
                        <img src={Board} alt="" />
                        <span className={`title ${index}`}>{cat.value}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={cat.id} className="item" onClick={clickHandler}>
                      <img src={Board} alt="" />
                      <span className="title">{cat.value}</span>
                    </li>
                  );
                })}
              <li
                className="item initializer"
                onClick={() => setBoardOverlay(true)}
              >
                <img src={Board} alt="" />
                <span className="title">+ create new board</span>
              </li>
            </ul>
            <div className="top-icon-bar" onChange={() => modeToggler()}>
              <img src={suns} alt="" />
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
              <img src={moons} alt="" />
            </div>
          </div>

          {boardOverlay && (
            <NewBoardOverlay
              boardOverlay={boardOverlay}
              setBoardOverlay={setBoardOverlay}
            />
          )}
        </div>
      );
    }
  }
};

export default DropDownMenu;
