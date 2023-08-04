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
        {light? <img src={logo} className="logo" alt="" /> : <img src={logoL} className="logo" alt="" />}
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
        <span className="btn" onClick={() => setAddOverlay(true)}>+ add new task</span>
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
        <DeleteOverlay setDeleteOverlay={setDeleteOverlay} deleteOverlay={deleteOverlay} setDisplay={setDisplay} />
        /* <div className="d-overlay">
          <div className="d-cover">
            <h4 className="del-prompt">Delete this board</h4>
            <p>
              Are you sure you want to delete the "Roadmap" board? This action
              will remove all columns and tasks and cannot be reversed.
            </p>
            <div className="btn-pack">
              <div className="d-btn red">delete</div>
              <div className="d-btn" onClick={() => setDeleteOverlay(false)}>
                cancel
              </div>
            </div>
          </div>
        </div> */
      )}

      {/* /*edit overlay working process */}
      {editOverlay && ( <EditOverlay setEditOverlay={setEditOverlay} editOverlay={editOverlay} setDisplay={setDisplay}/>
        /* <div className="e-overlay" onClick={() => setEditOverlay(false)}>
          <div className="e-cover">
            <h4 className="e-prompt">Edit board</h4>
            <div className="l-title">
              <label classXName="label">board name</label>
              <input type="text" placeholder="" />
            </div>
            <div className="columns-pack">
              <label classXName="label">board columns</label>
              <div className="input-pack">
                <input type="text" placeholder="" />
                <img src={close} alt="" />
              </div>
              <div className="input-pack">
                <input type="text" placeholder="" />
                <img src={close} alt="" />
              </div>
              <div className="input-pack">
                <input type="text" placeholder="" />
                <img src={close} alt="" />
              </div>
              <div className="column-btn">+ add new column</div>
            </div>
            <div className="long-btns-pack">
              <div className="column-btn">save change</div>
            </div>
          </div>
        </div> */
      )}

      {/*add new task overlay working process */}
      {addOverlay && ( <AddOverlay setAddOverlay={setAddOverlay} addOverlay={addOverlay}/>
        /* <div className="add-overlay" onClick={() => setAddOverlay(false)} >
          <div className="add-cover">
            <h4 className="add-prompt">add new task</h4>
            <div className="l-title">
              <label className="label">task name</label>
              <input type="text" placeholder="" />
            </div>
            <div className="l-title">
              <label className="label">description</label>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="columns-pack">
              <label classXName="label">board columns</label>
              <div className="input-pack">
                <input type="text" placeholder="" />
                <img src={close} alt="" />
              </div>
              <div className="input-pack">
                <input type="text" placeholder="" />
                <img src={close} alt="" />
              </div>
              <div className="input-pack">
                <input type="text" placeholder="" />
                <img src={close} alt="" />
              </div>
              <div className="column-btn">+ add new subtask</div>
            </div>
            <div className="current-status">
              <label className="label">current status</label>
              <select name="Categories" className="diff-cat" id="">
                <option value="Todo">Todo</option>
                <option value="Doing">Doing</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="column-btn">create task</div>
          </div>
        </div> */
      )}

    </div>
  );
};

export default Nav;
