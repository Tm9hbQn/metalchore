import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../../hooks/useAppState';
import type { Task } from '../../types';
import { TaskCard } from '../../components/TaskCard';

const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

export const WeeklyView = ({ onTaskClick }: { onTaskClick: (task: Task | null) => void }) => {
  const { tasks, setTasks, addLog } = useAppState();
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());

  const handleSwipeRight = (id: string) => {
    setTasks((prev: Task[]) => prev.filter((t: Task) => t.id !== id));
    addLog(`Task ${id} completed from weekly view`);
  };

  // Basic mock filtering based on deadline text or just random distribution for demo if deadline isn't a day
  const filteredTasks = tasks.filter((t) => {
    if (t.status === 'done' || t.status === 'failed') return false;
    // Real implementation would parse actual dates.
    // For demo, we just assign them arbitrarily if they don't match a day string.
    if (t.deadline === 'היום' && selectedDay === new Date().getDay()) return true;
    if (t.deadline === 'מחר' && selectedDay === (new Date().getDay() + 1) % 7) return true;
    if (DAYS.includes(t.deadline || '')) return t.deadline === DAYS[selectedDay];

    // Fallback: show everything on today for the demo if it has no specific day
    if (!t.deadline && selectedDay === new Date().getDay()) return true;
    return false;
  });

  return (
    <div className="pb-24 relative" dir="rtl">
      <main className="p-4 pt-6">
        <h2 className="text-2xl font-black mb-6 text-black drop-shadow-sm">לו"ז שבועי</h2>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide snap-x">
          {DAYS.map((day, index) => (
            <button
              key={day}
              onClick={() => setSelectedDay(index)}
              className={`snap-center shrink-0 px-4 py-2 rounded-xl border-2 transition-all font-bold ${
                selectedDay === index
                  ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]'
                  : 'bg-white text-gray-500 border-gray-300 hover:border-black hover:text-black'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-3">
            <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => onTaskClick(task)}
                    onSwipeRight={handleSwipeRight}
                />
                ))
            ) : (
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-10 text-gray-500 flex flex-col items-center bg-white p-8 rounded-2xl border-2 border-dashed border-gray-300"
                >
                <span className="text-4xl mb-4 grayscale opacity-50">🪦</span>
                <p className="text-lg font-bold text-gray-400">אין פה כלום ליום הזה.</p>
                <p className="text-sm">זמן לנוח על זרי הדפנה.</p>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
