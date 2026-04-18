import { useState, type ReactNode } from 'react';
import { AppStateContext } from './AppStateContext';
import type { Task } from '../types';

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'לנקות את ארגז החול', assignee: 'me', status: 'active', missCount: 0 },
    { id: '2', title: 'להוריד זבל', assignee: 'partner', status: 'purgatory', missCount: 1 },
  ]);
  const [logs, setLogs] = useState<string[]>(['App initialized']);
  const currentUser = 'User1';

  const addLog = (msg: string) => setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${msg}`]);

  return (
    <AppStateContext.Provider value={{ tasks, setTasks, currentUser, logs, addLog }}>
      {children}
    </AppStateContext.Provider>
  );
};
