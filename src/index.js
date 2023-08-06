import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "/Users/IK/Desktop/web development/frontendmentor.io challenges/kanbanApp/my-app/src/reducer";
import { AuthProvider } from "./components/context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </Provider>
);
