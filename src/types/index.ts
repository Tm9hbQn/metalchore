import type { Dispatch, SetStateAction } from 'react';

export type TaskStatus = 'active' | 'done' | 'purgatory' | 'pardoned' | 'failed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: 'me' | 'partner' | 'rotation' | 'both';
  status: TaskStatus;
  deadline?: string;
  missCount: number;
}

export interface AppStateContextType {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  currentUser: string;
  logs: string[];
  addLog: (msg: string) => void;
}
