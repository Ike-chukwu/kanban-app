import React, { useContext, useState } from "react";
import "./DeleteOverlay.scss";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/auth-context";

const DeleteOverlay = (props) => {
  //close the options dropdown
  props.setDisplay(false);

  const { checkValueExists, editBoardFunction, light } = useContext(AuthContext);

  const [boardTOBeDleted, setDelete] = useState();
  const dataPack = useSelector((state) => state);
  const boardData = dataPack.boards;

  const dispatch = useDispatch();
  const itemInFocus = checkValueExists();
  let position;
  let newFocus;

  const deleteBoard = () => {
    //gets the id of currently active board
    const ActiveBoard = boardData.find((obj) => obj.id == itemInFocus.id);
    //gets the index of currently active board
    position = boardData.indexOf(ActiveBoard);

    //sets the element before it as the clicked item when its deleted
    if (position >= 1) {
      position--;
      newFocus = boardData[position];
      editBoardFunction(newFocus.value);
    }

    //sets the element after it as the clicked item when its deleted
    if (position == 0 && boardData.length > 1) {
      position++;
      newFocus = boardData[position];
      editBoardFunction(newFocus.value);
    }

    // removes the clicked item from local storage so its starts afresh on new load
    if (position == 0 && boardData.length == 1) {
      localStorage.removeItem("active");
    }

    dispatch({
      type: "DELETE_BOARD",
      payload: itemInFocus.id,
    });
    props.setDeleteOverlay(false);
  };

  return (
    <div className={light ? "d-overlay" : "dark d-overlay"}>
      <div className="d-cover">
        <h4 className="del-prompt">Delete this {props.aspect}</h4>
        <p>
          Are you sure you want to delete the "{`${itemInFocus.value}`}" board?
          This action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="btn-pack">
          <div className="d-btn red" onClick={deleteBoard}>
            delete
          </div>
          <div
            className="d-btn cancel"
            onClick={() => props.setDeleteOverlay(false)}
          >
            cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteOverlay;
