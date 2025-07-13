export interface taskProp {
  id: string;
  title: string;
  status: 'new' | 'ongoing' | 'done';
  description: string;
  dueDate: string;
}

export interface OptionsListMenuProps {
  activeTag: number;
  shiftTask: (index: number, task: taskProp) => void;
  itemSelected: taskProp | null;
  setDisplayOptions: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTask: (task: taskProp) => void;
}