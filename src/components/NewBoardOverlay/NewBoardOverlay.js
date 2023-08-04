import React, { useState, useContext } from "react";
import "./NewBoardOverlay.scss";
import close from "../../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/auth-context";

const NewBoardOverlay = (props) => {
  // light state from context
  const { light } = useContext(AuthContext);

  //intial state of input fields in the overlay
  const [fields, setFields] = useState([
    { id: Math.random(), value: "" },
    { id: Math.random() * 24, value: "Todo", Tasks: [] },
    { id: Math.random() * 237, value: "Doing", Tasks: [] },
  ]);

  const dispatch = useDispatch();

  //function that creates empty input field
  const handleAddField = () => {
    const newField = { id: Date.now(), value: "", Tasks: [] };
    setFields([...fields, newField]);
  };

  //function that handles the text entered into the input field
  const handleChange = (e, id) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, value: e.target.value };
      }
      return field;
    });
    setFields(updatedFields);
  };

  // function that deletes any input field
  const deleteColumnEntry = (id) => {
    const updateAfterDelete = fields.filter((element) => element.id !== id);
    setFields(updateAfterDelete);
  };

  //function that creates new board
  const create = () => {
    const answer = fields.some((item) => item.value == "");
    if (answer) {
      props.setBoardOverlay(true);
      return;
    } else {
      props.setBoardOverlay(false);
      dispatch({
        type: "ADD_BOARD_AND_SUB_BOARD",
        payload: fields,
      });
    }
  };

  return (
    <div
      className={light ? "nB-overlay" : "dark nB-overlay"}
      onClick={() => props.setBoardOverlay(false)}
    >
      <div
        className="nB-cover"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="nB-prompt">Add new board</h4>
        <div className="l-title">
          <label className="label">board name</label>
          <input
            type="text"
            placeholder=""
            value={fields[0].value}
            onChange={(e) => handleChange(e, fields[0].id)}
          />
        </div>
        <div className="columns-pack">
          <label className="label">board columns</label>
          {fields.map((item, index) => {
            if (index == 0) {
              return;
            }
            return (
              <div className="input-pack" key={item.id}>
                <input
                  type="text"
                  placeholder=""
                  value={item.value}
                  onChange={(e) => {
                    handleChange(e, item.id);
                  }}
                />
                <img
                  src={close}
                  onClick={() => deleteColumnEntry(item.id)}
                  alt=""
                />
              </div>
            );
          })}

          <div className="column-btn" onClick={handleAddField}>
            + add new column
          </div>
        </div>
        <div className="long-btns-pack">
          <div className="column-btn" onClick={create}>
            Create New Board
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBoardOverlay;
