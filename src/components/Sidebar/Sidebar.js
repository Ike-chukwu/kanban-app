import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import "./Sidebar.scss";
import Board from "../../assets/icon-board.svg";
import sun from "../../assets/icon-light-theme.svg";
import moon from "../../assets/icon-dark-theme.svg";
import hideSidebar from "../../assets/icon-hide-sidebar.svg";
import showSidebar from "../../assets/icon-show-sidebar.svg";
import NewBoardOverlay from "../NewBoardOverlay/NewBoardOverlay";
import { AuthContext } from "../context/auth-context";

const Sidebar = () => {
  //full  data from redux
  const dataPack = useSelector((state) => state);
  //array of board objects from redux
  const boardData = dataPack.boards;

  // variables gotten from context
  const { checkValueExists, clickedItem, clickHandler, modeToggler } =
    useContext(AuthContext);

  // state to monitor sidebar visibilty
  const [status, setStatus] = useState(true);

  // state to monitor create newboard overlay
  const [boardOverlay, setBoardOverlay] = useState(false);

  //clicked board object
  const itemInFocus = checkValueExists();
  //id of clicked board obj
  let activeBoardObjId;

  if (itemInFocus) {
    activeBoardObjId = boardData.find((item) => item.value == clickedItem).id;
  }

  //function to toggle the sidebar
  const sidebarHandler = () => {
    setStatus(!status);
  };

  return (
    <div className="parent">
      <div className={status ? "sidebarContainer" : "sidebarContainer hidden"}>
        <div className="top">
          <h3 className="overall-title">all boards({`${boardData.length}`})</h3>
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
        </div>
        <div className="bottom">
          <div
            className={status && "top-icon-bar"}
            onChange={() => modeToggler()}
          >
            <img src={sun} alt="" />
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <img src={moon} alt="" />
          </div>
          <div className="b-icon" onClick={sidebarHandler}>
            <img src={hideSidebar} alt="" />
            hide sidebar
          </div>
        </div>
      </div>
      {status === false && (
        <div className="eyetoggler" onClick={sidebarHandler}>
          <img src={showSidebar} alt="" />
        </div>
      )}
      {boardOverlay && (
        <NewBoardOverlay
          boardOverlay={boardOverlay}
          setBoardOverlay={setBoardOverlay}
        />
      )}
    </div>
  );
};

export default Sidebar;
