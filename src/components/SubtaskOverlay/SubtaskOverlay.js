import React, { useContext, useState, useEffect } from "react";
import "./SubtaskOverlay.scss";
import { useDispatch, } from "react-redux";
import DeleteTaskOverlay from "../DeleteTaskOverlay/DeleteTaskOverlay";
import EditTaskOverlay from "../EditTaskOverlay/EditTaskOverlay";
import { useRef } from "react";
import { AuthContext } from "../context/auth-context";

const SubtaskOverlay = (props) => {
  const { light, checkValueExists } = useContext(AuthContext);

  //board the currnt task falls under
  const itemInFocus = checkValueExists();

  //subboard the current task falls under
  let objInFocus;
  let copy;
  let taskInFocus;

  if (itemInFocus && itemInFocus.subBoards) {
    objInFocus = itemInFocus.subBoards.find(
      (subBoad) => subBoad.id == props.subBoardId
    );

    copy = [...itemInFocus.subBoards];

    //gets the clicked task from the subboard
    taskInFocus = objInFocus.Tasks.find((task) => task.id == props.testID);
  }

  //stores the checked state of all subtasks
  const [checkedState, setCheckedState] = useState(
    new Array(props.subTasks.length).fill(false)
  );

  useEffect(() => {
    if (taskInFocus) {
      //array of checked state for any clicked task
      const checkedStateDisplay = taskInFocus.subTasks.map(
        (task) => task.checked
      );
      setCheckedState(checkedStateDisplay);
    }
  }, [taskInFocus]);

  // stores the state of the ellipsis dropdown option
  const [secondDisplay, setSecondDisplay] = useState(false);

  //temporary variable to enable swapping subboard position in arrayof subboards
  let temp;
  //copy of the subboards array
  const dispatch = useDispatch();

  // stores the state of edit overlay
  const [editTaskOverlay, setEditTaskOverlay] = useState(false);
  // stores the state of delete overlay
  const [deleteTaskOverlay, setDeleteTaskOverlay] = useState(false);

  //current subboard state  in dropdown i.e empty means the task still falls under the initial subboard category
  const [sCurrent, setCurrent] = useState("");

  const handleOverlayClick = (e) => {
    // Call the onOverlayClose function passed from the ParentComponent
    e.stopPropagation();
    //shallow copy of the subtasks array
    const checksCpy = [...taskInFocus.subTasks];
    //update subtask checked property with the checkedState array
    const checksCpyVal = checksCpy.map(
      (task, index) => (task.checked = checkedState[index])
    );
    //checks the scurrent state which stores the current selected value in the select tag dropdown if its empty
    if (sCurrent == "") {
      setSecondDisplay(false);
      props.onOverlayClose();
    } else {
      const selectedSubBoardDetails = itemInFocus.subBoards.find(
        (subBoard) => subBoard.value == sCurrent
      );
      const sId = selectedSubBoardDetails.id;

      dispatch({
        type: "CHANGE_SUBBOARD",
        payload: {
          boardId: itemInFocus.id,
          subBoardId: sId,
          taskId: props.testID,
          taskDetails: taskInFocus,
        },
      });
      props.onOverlayClose();
    }

    props.setDisplay(!props.display);
  };

  //function that handles select tag event
  const handleOptionClick = (e) => {
    const val = e.target.value;
    if (val) {
      setCurrent(val);
    }
  };

  //function that handles checkbox tick
  const setTick = (e, position) => {
    const updatedChecks = checkedState.map((item, index) => {
      if (position == index) {
        return !item;
      }
      return item;
    });

    setCheckedState(updatedChecks);
  };

  //counts the number of ticked / unticked checkboxes
  const countCheckedBoses = () => checkedState.filter(Boolean).length;

  //ref assigned to the select tag
  const selectRef = useRef();

  if (props.subtaskOverlay) {
    return (
      <div
        className={light ? "subtask-overlay" : "dark subtask-overlay"}
        onClick={handleOverlayClick}
      >
        <div className="subtask-cover" onClick={(e) => e.stopPropagation()}>
          <div className="subtask-title">
            <h4 className="subtask-prompt">{taskInFocus.title}</h4>
            {sCurrent == "" ? (
              <img
                src={props.ellipsis}
                style={{ cursor: "pointer" }}
                onClick={() => setSecondDisplay(!secondDisplay)}
                alt=""
              />
            ) : null}
          </div>

          <div className="subtask-list">
            <label className="label">
              {countCheckedBoses()} of {taskInFocus.subTasks.length} subtasks 
            </label>
            <div className="input-container-parent">
              {taskInFocus.subTasks.map((item, index) => {
                return (
                  <div className="i-cont" key={item.id}>
                    <input
                      type="checkbox"
                      value={item.value}
                      checked={checkedState[index]}
                      onChange={(e) => setTick(e, index)}
                    />
                    <input
                      type="text"
                      value={item.value}
                      className={checkedState[index] ? "underline" : null}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="subtask-aspect">
            <label className="label">Current Status</label>
            <select
              name="Categories"
              className="diff-cat"
              id=""
              ref={selectRef}
              onChange={(e) => handleOptionClick(e)}
            >
              {copy.map((item, index) => {
                if (index == 0) {
                  if (item.id == objInFocus.id) {
                    return <option value={item.value}>{item.value}</option>;
                  } else {
                    const found = props.subBoardsArray.find(
                      (obj) => obj.id == objInFocus.id
                    );
                    const pos = props.subBoardsArray.indexOf(found);
                    temp = item;
                    copy[0] = objInFocus;
                    copy[pos] = temp;
                    return (
                      <option value={objInFocus.value}>
                        {objInFocus.value}
                      </option>
                    );
                  }
                }
                return <option value={item.value}>{item.value}</option>;
              })}
            </select>
          </div>

          {secondDisplay && (
            <div className={light ? "options" : "dark options"}>
              <p
                onClick={() => {
                  {
                    setEditTaskOverlay(true);
                  }
                  setSecondDisplay(false);
                }}
              >
                edit task
              </p>
              <p className="danger" onClick={() => setDeleteTaskOverlay(true)}>
                delete task
              </p>
            </div>
          )}

          {editTaskOverlay && (
            <EditTaskOverlay
              editTaskOverlay={editTaskOverlay}
              setEditTaskOverlay={setEditTaskOverlay}
              taskName={taskInFocus.title}
              subId={
                props.subBoardsArray.find(
                  (obj) => obj.value == selectRef.current.value
                ).id
              }
              subtaskOverlayOff={props.onOverlayClose}
              testId={props.testID}
              boardId={itemInFocus.id}
              subBoardArray={props.subBoardsArray}
              checkedState={checkedState}
            />
          )}
          {deleteTaskOverlay && (
            <DeleteTaskOverlay
              deleteTaskOverlay={deleteTaskOverlay}
              setDeleteTaskOverlay={setDeleteTaskOverlay}
              taskName={taskInFocus.title}
              boardId={itemInFocus.id}
              taskId={taskInFocus.id}
              subId={
                props.subBoardsArray.find(
                  (obj) => obj.value == selectRef.current.value
                ).id
              }
              subTaskOverlay={props.onOverlayClose}
            />
          )}
        </div>
      </div>
    );
    // }
  }
};

export default SubtaskOverlay;
