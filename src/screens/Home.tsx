import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { useAppState } from '../hooks/useAppState';
import { TaskCard } from '../components/TaskCard';
import { FAB } from '../components/FAB';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Home = ({ onTaskClick }: { onTaskClick: (task: Task | null) => void; }) => {
  const { tasks, setTasks, addLog } = useAppState();
  const [toast, setToast] = useState<{ id: string; title: string } | null>(null);
  const [viewMode, setViewMode] = useState<'me' | 'partner'>('me');

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

  // Filter by view mode (always include shared)
  const viewTasks = activeTasks.filter(t => {
      if (t.assignee === 'both' || t.assignee === 'rotation') return true;
      if (viewMode === 'me' && t.assignee === 'me') return true;
      if (viewMode === 'partner' && t.assignee === 'partner') return true;
      return false;
  });

  // Group by deadline
  const todayTasks = viewTasks.filter(t => t.deadline === 'היום' || t.status === 'purgatory' || t.status === 'pardoned');
  const tomorrowTasks = viewTasks.filter(t => t.deadline === 'מחר');
  const otherTasks = viewTasks.filter(t => t.deadline !== 'היום' && t.deadline !== 'מחר' && t.status !== 'purgatory' && t.status !== 'pardoned');


  return (
    <div className="pb-24 relative min-h-[80vh]" dir="rtl">
      {/* Decorative background skulls/flames/bats floating subtly */}

      {/* Abstract floating background elements for continuous life */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
        <motion.div animate={{ y: [0, 30, 0], x: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-40 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
        <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 left-20 w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
      </div>




      <main className="p-4 pt-6 relative z-10">

        {/* View Toggle */}
        <div className="flex bg-white p-1 rounded-xl mb-6 border border-gray-200 shadow-sm">
            <button
                onClick={() => setViewMode('me')}
                className={`flex-1 py-3 text-sm font-black rounded-lg transition-all duration-300 ${viewMode === 'me' ? 'bg-blue-500 text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
            >
                המטלות שלי
            </button>
            <button
                onClick={() => setViewMode('partner')}
                className={`flex-1 py-3 text-sm font-black rounded-lg transition-all duration-300 ${viewMode === 'partner' ? 'bg-purple-500 text-gray-900 shadow-md' : 'text-gray-500 hover:text-gray-300'}`}
            >
                המטלות שלו/ה
            </button>
        </div>

        {todayTasks.length > 0 && (
            <div className="mb-8">
                <h2 className="text-xl text-blue-600 mb-4 font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-sm">
                    <span className="w-3 h-3 bg-blue-600 rounded-sm animate-pulse" />
                    משימות להיום
                </h2>
                <AnimatePresence mode="popLayout">
                {todayTasks.map((task: Task) => (
                    <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                    onSwipeRight={handleSwipeRight}
                    />
                ))}
                </AnimatePresence>
            </div>
        )}

        {tomorrowTasks.length > 0 && (
            <div className="mb-8 opacity-80">
                <h2 className="text-md text-gray-400 mb-4 font-bold tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full" />
                    משימות למחר
                </h2>
                <AnimatePresence mode="popLayout">
                {tomorrowTasks.map((task: Task) => (
                    <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                    onSwipeRight={handleSwipeRight}
                    />
                ))}
                </AnimatePresence>
            </div>
        )}

        {otherTasks.length > 0 && (
            <div className="mb-8 opacity-60">
                <h2 className="text-sm text-gray-500 mb-4 font-bold tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-600 rounded-full" />
                    בקרוב
                </h2>
                <AnimatePresence mode="popLayout">
                {otherTasks.map((task: Task) => (
                    <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                    onSwipeRight={handleSwipeRight}
                    />
                ))}
                </AnimatePresence>
            </div>
        )}

        {viewTasks.length === 0 && (

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-20 text-gray-300 flex flex-col items-center bg-white border-2 border-[#333] p-8 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="text-6xl mb-4 grayscale drop-shadow-md">✨</span>
            <p className="text-xl font-black text-gray-900">הכל נקי. אפשר לנוח.</p>
            <p className="mt-2 text-gray-400 text-sm font-medium">אין משימות להיום. תהנו!</p>

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
              className="text-gray-900 font-bold bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm active:translate-y-1 active:shadow-none"
            >
              בטל (Undo)
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
