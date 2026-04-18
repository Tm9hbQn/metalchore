import type { Task } from '../types';
import { useAppState } from '../hooks/useAppState';
import { TaskCard } from '../components/TaskCard';
import { FAB } from '../components/FAB';
import { TopBar } from '../components/TopBar';
import { AnimatePresence } from 'framer-motion';

export const Home = ({ onTaskClick, onSettingsClick }: { onTaskClick: (task: Task | null) => void; onSettingsClick: () => void }) => {
  const { tasks, setTasks, addLog } = useAppState();

  const handleSwipeRight = (id: string) => {
    setTasks((prev: Task[]) => prev.filter((t: Task) => t.id !== id));
    addLog(`Task ${id} completed (swiped)`);
    // In real app, show undo toast here
  };

  const activeTasks = tasks.filter((t: Task) => t.status !== 'failed' && t.status !== 'done');

  return (
    <div className="min-h-screen pb-24 relative">
      <TopBar onSettingsClick={onSettingsClick} />

      <main className="p-4 pt-6">
        <h2 className="text-sm text-gray-500 mb-4 font-bold tracking-wider">המטלות שלך</h2>

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
          <div className="text-center mt-20 text-gray-600">
            <p>אין מטלות כרגע.</p>
            <p>גן עדן עלי אדמות?</p>
          </div>
        )}
      </main>

      <FAB onClick={() => onTaskClick(null)} />
    </div>
  );
};
