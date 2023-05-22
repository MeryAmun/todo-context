import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from "./utils/isHidden";
import { useDragItem } from "./utils/useDragItem";
import { CardContainer } from "./styles";
import { useTrelloDataContext } from "./context/TrelloDataLayer";

type CardProps = {
  id: string;
  listId: string;
  text: string;
  isPreview?: boolean;
};

export function Card({ text, listId, isPreview, id }: CardProps) {
  const { draggedItem, handleSetDraggedItem, moveTask } = useTrelloDataContext();
  const { drag } = useDragItem({ type: "CARD", id, text, listId });
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) return;

      if (draggedItem.type !== "CARD") return;
      if (draggedItem.id === id) return;

      const payload = {
        draggedId: draggedItem.id,
        hoveredId: id,
        sourceListId: draggedItem.listId,
        targetListId: listId,
        draggedItem: { ...draggedItem, listId },
      };
    moveTask(payload);
      handleSetDraggedItem({ ...draggedItem, listId });
    }),
  });

  drag(drop(ref));
  console.log('message',text)
  return (
    <CardContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
    >
      {text}
    </CardContainer>
  );
}
