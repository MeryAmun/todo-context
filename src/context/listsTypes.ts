
import type { DragItem } from "../DragItem";
export type Task = {
  type?: string;
  id: string;
  listId: string;
  text: string;
};

export type List = {
  id: string;
  columnName: string;
  tasks: Task[];
};

export type MoveList = {
  draggedId: string;
  hoveredId: string;
};

export type MoveTask = {
  draggedId: string;
  hoveredId: string | null;
  sourceListId: string;
  targetListId: string;
  draggedItem: Task;
};

export type Lists = {
  lists: List[];
  draggedItem: DragItem | null;
};


