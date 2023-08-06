import React, { useEffect, useContext, useState } from "react";
import "./EditOverlay.scss";
import close from "../../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/auth-context";

const EditOverlay = (props) => {
  //close option modal when edit has been clicked

  const dispatch = useDispatch();
  const { light, checkValueExists, editBoardFunction } =
    useContext(AuthContext);
  const itemInFocus = checkValueExists();

  //extracts currently clicked board
  const boardExtract = { id: itemInFocus.id, value: itemInFocus.value };
  //extracts subboards from currently clicked board
  const subBoardsExt = itemInFocus.subBoards.map((item) => {
    const itemVal = item.value;
    const itemID = item.id;
    return { id: itemID, value: itemVal };
  });

  //state that stores the current board and subboard details
  const [itemsToBeEdited, setEdited] = useState([
    boardExtract,
    { subBoardsE: subBoardsExt },
  ]);
  

  //function that handles inout change in any if the input fields
  const handleChanger = (e, id) => {
    const newVal = e.target.value;
    const newUpdate = itemsToBeEdited.map((item) => {
      if (item.id == id) {
        return { ...item, value: newVal };
      } else if (item.subBoardsE) {
        const newArr = item.subBoardsE.map((itemZ) => {
          if (itemZ.id == id) {
            return { ...itemZ, value: newVal };
          }
          return itemZ;
        });
        return { ...item, subBoardsE: newArr };
      }
      return item;
    });

    setEdited(newUpdate);
  };

  //function that adds new subboards
  const addNewColumn = () => {
    const newSubBoard = { id: Math.random(), value: "", Tasks: [] };
    const stateCOpy = [...itemsToBeEdited];
    const secondElementCopy = { ...itemsToBeEdited[1] };
    secondElementCopy.subBoardsE = [
      ...secondElementCopy.subBoardsE,
      newSubBoard,
    ];
    stateCOpy[1] = secondElementCopy;
    setEdited(stateCOpy);
  };

  //function that deletes any subboard
  const deleteColumn = (id) => {
    const ArrayCpy = [...itemsToBeEdited];
    const scndEle = { ...ArrayCpy[1] };
    const arrayToBeUpd = [...scndEle.subBoardsE];
    const newArray = arrayToBeUpd.filter((item) => item.id !== id);
    scndEle.subBoardsE = newArray;
    ArrayCpy[1] = scndEle;
    setEdited(ArrayCpy);
    dispatch({
      type: "SUBBOARD_DELETE",
      payload: {
        boardId: itemInFocus.id,
        subBoardId: id,
      },
    });
  };

  //function that saves the newly added or edited subboards
  const save = () => {
    //returns true if any of the inputs is empty
    const validation = itemsToBeEdited.some((item, index) => {
      if (index == 1) {
        return item.subBoardsE.some((inner) => inner.value == "");
      }
      return item.value == "";
    });

    if (validation) {
      props.setEditOverlay(true);
      return;
    } else {
      editBoardFunction(itemsToBeEdited[0].value);
      dispatch({
        type: "COLUMN_EDIT",
        payload: {
          boardId: itemsToBeEdited[0].id,
          boardValue: itemsToBeEdited[0].value,
          boardColums: itemsToBeEdited[1].subBoardsE,
        },
      });
      props.setEditOverlay(false);
    }
  };

  return (
    <div
      className={light ? "e-overlay" : "dark e-overlay"}
      onClick={() => props.setEditOverlay(false)}
    >
      <div
        className="e-cover"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="e-prompt">Edit board</h4>
        {itemsToBeEdited.map((item, index) => {
          if (index == 0) {
            return (
              <div className="l-title" key={item.id}>
                <label className="label">board name</label>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => handleChanger(e, item.id)}
                  value={item.value}
                />
              </div>
            );
          }
        })}
        <div className="columns-pack">
          <label className="label">board columns</label>
          {itemsToBeEdited[1].subBoardsE?.map((item) => {
            return (
              <div className="input-pack" key={item.id}>
                <input
                  type="text"
                  placeholder=""
                  onChange={(e) => handleChanger(e, item.id)}
                  value={item.value}
                />
                <img src={close} alt="" onClick={() => deleteColumn(item.id)} />
              </div>
            );
          })}
          <div className="column-btn" onClick={addNewColumn}>
            + add new column
          </div>
        </div>
        <div className="long-btns-pack">
          <div className="column-btn" onClick={save}>
            save change
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOverlay;
