import React from "react";
import { useDragLayer } from "react-dnd";
import { DragPreviewWrapper, CustomDragLayerContainer } from "./styles";
import { Column } from "./Column";
import { Card } from "./Card";
import { useTrelloDataContext } from "./context/TrelloDataLayer";

export function CustomDragLayer() {
  const { draggedItem } = useTrelloDataContext()
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column
            id={draggedItem.id}
            columnName={draggedItem.columnName}
            isPreview
          />
        ) : (
          <Card
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
            listId={draggedItem.listId}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
}
