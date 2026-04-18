import { motion } from 'framer-motion';
import type { Task } from '../types';
import { Clock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const TaskCard = ({ task, onClick, onSwipeRight }: { task: Task; onClick: () => void; onSwipeRight?: (id: string) => void }) => {
  const isPurgatory = task.status === 'purgatory';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      whileTap={{ scale: 0.98 }}
      drag={onSwipeRight ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_e, info) => {
        if (onSwipeRight && info.offset.x > 100) {
          onSwipeRight(task.id);
        }
      }}
      className={twMerge(
        'p-4 rounded-xl mb-3 cursor-pointer select-none glass-card relative overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(138,3,3,0.2)]',
        isPurgatory ? 'border-red-500/50 shadow-[0_0_15px_rgba(138,3,3,0.3)]' : 'border-white/10'
      )}
      onClick={onClick}
      dir="rtl"
    >
      {isPurgatory && (
        <div className="absolute inset-0 bg-red-500/5 pointer-events-none animate-pulse" />
      )}

      <div className="flex justify-between items-start relative z-10">
        <div>
          <h3 className={twMerge('text-lg font-medium', isPurgatory ? 'text-red-400' : 'text-gray-100')}>
            {task.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {task.assignee === 'me' ? 'אני' : task.assignee === 'partner' ? 'שותף' : task.assignee === 'both' ? 'שנינו ☔' : 'תורנות'}
          </p>
        </div>

        {task.deadline && (
          <div className="flex items-center gap-1 text-xs text-gray-400 bg-black/60 border border-white/5 px-2 py-1 rounded-md shadow-inner">
            <Clock className="w-3 h-3 text-red-500" />
            <span>{task.deadline}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
