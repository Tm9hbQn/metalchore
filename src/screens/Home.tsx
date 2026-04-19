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
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
        {/* Static Moon */}
        <div className="absolute top-8 left-12 text-7xl opacity-80 mix-blend-overlay">🌕</div>

        {/* Floating entities */}
        <motion.div animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-24 left-10 text-5xl">💀</motion.div>
        <motion.div animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-32 right-10 text-6xl text-red-900 drop-shadow-lg">🔥</motion.div>
        <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-48 right-16 text-5xl">🦇</motion.div>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-10 left-20 text-6xl">🪦</motion.div>

        {/* Bird flying across screen */}
        <motion.div
            initial={{ x: '120vw', y: 50 }}
            animate={{ x: '-20vw', y: 100 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 3 }}
            className="absolute text-4xl"
        >
            🦅
        </motion.div>
      </div>


      <main className="p-4 pt-6 relative z-10">

        {/* View Toggle */}
        <div className="flex bg-[#1a1a1a] p-1 rounded-xl mb-6 border border-[#333] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            <button
                onClick={() => setViewMode('me')}
                className={`flex-1 py-3 text-sm font-black rounded-lg transition-all duration-300 ${viewMode === 'me' ? 'bg-[#39FF14] text-black shadow-[0_0_15px_rgba(57,255,20,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}
            >
                המטלות שלי
            </button>
            <button
                onClick={() => setViewMode('partner')}
                className={`flex-1 py-3 text-sm font-black rounded-lg transition-all duration-300 ${viewMode === 'partner' ? 'bg-[#8A0303] text-white shadow-[0_0_15px_rgba(138,3,3,0.5)]' : 'text-gray-500 hover:text-gray-300'}`}
            >
                המטלות שלו/ה
            </button>
        </div>

        {todayTasks.length > 0 && (
            <div className="mb-8">
                <h2 className="text-xl text-[#39FF14] mb-4 font-black tracking-widest uppercase flex items-center gap-2 drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">
                    <span className="w-3 h-3 bg-[#39FF14] rounded-sm animate-pulse" />
                    העינויים של היום
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
                    מחר נבכה
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
                    מתישהו בגיהנום
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
            className="text-center mt-20 text-gray-300 flex flex-col items-center bg-[#1a1a1a] border-2 border-[#333] p-8 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="text-6xl mb-4 grayscale drop-shadow-md">🥶</span>
            <p className="text-xl font-black text-white">הגיהנום קפא.</p>
            <p className="mt-2 text-gray-400 text-sm font-medium">אין עינויים כרגע. אפשר לחזור לישון במערה.</p>

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
