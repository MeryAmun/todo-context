import { useDrag } from "react-dnd";
import React, { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DragItem } from "../DragItem";
import { useTrelloDataContext } from "../context/TrelloDataLayer";


export const useDragItem = (item: DragItem) => {
  const { handleSetDraggedItem } = useTrelloDataContext()
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      handleSetDraggedItem(item);
      return item;
    },
    end: () => handleSetDraggedItem(null),
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
