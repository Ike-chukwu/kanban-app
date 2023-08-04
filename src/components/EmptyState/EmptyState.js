import React, { useState, useContext } from "react";
import "./EmptyState.scss";
import NewBoardOverlay from "../NewBoardOverlay/NewBoardOverlay";
import { AuthContext } from "../context/auth-context";


const EmptyState = () => {
  const [newBoard, setNewBooard] = useState(false);
  const { light } = useContext(AuthContext);


  const popBoard = () => {
    setNewBooard(true)
  }


  return (
    <div className={light? "empty" : "dark empty"}>
      <p>There are no boards available. Create a new board to get started</p>
      <div className="column-btn" onClick={popBoard}>+ Add New Board</div>

      {newBoard && (
        <NewBoardOverlay
          boardOverlay={newBoard}
          setBoardOverlay={setNewBooard}
        />
      )}
    </div>
  );
};

export default EmptyState;
