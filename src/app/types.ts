export interface taskProp {
  id: string;
  title: string;
  status: 'new' | 'ongoing' | 'done';
  description: string;
  dueDate: string;
  selected: boolean;
}
