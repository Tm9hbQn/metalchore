import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { useAppState } from '../hooks/useAppState';
import { TaskCard } from '../components/TaskCard';
import { FAB } from '../components/FAB';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = ({ onTaskClick, greeting }: { onTaskClick: (task: Task | null) => void; greeting: string }) => {
  const { tasks, setTasks, addLog } = useAppState();
  const [toast, setToast] = useState<{ id: string; title: string } | null>(null);

  const handleSwipeRight = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Optimistically remove from view
    setTasks((prev: Task[]) => prev.filter((t: Task) => t.id !== id));
    addLog(`Task ${id} completed (swiped)`);

    // Show Toast
    setToast({ id, title: task.title });
  };

  const handleUndo = () => {
    if (!toast) return;
    const restoredTask: Task = {
        id: toast.id,
        title: toast.title,
        status: 'active',
        assignee: 'me',
        missCount: 0
    };
    setTasks(prev => [...prev, restoredTask]);
    setToast(null);
    addLog(`Task ${toast.id} undo`);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (toast) {
      timer = setTimeout(() => {
        setToast(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [toast]);

  const activeTasks = tasks.filter((t: Task) => t.status !== 'failed' && t.status !== 'done');

  return (
    <div className="pb-24 relative" dir="rtl">
      <main className="p-4 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-gray-200"
        >
          {greeting}
        </motion.h1>

        <h2 className="text-sm text-red-500/80 mb-4 font-bold tracking-wider uppercase">העינויים שלכם להיום</h2>

        <AnimatePresence>
          {activeTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              onSwipeRight={handleSwipeRight}
            />
          ))}
        </AnimatePresence>

        {activeTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-20 text-gray-500 flex flex-col items-center glass-card p-8 rounded-2xl"
          >
            <span className="text-6xl mb-4 opacity-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">❄️</span>
            <p className="text-xl font-bold text-gray-300">הגיהנום קפא.</p>
            <p className="mt-2 text-gray-500 text-sm">פנויים להיום. לכו תנוחו לפני שייזכרו בכם.</p>
          </motion.div>
        )}
      </main>

      <FAB onClick={() => onTaskClick(null)} />

      {/* Undo Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 bg-gray-900 border border-red-500/30 rounded-xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.8)] z-40"
          >
            <span className="text-sm text-gray-300">סומן כבוצע. רגע, טעות?</span>
            <button
              onClick={handleUndo}
              className="text-red-500 font-bold bg-red-500/10 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              בטל (Undo)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
