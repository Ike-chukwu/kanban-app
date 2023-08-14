import React, { useState, useContext } from "react";
import "./Nav.scss";
import logo from "../../assets/logo-dark.svg";
import logoL from "../../assets/logo-light.svg";
import logoM from "../../assets/logo-mobile.svg";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import arrownDown from "../../assets/icon-chevron-down.svg";
import arrownUp from "../../assets/icon-chevron-up.svg";
import addTask from "../../assets/icon-add-task-mobile.svg";
import DeleteOverlay from "../DeleteOverlay/DeleteOverlay";
import EditOverlay from "../EditOverlay/EditOverlay";
import AddOverlay from "../AddOverlay/AddOverlay";
import { AuthContext } from "../context/auth-context";

const Nav = (props) => {
  const { light, clickedItem } = useContext(AuthContext);

  //triggers ellipsis dropdown
  const [display, setDisplay] = useState(false);

  //triggers add new task overlay
  const [addOverlay, setAddOverlay] = useState(false);

  //triggers edit task overlay
  const [editOverlay, setEditOverlay] = useState(false);

  //triggers delete task overlay
  const [deleteOverlay, setDeleteOverlay] = useState(false);

  //monitors dropdown state
  const ellipsisClickHandler = () => {
    setDisplay(!display);
  };
  
  return (
    <div className="navBar">
      <div className="left">
        {light ? (
          <img src={logo} className="logo" alt="" />
        ) : (
          <img src={logoL} className="logo" alt="" />
        )}
        <img src={logoM} className="logo-mobile" alt="" />
        <h3>
          {/* current active board that is clicked on th sidebar */}
          {clickedItem}
          <img
            src={arrownDown}
            className={props.dropStatus == false ? "img show" : "img"}
            alt=""
            onClick={props.dropDownToggler}
          />{" "}
          <img
            src={arrownUp}
            className={props.dropStatus == true ? "img show" : "img"}
            onClick={props.dropDownToggler}
            alt=""
          />{" "}
        </h3>
      </div>
      <div className="right">
        <span className="btn" onClick={() => setAddOverlay(true)}>
          + add new task
        </span>
        <span className="plusBtn" onClick={() => setAddOverlay(true)}>
          <img src={addTask} alt="" />
        </span>
        <img
          className="ellipsis"
          src={ellipsis}
          onClick={ellipsisClickHandler}
          alt=""
        />
      </div>
      {display && (
        <div className="options">
          <p onClick={() => setEditOverlay(true)}>edit board</p>
          <p className="danger" onClick={() => setDeleteOverlay(true)}>
            delete board
          </p>
        </div>
      )}

      {/* /*delete overlay working process */}
      {deleteOverlay && (
        <DeleteOverlay
          setDeleteOverlay={setDeleteOverlay}
          deleteOverlay={deleteOverlay}
          setDisplay={setDisplay}
        />
      )}

      {/* /*edit overlay working process */}
      {editOverlay && (
        <EditOverlay
          setEditOverlay={setEditOverlay}
          editOverlay={editOverlay}
          setDisplay={setDisplay}
        />
      )}

      {/*add new task overlay working process */}
      {addOverlay && (
        <AddOverlay setAddOverlay={setAddOverlay} addOverlay={addOverlay} />
      )}
    </div>
  );
};

export default Nav;
