import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend as Backend } from "react-dnd-html5-backend";
import { App } from "./App";
import "./index.css";

import { TrelloDataPage } from "./context/TrelloDataLayer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DndProvider backend={Backend}>
   
      <TrelloDataPage>
      <App />
      </TrelloDataPage>
 
    </DndProvider>
  </React.StrictMode>
);
