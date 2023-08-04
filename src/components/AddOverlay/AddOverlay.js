import React, { useState, useContext } from "react";
import "./AddOverlay.scss";
import close from "../../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/auth-context";

const AddOverlay = (props) => {
  const { light, checkValueExists } = useContext(AuthContext);

  const itemInFocus = checkValueExists();

  const boardInConcern = itemInFocus.value;

  //array of subboards extracted from the clicked board in the sidebar
  const statusAspects = itemInFocus.subBoards.map((item, index) => {
    return item;
  });

  //first subboard in the array of subboards that should be rendered as the first element in dropdown
  const firstStatusAspect = statusAspects[0];

  //state that holds first subboard object
  const [optVal, setOptVal] = useState(firstStatusAspect);

  //overall state to render the form
  const [newTask, setNewTask] = useState([
    { id: Math.random() * 7, value: "" },
    { id: Math.random() * 7, value: "" },
    {
      subTasks: [
        { id: Math.random(), value: "", checked: false },
        { id: Math.random() * 12, value: "", checked: false },
      ],
    },
    {
      dropDownOption: { ...statusAspects },
    },
    { upBoard: boardInConcern },
  ]);

  const dispatch = useDispatch();

  //function that deletes any subtask
  const deleteSubTask = (id) => {
    const newTaskClone = [...newTask];
    const targetObj = { ...newTaskClone[2] };
    const targetArray = [...targetObj.subTasks];
    const updatedArray = targetArray.filter((item) => item.id !== id);
    targetObj.subTasks = updatedArray;
    newTaskClone[2] = targetObj;
    setNewTask(newTaskClone);
  };

  //function that adds new input field
  const addNewField = () => {
    setNewTask((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.subTasks) {
          return {
            ...item,
            subTasks: [
              ...item.subTasks,
              {
                id: Date.now(),
                value: "",
              },
            ],
          };
        }
        return item;
      });
      return updatedData;
    });
  };

  // function that handles changes in  input fields
  const handleChange = (e, id) => {
    const { value } = e.target;
    const updatedData = newTask.map((item, index) => {
      if (item.id == id) {
        return { ...item, value };
      } else if (item.subTasks) {
        const updatedSubtasks = item.subTasks.map((subTask) => {
          if (subTask.id === id) {
            return { ...subTask, value };
          }
          return subTask;
        });
        return { ...item, subTasks: updatedSubtasks };
      }
      return item;
    });
    setNewTask(updatedData);
  };

  // function that triggers when the value of the dropdown option changes
  const handleSelectClick = (e, value) => {
    const changedSuboard = statusAspects.find(
      (element) => element.value == e.target.value
    );
    setOptVal(changedSuboard);
  };

  // function that creates new task
  const addNewTask = () => {
    const newTasked = [...newTask];
    const objDrop = newTasked.find((obj) => obj.dropDownOption);
    console.log(objDrop.subTasks);
    const subTaskFinderFromInputArray = newTasked.find(
      (obj) => obj.subTasks
    ).subTasks;
    objDrop.dropDownOption = {
      ...optVal,
      Tasks: [
        {
          ...newTask[0],
          description: newTask[1].value,
          subTasks: subTaskFinderFromInputArray,
        },
      ],
    };
    deleteSubTask();
    setNewTask(newTasked);

    //function that checks if any inpu field is empty
    const emptyInputValidationCheck = newTask.some((item, index) => {
      if (index == 2) {
        return item.subTasks.some((subItem, index) => subItem.value == "");
      }
      return item.value == "";
    });

    if (emptyInputValidationCheck) {
      props.setAddOverlay(true);
      return;
    } else {
      props.setAddOverlay(false);
      const dataToBePassed = {
        boardId: itemInFocus.id,
        subBoardId: objDrop.dropDownOption.id,
        newTask: {
          id: newTask[0].id,
          title: newTask[0].value,
          description: newTask[1].value,
          subTasks: subTaskFinderFromInputArray,
        },
      };

      dispatch({
        type: "ADD_TASK",
        payload: dataToBePassed,
      });
    }
  };

  return (
    <div
      className={light ? "add-overlay" : "add-overlay dark"}
      onClick={() => props.setAddOverlay(false)}
    >
      <div
        className="add-cover"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="add-prompt">add new task</h4>
        {newTask.map((task, index) => {
          if (index == 0) {
            return (
              <div className="l-title">
                <label className="label">task name</label>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    handleChange(e, task.id);
                  }}
                />
              </div>
            );
          }
        })}
        {newTask.map((task, index) => {
          if (index == 1) {
            return (
              <div className="l-title">
                <label className="label">description</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  onChange={(e) => {
                    handleChange(e, task.id);
                  }}
                ></textarea>
              </div>
            );
          }
        })}
        <div className="columns-pack">
          <label className="label">Subtasks</label>
          {newTask[2].subTasks.map((t, index) => {
            return (
              <div className="input-pack" key={t.id}>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    handleChange(e, t.id);
                  }}
                />
                <img src={close} onClick={() => deleteSubTask(t.id)} alt="" />
              </div>
            );
          })}
          <div className="column-btn" onClick={addNewField}>
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
            {statusAspects.map((item) => {
              return (
                <option key={item.id} id={item.id} value={item.value}>
                  {item.value}
                </option>
              );
            })}
            {/* <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option> */}
          </select>
        </div>
        <div className="column-btn" onClick={addNewTask}>
          create task
        </div>
      </div>
    </div>
  );
};

export default AddOverlay;
