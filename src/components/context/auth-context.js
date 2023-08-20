import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //full  data from redux
  const dataPack = useSelector((state) => state);
  const boardData = dataPack.boards;


  const initialClickedItem =
  localStorage.getItem("active") ||
  (boardData.length > 0 ? boardData[0].value : "");


  //state to montior which board is clicked on the sidebar
  const [clickedItem, setClickedItem] = useState(initialClickedItem);

  const [data, setData] = useState(boardData);

  const [dropStatus, setDropStatus] = useState(false);

  const [subtaskOverlay, setsubtaskOverlay] = useState(false);

  const [light, setLight] = useState(localStorage.getItem("mode") === "true");

  //adding active class to a clicked board
  const clicked = (event) => {
    setClickedItem(event.target.textContent);
  };

  useEffect(() => {
    localStorage.setItem("active", clickedItem);
  }, [clickedItem]);

  const dropDownToggler = () => {
    setDropStatus(!dropStatus);
  };

  //function that sets clicked item's value to the value of the first new board created
  const editBoardFunction = (element) => {
    setClickedItem(element);
  };

  //function that toggles lightmode
  const modeToggler = () => {
    setLight(() => {
      localStorage.setItem("mode", !light);
      return !light;
    });
  };

  //returns the clicked board's object from the state managed in redux
  const checkValueExists = (state, valueToCheck) => {
    const answer = state.boards.find((board) => board.value == valueToCheck);
    return answer;
  };

  return (
    <AuthContext.Provider
      value={{
        listOfData: data,
        clickedItem: clickedItem,
        clickedItemClass: clickedItem,
        clickHandler: (event) => clicked(event),
        checkValueExists: () => checkValueExists(dataPack, clickedItem),
        subtaskOverlay,
        setsubtaskOverlay,
        editBoardFunction,
        light,
        modeToggler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

