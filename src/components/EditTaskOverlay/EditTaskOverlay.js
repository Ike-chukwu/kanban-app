import React, { useContext, useState } from "react";
import "./EditTaskOverlay.scss";
import close from "../../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/auth-context";

const EditTaskOverlay = (props) => {
  const { light, checkValueExists } = useContext(AuthContext);
  const itemInFocus = checkValueExists();
  const subBoardArray = itemInFocus.subBoards;
  const objInFocus = itemInFocus.subBoards.find(
    (subBoad) => subBoad.id == props.subId
  );
  const taskInFocus = objInFocus.Tasks.find((task) => task.id == props.testId);
  const taskInFocusValue = taskInFocus.title;
  const taskInFocusDesc = taskInFocus.description;
  const taskInFocusSubTasks = taskInFocus.subTasks;
  const taskId = taskInFocus.id;

  // stores the state of the current subboard with the initial value passed as a prop from the subtask overlay
  const [currentSubboard, setCurrentSubBoard] = useState(props.subId);
  const dispatch = useDispatch();

  //state that stores the details of the task
  const [details, setDetails] = useState([
    {
      id: taskId,
      value: taskInFocusValue,
    },

    {
      id: Math.random(),
      value: taskInFocusDesc,
    },

    {
      subTasks: taskInFocusSubTasks,
    },

    {
      subBoards: subBoardArray,
    },
  ]);

  //function that handles input change
  const onChangeHandler = (e, id) => {
    const updatedArray = details.map((item) => {
      if (item.subTasks) {
        const updatedSubtasks = item.subTasks.map((item) => {
          if (item.id == id) {
            return { ...item, value: e.target.value };
          }
          return item;
        });
        return { ...item, subTasks: updatedSubtasks };
      }

      if (item.id == id) {
        return { ...item, value: e.target.value };
      }
      return item;
    });
    setDetails(updatedArray);
  };

  //function that adds new subtask
  const addNewSubTask = () => {
    const newSubTask = { id: Math.random() * 2, value: "", checked: false };
    const detailCopy = [...details];
    const secondElementCopy = { ...detailCopy[2] };
    const focusArr = [...secondElementCopy.subTasks];
    const newUpdate = [...focusArr, newSubTask];
    secondElementCopy.subTasks = newUpdate;
    detailCopy[2] = secondElementCopy;
    setDetails(detailCopy);
  };

  //function that deletes any subTask
  const deleteEntry = (id) => {
    const arrCpy = [...details];
    const subTaskCopy = { ...arrCpy[2] };
    const arr = [...subTaskCopy.subTasks];
    const filtered = arr.filter((item) => item.id !== id);
    subTaskCopy.subTasks = filtered;
    arrCpy[2] = subTaskCopy;
    setDetails(arrCpy);
    dispatch({
      type: "DELETE_SUB_TASK",
      payload: {
        boardId: itemInFocus.id,
        subBoardID: currentSubboard,
        taskId: details[0].id,
        subTaskId: id,
      },
    });
  };

  //functions that handles the change in the select tag value
  const handleSelectClick = (e) => {
    const subBoardObj = subBoardArray.find(
      (obj) => obj.value == e.target.value
    );
    const activeId = subBoardObj.id;
    setCurrentSubBoard(activeId);
  };

  //edits and creates task, subtasks, description of the task and also changes the category of subboard the task falls under if the subboard value changes
  const createTask = () => {
    const checksCpy = [...details[2].subTasks];
    const checksCpyVal = checksCpy.map(
      (task, index) => (task.checked = props.checkedState[index])
    );
    dispatch({
      type: "EDIT_TASK",
      payload: {
        boardId: itemInFocus.id,
        subBoardID: currentSubboard,
        taskId: details[0].id,
        taskValue: details[0].value,
        description: details[1].value,
        subTasks: details[2].subTasks,
      },
    });

    if (currentSubboard !== props.subId) {
      const concernedTask = {
        id: details[0].id,
        title: details[0].value,
        description: details[1].value,
        subTasks: details[2].subTasks,
      };
      dispatch({
        type: "CHANGE_SUBBOARD",
        payload: {
          boardId: itemInFocus.id,
          subBoardId: currentSubboard,
          taskId: details[0].id,
          taskDetails: concernedTask,
        },
      });
    }

    props.setEditTaskOverlay(false);
    props.subtaskOverlayOff();
  };

  //copy of the subboard array
  let secondSubboardCopy = [...details[3].subBoards];

  return (
    <div
      className={light ? "add-overlay" : "add-overlay dark"}
      onClick={() => props.setEditTaskOverlay(false)}
    >
      <div
        className="add-cover"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="add-prompt">edit task</h4>
        {details.map((task, index) => {
          if (index == 0) {
            return (
              <div className="l-title">
                <label className="label">task name</label>
                <input
                  type="text"
                  placeholder=""
                  value={task.value}
                  onChange={(e) => onChangeHandler(e, task.id)}
                />
              </div>
            );
          }
        })}
        {details.map((info, index) => {
          if (index == 1) {
            return (
              <div className="l-title">
                <label className="label">description</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={info.value}
                  onChange={(e) => onChangeHandler(e, info.id)}
                ></textarea>
              </div>
            );
          }
        })}
        <div className="columns-pack">
          <label className="label">Subtasks</label>
          {details[2].subTasks.map((t, index) => {
            return (
              <div className="input-pack" key={t.id}>
                <input
                  type="text"
                  placeholder=""
                  value={t.value}
                  onChange={(e) => onChangeHandler(e, t.id)}
                />
                <img src={close} alt="" onClick={() => deleteEntry(t.id)} />
              </div>
            );
          })}
          <div className="column-btn" onClick={addNewSubTask}>
            + add new subtask
          </div>
        </div>
        <div className="current-status">
          <label className="label">current status</label>
          <select
            name="Categories"
            className="diff-cat"
            id=""
            onChange={(e) => handleSelectClick(e)}
          >
            {secondSubboardCopy.map((item, index) => {
              if (index == 0) {
                if (item.id == objInFocus.id) {
                  return <option value={item.value}>{item.value}</option>;
                } else {
                  const found = subBoardArray.find(
                    (obj) => obj.id == objInFocus.id
                  );
                  const pos = subBoardArray.indexOf(found);
                  const temp = item;
                  secondSubboardCopy[0] = objInFocus;
                  secondSubboardCopy[pos] = item;
                  return (
                    <option key={objInFocus.id} value={objInFocus.value}>
                      {objInFocus.value}
                    </option>
                  );
                }
              }
              return (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="column-btn" onClick={createTask}>
          create task
        </div>
      </div>
    </div>
  );
};

export default EditTaskOverlay;
