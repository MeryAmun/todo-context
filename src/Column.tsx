import React, { useRef,useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from "./utils/isHidden";
import { useDragItem } from "./utils/useDragItem";
import { ColumnContainer, ColumnTitle } from "./styles";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import type { Task } from "./context/listsTypes";
import { useTrelloDataContext } from "./context/TrelloDataLayer";

type ColumnProps = {
  id: string;
  columnName: string;
  isPreview?: boolean;
  tasks?: Task[];
};


export function Column({ columnName, id, isPreview,tasks }: ColumnProps) {
  const [newTasks, setNewTasks] = useState()
  const ref = useRef<HTMLDivElement>(null);
  const {
    addNewTask,
    moveList,
    moveTask,
    draggedItem,
    setDraggedItem,
  } = useTrelloDataContext()


 
  
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover: throttle(200, () => {
      if (!draggedItem) return;
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) return;
        const payload = {
          draggedId: draggedItem.id,
          hoveredId: id,
        };
        moveList(payload);
      } else {
        if (draggedItem.listId === id) return;
        if (tasks && tasks.length) return;
        const payload = {
          draggedId: draggedItem.id,
          hoveredId: null,
          sourceListId: draggedItem.listId,
          targetListId: id,
          draggedItem: { ...draggedItem, listId: id },
        };
     moveTask(payload);
       setDraggedItem({ ...draggedItem, listId: id });
      }
    }),
  });
  const { drag } = useDragItem({ type: "COLUMN", id, columnName });


  const handleAddNewTask =  (task: Task) => {
    addNewTask(task);
   setNewTasks([...tasks])
 console.log(task)
  };
  drag(drop(ref));
  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{columnName}</ColumnTitle>
      {
      newTasks?.map((task) => (
          <Card
            key={task.id}
            text={task.text}
            listId={task.listId}
            id={task.id}
          />
        ))}
      <AddNewItem
        toggleButtonText="+Add Task"
        listId={id}
        onAddNewTask={handleAddNewTask}
        dark
      />
    </ColumnContainer>
  );
}
