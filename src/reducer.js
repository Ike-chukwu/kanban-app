import { createStore } from "redux";

const INITIAL_BOARD_STATE = {
  boards: [
    // {
    //   id: 1,
    //   value: "board 1",
    //   subBoards: [
    //     {
    //       id: 1 * 100,
    //       value: "Sub board",
    //       Tasks: [
    //         {
    //           id: 1 * 15,
    //           title: "task 1",
    //           description: "description 1",
    //           subTasks: [
    //             {
    //               id: 1 * 45,
    //               value: "sub-task 1",
    //               checked:false
    //             },
    //             {
    //               id: 2 * 4533,
    //               value: "sub-task 2",
    //               checked:false
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ],
};

const reducer = (state = INITIAL_BOARD_STATE, action) => {
  switch (action.type) {
    // creates new boards and subboards
    case "ADD_BOARD_AND_SUB_BOARD":
      const board = action.payload[0];
      const subBoards = action.payload.slice(1);
      const newBoard = {
        ...board,
        subBoards: subBoards,
      };
      return { ...state, boards: [...state.boards, newBoard] };

    //creates new task
    case "ADD_TASK":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id === action.payload.boardId) {
            return {
              ...board,
              subBoards: board.subBoards.map((subBoard) => {
                if (subBoard.id === action.payload.subBoardId) {
                  return {
                    ...subBoard,
                    Tasks: subBoard.Tasks
                      ? [...subBoard.Tasks, action.payload.newTask]
                      : [action.payload.newTask],
                  };
                }
                return subBoard;
              }),
            };
          }
          return board;
        }),
      };

    //deletes subboard
    case "SUBBOARD_DELETE":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id == action.payload.boardId) {
            return {
              ...board,
              subBoards: board.subBoards.filter(
                (subBoard) => subBoard.id !== action.payload.subBoardId
              ),
            };
          }
          return board;
        }),
      };

    //edit and create new subboard(s)
    case "COLUMN_EDIT":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id == action.payload.boardId) {
            return {
              ...board,
              value: action.payload.boardValue,
              subBoards: board.subBoards
                ?.map((subBoard) => {
                  const matchingSubBoards = action.payload.boardColums.find(
                    (obj) => obj.id == subBoard.id
                  );
                  if (matchingSubBoards) {
                    return {
                      ...subBoard,
                      value: matchingSubBoards.value,
                    };
                  }
                  return subBoard;
                })
                .concat(
                  // Add new sub-boards from the boardColumns payload
                  action.payload.boardColums.filter(
                    (sub) =>
                      !board.subBoards.some(
                        (existingSub) => existingSub.id === sub.id
                      )
                  )
                ),
            };
          }
          return board;
        }),
      };

    case "DELETE_BOARD":
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payload),
      };

    case "DELETE_SUB_TASK":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id == action.payload.boardId) {
            return {
              ...board,
              subBoards: board.subBoards.map((subBoard) => {
                if (subBoard.id == action.payload.subBoardID) {
                  return {
                    ...subBoard,
                    Tasks: subBoard.Tasks.map((task) => {
                      if (task.id == action.payload.taskId) {
                        return {
                          ...task,
                          subTasks: task.subTasks.filter(
                            (subTask) => subTask.id !== action.payload.subTaskId
                          ),
                        };
                      }
                      return task;
                    }),
                  };
                }
                return subBoard;
              }),
            };
          }
          return board;
        }),
      };

    case "EDIT_TASK":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id == action.payload.boardId) {
            return {
              ...board,
              subBoards: board.subBoards.map((subBoard) => {
                if (subBoard.id == action.payload.subBoardID) {
                  return {
                    ...subBoard,
                    Tasks: subBoard.Tasks.map((task) => {
                      if (task.id == action.payload.taskId) {
                        return {
                          ...task,
                          title: action.payload.taskValue,
                          description: action.payload.description,
                          subTasks: task.subTasks
                            .map((subTask) => {
                              const matchingSubTask =
                                action.payload.subTasks.find(
                                  (exist) => exist.id == subTask.id
                                );
                              if (matchingSubTask) {
                                return {
                                  ...subTask,
                                  value: matchingSubTask.value,
                                  checked: matchingSubTask.checked,
                                };
                              }
                              return subTask;
                            })
                            .concat(
                              action.payload.subTasks.filter(
                                (subTask) =>
                                  !task.subTasks.some(
                                    (verify) => verify.id == subTask.id
                                  )
                              )
                            ),
                        };
                      }
                      return task;
                    }),
                  };
                }
                return subBoard;
              }),
            };
          }
          return board;
        }),
      };

    case "DELETE_TASK":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id == action.payload.boardId) {
            return {
              ...board,
              subBoards: board.subBoards.map((subBoard) => {
                if (subBoard.id == action.payload.subBoardId) {
                  return {
                    ...subBoard,
                    Tasks: subBoard.Tasks.filter(
                      (task) => task.id !== action.payload.taskID
                    ),
                  };
                }
                return subBoard;
              }),
            };
          }
          return board;
        }),
      };

    case "CHANGE_SUBBOARD":
      return {
        ...state,
        boards: state.boards.map((board) => {
          if (board.id == action.payload.boardId) {
            return {
              ...board,
              subBoards: board.subBoards.map((subBoard) => {
                if (subBoard.id == action.payload.subBoardId) {
                  const taskExists = subBoard.Tasks.some(
                    (task) => task.id == action.payload.taskId
                  );

                  if (!taskExists) {
                    return {
                      ...subBoard,
                      Tasks: [...subBoard.Tasks, action.payload.taskDetails],
                    };
                  }
                } else {
                  return {
                    ...subBoard,
                    Tasks: subBoard.Tasks.filter(
                      (task) => task.id !== action.payload.taskId
                    ),
                  };
                }
              }),
            };
          }
          return board;
        }),
      };

    default:
      return state;
  }
};

// Save the state to localStorage whenever there is a change in the Redux store
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle errors here
  }
};

// Load the state from localStorage when the app loads
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined; // Return undefined to fall back to the initialState
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined; // Return undefined to fall back to the initialState
  }
};

// const store = createStore(reducer);

// Create the Redux store and use the persisted state as the initial state
const persistedState = loadStateFromLocalStorage();
const store = createStore(reducer, persistedState);

// Subscribe to store changes and save the state to localStorage
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
