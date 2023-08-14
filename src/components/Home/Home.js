import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import "./Home.scss";
import ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import EditOverlay from "../EditOverlay/EditOverlay";
import Task from "../Task/Task";
import EmptyState from "../EmptyState/EmptyState";
import { AuthContext } from "../context/auth-context";

const Home = () => {
  
  const { checkValueExists,editBoardFunction,clickedItem } = useContext(AuthContext);

  
  //stores edit task overlay state
  const [editOverlay, setEditOverlay] = useState(false);

  //stores delete task overlay state
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  
  //stores ellipsis dropdown state
  const [display, setDisplay] = useState(false);

  //board data
  const dataPack = useSelector((state) => state);
  const boardData = dataPack.boards;

  // -currently clicked board---
  let itemInFocus = checkValueExists();
  // console.log(itemInFocus);
  
  //checking for currentboard and also checking whether the array of boards is empty
  if (boardData.length !== 0) {
    if (boardData.length == 1) {
      const firstActiveElement = boardData[0];
      itemInFocus = firstActiveElement;
      editBoardFunction(firstActiveElement.value);
    }
    return (
      <div className="homeContainer">
        {itemInFocus.subBoards.map((item) => {
          return (
            <div className="vertical-pack" key={item.id}>
              <label className="label">
                {item.value} ({item.Tasks.length})
              </label>
              <Task
                subBoard={item}
                subBoardID = {item.id}
                tasks={item.Tasks}
                ellipsis={ellipsis}
                setDisplay={setDisplay}
                display={display}
                setEditOverlay={setEditOverlay}
                setDeleteOverlay={setDeleteOverlay}
                editOverlay={editOverlay}
                deleteOverlay={deleteOverlay}
                subBoards={itemInFocus.subBoards}
              />
            </div>
          );
        })}
        <div
          className="new-vertical-pack"
          onClick={() => {
            setEditOverlay(true);
          }}
        >
          + New Column
        </div>

        {editOverlay && (
          <EditOverlay
            setEditOverlay={setEditOverlay}
            editOverlay={editOverlay}
          />
        )}
      </div>
    );
  } else if (boardData.length == 0) {
    return <EmptyState/>;
  }
};

export default Home;
