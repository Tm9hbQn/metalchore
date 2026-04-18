import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { useAppState } from '../hooks/useAppState';
import { TaskCard } from '../components/TaskCard';
import { FAB } from '../components/FAB';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Home = ({ onTaskClick, greeting }: { onTaskClick: (task: Task | null) => void; greeting: string }) => {
  const { tasks, setTasks, addLog } = useAppState();
  const [toast, setToast] = useState<{ id: string; title: string } | null>(null);

  const triggerConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#000000', '#F97316'] // Red, Black, Orange
    });
  };

  const handleSwipeRight = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Optimistically remove from view
    setTasks((prev: Task[]) => prev.filter((t: Task) => t.id !== id));
    addLog(`Task ${id} completed (swiped)`);

    triggerConfetti();

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

  // Sorting: My tasks -> Shared tasks -> Partner tasks -> Rotation
  const sortedTasks = [...activeTasks].sort((a, b) => {
      const order = { 'me': 1, 'both': 2, 'partner': 3, 'rotation': 4 };
      return order[a.assignee] - order[b.assignee];
  });

  return (
    <div className="pb-24 relative min-h-[80vh]" dir="rtl">
      {/* Decorative background skulls/flames floating subtly */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 text-6xl">💀</motion.div>
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-20 right-10 text-6xl">🔥</motion.div>
      </div>

      <main className="p-4 pt-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black mb-6 text-black drop-shadow-sm"
        >
          {greeting}
        </motion.h1>

        <h2 className="text-sm text-red-600 mb-4 font-bold tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            העינויים שלכם להיום
        </h2>

        <AnimatePresence mode="popLayout">
          {sortedTasks.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task)}
              onSwipeRight={handleSwipeRight}
            />
          ))}
        </AnimatePresence>

        {sortedTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-20 text-gray-800 flex flex-col items-center bg-white border-2 border-black p-8 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="text-6xl mb-4 grayscale drop-shadow-md">🥶</span>
            <p className="text-xl font-black text-black">הגיהנום קפא.</p>
            <p className="mt-2 text-gray-600 text-sm font-medium">פנויים להיום. לכו תנוחו לפני שייזכרו בכם.</p>
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
            className="fixed bottom-24 left-4 right-4 bg-white border-2 border-black rounded-xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50"
          >
            <span className="text-sm font-bold text-black">סומן כבוצע. רגע, טעות?</span>
            <button
              onClick={handleUndo}
              className="text-white font-bold bg-black px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] active:translate-y-1 active:shadow-none"
            >
              בטל (Undo)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
