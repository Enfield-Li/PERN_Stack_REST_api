import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/User/UserState";
import PostProvider from "./contexts/Post/PostState";
import SocketProvider from "./contexts/SocketIo/SocketState";
import CommentProvider from "./contexts/Comments/CommentState";

ReactDOM.render(
  <BrowserRouter>
    <CommentProvider>
      <SocketProvider>
        <PostProvider>
          <UserProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </UserProvider>
        </PostProvider>
      </SocketProvider>
    </CommentProvider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
