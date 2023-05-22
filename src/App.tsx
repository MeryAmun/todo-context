import React from "react";
import { nanoid } from "nanoid";
import { CustomDragLayer } from "./CustomDragLayer";
import type { List } from "./context/listsTypes";

import { AppContainer } from "./styles";
import { Column } from "./Column";
import { AddNewItem } from "./AddNewItem";
import { useTrelloDataContext } from "./context/TrelloDataLayer";

export function App() {
  const {lists,addNewList }= useTrelloDataContext();
console.log(lists);

  const handleAddNewList = (list: List) => {
   addNewList(list);
  };
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists &&
        lists.map(({ columnName, tasks, id }) => (
          <Column key={id} id={id} columnName={columnName} tasks={tasks} />
        ))}
      <AddNewItem
        listId={nanoid()}
        onAddNewList={handleAddNewList}
        toggleButtonText="+Add Column"
      />
    </AppContainer>
  );
}
