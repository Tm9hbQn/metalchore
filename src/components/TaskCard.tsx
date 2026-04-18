import { motion } from 'framer-motion';
import type { Task } from '../types';
import { Clock, User, Users, RefreshCw, AlertTriangle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAppState } from '../hooks/useAppState';

export const TaskCard = ({ task, onClick, onSwipeRight }: { task: Task; onClick: () => void; onSwipeRight?: (id: string) => void }) => {
  const { userName, partnerName } = useAppState();
  const isPurgatory = task.status === 'purgatory';

  const getAssigneeConfig = (assignee: string) => {
    switch(assignee) {
      case 'me': return { label: userName || 'אני', icon: User, color: 'bg-green-100 text-green-700 border-green-300' };
      case 'partner': return { label: partnerName || 'שותף', icon: User, color: 'bg-blue-100 text-blue-700 border-blue-300' };
      case 'both': return { label: 'שנינו', icon: Users, color: 'bg-purple-100 text-purple-700 border-purple-300' };
      case 'rotation': return { label: 'תורנות', icon: RefreshCw, color: 'bg-orange-100 text-orange-700 border-orange-300' };
      default: return { label: userName || 'אני', icon: User, color: 'bg-green-100 text-green-700 border-green-300' };
    }
  };

  const config = getAssigneeConfig(task.assignee);
  const AssigneeIcon = config.icon;

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
        'p-4 rounded-xl mb-3 cursor-pointer select-none relative overflow-hidden transition-all duration-200 metal-card group',
        isPurgatory ? 'border-red-600 bg-red-50' : 'bg-white'
      )}
      onClick={onClick}
      dir="rtl"
    >
      {isPurgatory && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          <span>עבר זמנו</span>
        </div>
      )}

      <div className="flex justify-between items-start mt-2">
        <div>
          <h3 className={twMerge('text-lg font-black group-hover:text-red-600 transition-colors', isPurgatory ? 'text-red-700' : 'text-black')}>
            {task.title}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className={twMerge("text-xs font-bold px-2 py-1 rounded-md border flex items-center gap-1", config.color)}>
              <AssigneeIcon className="w-3 h-3" />
              {config.label}
            </span>
          </div>
        </div>

        {task.deadline && (
          <div className={twMerge(
            "flex flex-col items-center gap-1 text-xs font-bold border-2 px-2 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            isPurgatory ? "bg-red-100 border-red-600 text-red-700" : "bg-gray-100 border-black text-black"
          )}>
            <Clock className="w-3 h-3" />
            <span>{task.deadline}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
