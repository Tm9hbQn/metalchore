import { motion } from 'framer-motion';
import type { Task } from '../types';
import { Clock, User, Users, RefreshCw, AlertTriangle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAppState } from '../hooks/useAppState';

export const TaskCard = ({ task, onClick, onSwipeRight }: { task: Task; onClick: () => void; onSwipeRight?: (id: string) => void }) => {
  const { userName, partnerName } = useAppState();
  const isOverdue = task.status === 'purgatory'; // Keeping internal state name but changing UI
  const isRescheduled = task.status === 'pardoned';

  const getAssigneeConfig = (assignee: string) => {
    switch(assignee) {
      case 'me': return { label: userName || 'אני', icon: User, color: 'bg-blue-50 text-blue-600 border-blue-200' };
      case 'partner': return { label: partnerName || 'שותף', icon: User, color: 'bg-purple-50 text-purple-600 border-purple-200' };
      case 'both': return { label: 'שנינו', icon: Users, color: 'bg-pink-50 text-pink-600 border-pink-200' };
      case 'rotation': return { label: 'תורנות', icon: RefreshCw, color: 'bg-orange-50 text-orange-600 border-orange-200' };
      default: return { label: userName || 'אני', icon: User, color: 'bg-blue-50 text-blue-600 border-blue-200' };
    }
  };

  const config = getAssigneeConfig(task.assignee);
  const AssigneeIcon = config.icon;

  // Determine animations based on status
  let animateProps = { opacity: 1, y: 0 };
  let transitionProps: Record<string, unknown> = { type: 'spring', bounce: 0.3 };

  if (isOverdue) {
      animateProps = { ...animateProps, x: [-2, 2, -2, 2, 0] } as never;
      transitionProps = { ...transitionProps, duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" };
  } else if (isRescheduled) {
      animateProps = { ...animateProps, y: [0, -4, 0] } as never;
      transitionProps = { ...transitionProps, duration: 3, repeat: Infinity, ease: "easeInOut" };
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={animateProps}
      transition={transitionProps}
      exit={{ opacity: 0, x: -100, scale: 0.9 }}
      whileTap={{ scale: 0.98 }}
      drag={onSwipeRight ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_e, info) => {
        if (onSwipeRight && info.offset.x > 100) {
          onSwipeRight(task.id);
        }
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={twMerge(
        'p-4 rounded-xl mb-3 cursor-pointer select-none relative overflow-hidden transition-all duration-200 group border-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none',
        isOverdue ? 'bg-red-50 border-red-300 shadow-sm' :
        isRescheduled ? 'bg-green-50 border-green-300 shadow-sm' :
        'startup-card idle-float bg-white'
      )}
      onClick={onClick}
      dir="rtl"
    >
      {isOverdue && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm flex items-center gap-1 z-10">
          <AlertTriangle className="w-3 h-3 animate-pulse" />
          <span className="uppercase tracking-wider">באיחור</span>
        </div>
      )}

      {isRescheduled && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-bl-lg shadow-sm flex items-center gap-1 z-10">
          <RefreshCw className="w-3 h-3 animate-bounce" />
          <span className="uppercase tracking-wider">נדחה</span>
        </div>
      )}

      <div className="flex justify-between items-start mt-2">
        <div>
          <h3 className={twMerge('text-lg font-black transition-colors',
            isOverdue ? 'text-red-600' :
            isRescheduled ? 'text-green-600' :
            'text-gray-900')}>
            {task.title}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <span className={twMerge("text-xs font-bold px-2 py-1 rounded-md border flex items-center gap-1 shadow-sm", config.color)}>
              <AssigneeIcon className="w-3 h-3" />
              {config.label}
            </span>
          </div>
        </div>

        {task.deadline && (
          <div className={twMerge(
            "flex flex-col items-center gap-1 text-xs font-bold border-2 px-2 py-1 rounded-lg shadow-none",
            isOverdue ? "bg-red-100 border-red-200 text-red-600" :
            isRescheduled ? "bg-green-100 border-green-200 text-green-600" :
            "bg-gray-100 border-gray-200 text-gray-600"
          )}>
            <Clock className="w-3 h-3" />
            <span>{task.deadline}</span>
          </div>
        )}
      </div>


    </motion.div>
  );
};
