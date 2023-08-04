import "./App.scss";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import DropDownMenu from "./components/DropDownMenu/DropDownMenu";
import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import EmptyState from "./components/EmptyState/EmptyState";
import { AuthContext } from "./components/context/auth-context";


function App() {
  const { light } = useContext(AuthContext);
  const dataPack = useSelector((state) => state);
  
  const boardData = dataPack.boards;

  const [dropStatus, setDropStatus] = useState(false);

  const dropDownToggler = () => {
    setDropStatus(!dropStatus);
  };

  const lightA =JSON.parse(localStorage.getItem('mode', light))



  if (boardData.length > 0) {
    return (
      <div className={light ? "App" : "dark"}>
        <Nav dropDownToggler={dropDownToggler} dropStatus={dropStatus} />
        <DropDownMenu
          dropDownToggler={dropDownToggler}
          dropStatus={dropStatus}
        />
        <div className={light ? "app-container" : "app-container dark"}>
          <Sidebar />
          <Home />
        </div>
      </div>
    );
  } else {
    return <EmptyState />;
  }
}

export default App;
