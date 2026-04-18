import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { useAppState } from '../hooks/useAppState';
import { TaskCard } from '../components/TaskCard';
import { FAB } from '../components/FAB';
import { TopBar } from '../components/TopBar';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = ({ onTaskClick, onSettingsClick, greeting }: { onTaskClick: (task: Task | null) => void; onSettingsClick: () => void; greeting: string }) => {
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
    // For now, this just refreshes the list from our mock state,
    // in real app it would cancel the API call.
    // Let's just add a dummy task back for visual effect if we really want,
    // but standard reload might be easier. Let's mutate state back.
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
    <div className="min-h-screen pb-24 relative bg-[#0A0A0A] text-white" dir="rtl">
      <TopBar onSettingsClick={onSettingsClick} />

      <main className="p-4 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-gray-200"
        >
          {greeting}
        </motion.h1>

        <h2 className="text-sm text-gray-500 mb-4 font-bold tracking-wider">העינויים שלכם</h2>

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
            className="text-center mt-20 text-gray-500 flex flex-col items-center"
          >
            <span className="text-6xl mb-4 opacity-50">❄️</span>
            <p className="text-xl font-bold">הגיהנום קפא.</p>
            <p className="mt-2 text-gray-600">פנויים להיום. לכו תנוחו לפני שייזכרו בכם.</p>
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
            className="fixed bottom-24 left-4 right-4 bg-gray-900 border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-2xl z-40"
          >
            <span className="text-sm">סומן כבוצע. רגע, טעות?</span>
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
