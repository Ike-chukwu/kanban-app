import React, { useContext } from "react";
import "./DeleteTaskOverlay.scss";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/auth-context";

const DeleteTaskOverlay = (props) => {
  const { light } = useContext(AuthContext);
  const dispatch = useDispatch();

  //function that deletes task
  const deleteTask = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        boardId: props.boardId,
        subBoardId: props.subId,
        taskID: props.taskId,
      },
    });
    props.setDeleteTaskOverlay(false);
    props.subTaskOverlay();
  };

  return (
    <div className={light ? "d-overlay" : "dark d-overlay"}>
      <div className="d-cover">
        <h4 className="del-prompt">Delete this task</h4>
        <p>
          Are you sure you want to delete the "{`${props.taskName}`}" board?
          This action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="btn-pack">
          <div className="d-btn red" onClick={deleteTask}>
            delete
          </div>
          <div
            className="d-btn cancel"
            onClick={() => props.setDeleteTaskOverlay(false)}
          >
            cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskOverlay;
