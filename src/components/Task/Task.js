import React, { useState, useContext } from "react";
import "./Task.scss";
import SubtaskOverlay from "../SubtaskOverlay/SubtaskOverlay";

const Task = (props) => {
  //state that monitors subtask overlay display
  const [subtaskOverlay, setsubtaskOverlay] = useState(false);

  //stores the id of the clicked task so as to render subtasks specific to the clicked task
  const [taskID, setTaskID] = useState();

  //function that closes subtask overlay
  const handleOverlayClose = () => {
    setsubtaskOverlay(false);
  };

  //returns the array of tasks passed as a prop to the task component in form of cards
  return props.tasks.map((task) => {

    //gets the checked property from each subtask
    // const checkedStateProp = task.subTasks.map((sTask) => sTask.checked);
    // const countCheckedBoses = () => checkedStateProp.filter(Boolean).length;

    return (
      <div
        className="todo-pack"
        onClick={() => {
          setsubtaskOverlay(true);
          setTaskID(task.id);
        }}
        key={task.id}
      >
        <p className="title">{task.title}</p>
        <span className="tracker">{countCheckedBoses()} of {task.subTasks.length} subtasks</span>

        <SubtaskOverlay
          task="me"
          subBoard={props.subBoard}
          subBoardId={props.subBoardID}
          testID={taskID}
          titleName={task.title}
          taskId={task.id}
          ellipsis={props.ellipsis}
          subTasks={task.subTasks}
          setDisplay={props.setDisplay}
          display={props.display}
          setEditOverlay={props.setEditOverlay}
          setDeleteOverlay={props.setDeleteOverlay}
          editOverlay={props.editOverlay}
          deleteOverlay={props.deleteOverlay}
          onOverlayClose={handleOverlayClose}
          subBoardsArray={props.subBoards}
          subtaskOverlay={subtaskOverlay}
        />
      </div>
    );
  });
};

export default Task;
