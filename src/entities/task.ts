import { File } from './file';
import { Subject } from './subject';
import { User } from './user';

export enum TaskStatuses {
  done = 'done',
  onReview = 'onReview',
  toDo = 'toDo',
}

export enum TaskStatusesLabels {
  done = 'Сделано',
  onReview = 'На проверке',
  toDo = 'Сделать',
}

export interface TaskFile {
  id: number;
  file: File;
}

export type GradeMark = 2 | 3 | 4 | 5;

export interface Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatuses;
  grade: GradeMark | null;
  createdAt: Date;
  updatedAt: Date;
  subject: Subject;
  student: User;
  teacher: User;
  response: TaskFile[];
  application: TaskFile[];
}
