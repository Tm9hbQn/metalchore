import type { Dispatch, SetStateAction } from 'react';

export type TaskStatus = 'active' | 'done' | 'purgatory' | 'pardoned' | 'failed';
export type Assignee = 'me' | 'partner' | 'rotation' | 'both';

export interface SubTask {
    id: number;
    label: string;
    checked: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: Assignee;
  status: TaskStatus;
  deadline?: string;
  missCount: number;
  subtasks?: SubTask[];
  recurring?: boolean;
}

export interface AppStateContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  currentUser: string;
  logs: string[];
  addLog: (msg: string) => void;
}
