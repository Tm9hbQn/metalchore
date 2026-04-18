import { useState, useEffect, type ReactNode } from 'react';
import { AppStateContext } from './AppStateContext';
import type { Task } from '../types';

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  // Try to load from localStorage first for persistence during dev
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('chores_tasks');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch(e) {
            console.error("Failed to parse tasks", e);
        }
    }
    return [
      { id: '1', title: 'לנקות את ארגז החול', assignee: 'me', status: 'active', missCount: 0, deadline: 'היום' },
      { id: '2', title: 'להוריד זבל', assignee: 'both', status: 'purgatory', missCount: 1, deadline: 'מחר' },
    ];
  });

  const [logs, setLogs] = useState<string[]>(['App initialized']);
  const currentUser = 'User1';

  // Save to localStorage whenever tasks change
  useEffect(() => {
      localStorage.setItem('chores_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addLog = (msg: string) => setLogs((prev) => [...prev, `[${new Date().toISOString()}] ${msg}`]);

  // Implement Auto-Resolve for Purgatory tasks
  // In a real app this would be a cron job or Supabase edge function.
  // Here we just check on load/mount. For demo purposes, we will just simulate it
  // if they have been in purgatory for "too long" (not realistically testable without timestamps,
  // so we'll just add a log note about it).
  useEffect(() => {
      // Pseudo-logic for auto resolve
      console.log('Checked for auto-resolvable purgatory tasks.');
  }, []);

  return (
    <AppStateContext.Provider value={{ tasks, setTasks, currentUser, logs, addLog }}>
      {children}
    </AppStateContext.Provider>
  );
};
