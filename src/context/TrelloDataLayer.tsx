import React, {createContext, useContext, useState } from 'react';
import { List, MoveList, MoveTask, Task } from './listsTypes';
import { findItemById, findItemIndexById, moveItem } from '../utils/arrayUtils';
import { DragItem } from '../DragItem';

interface TrelloDataContextPageProps{
children:any
}


 const TrelloDataLayerContext = createContext();

export const TrelloDataPage = ({children}:TrelloDataContextPageProps) => {
    const [lists, setLists] = useState<List[]>([{
        id: "4f90d13a42",
        columnName: "Todo",
        tasks: [],
      },
      {
        id: "4f90d13a43",
        columnName: "Proceeding",
        tasks: [],
      },
    ]);
    const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

    const addNewList = (list:List) => {
        const newList = {
        id:list.id,
        columnName:list.columnName,
        tasks:list.tasks
        }
        setLists([...lists, newList])
      };
      const removeList = (id:string) => {
        lists.filter((list: List) => {
            if (list.id === id) {
              setLists([...lists])
            }
          })
      };
     const addNewTask = (task:Task) => {
        const newTask = {
             id:task.id,
             listId:task.listId,
             text:task.text
        }
        const list = findItemById(lists, task.listId);
        list?.tasks.push(newTask);
        //setTasks([...list?.tasks, newTask])
      };
     const moveList = (moveList:MoveList) => {
        const { draggedId, hoveredId } = moveList;
        const draggedIndex = findItemIndexById(lists, draggedId);
        const hoverIndex = findItemIndexById(lists, hoveredId);
         moveItem(lists, draggedIndex, hoverIndex);
      };
      const moveTask = (moveTask:MoveTask) => {
        const { draggedId, hoveredId, sourceListId, targetListId, draggedItem } =
          moveTask;
        const sourceListIndex = findItemIndexById(lists, sourceListId);
        const targetListIndex = findItemIndexById(lists, targetListId);
        const dragIndex = findItemIndexById(
            lists[sourceListIndex].tasks,
            draggedId
          );
    
          const hoverIndex = findItemIndexById(
            lists[targetListIndex].tasks,
            hoveredId
          );
    
          lists[sourceListIndex].tasks.splice(dragIndex, 1);
          lists[targetListIndex].tasks.splice(hoverIndex, 0, draggedItem);
      }

      const handleSetDraggedItem = (touch:DragItem | null) => {
       setDraggedItem(touch)
      }

  //   export const draggedItemSelector = (state: RootState) =>
  // state.listsSlice.draggedItem;

    return (
      <TrelloDataLayerContext.Provider
      value={{
        lists,
        addNewList,
        removeList,
        addNewTask,
        handleSetDraggedItem,
        draggedItem,
        moveTask,
        moveList
    }}
      >
      {children}
      </TrelloDataLayerContext.Provider>
    )
}

export const useTrelloDataContext = () =>  useContext(TrelloDataLayerContext)



