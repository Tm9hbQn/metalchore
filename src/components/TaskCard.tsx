import { motion } from 'framer-motion';
import type { Task } from '../types';
import { Clock, User, Users, RefreshCw, AlertTriangle, Ghost } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { useAppState } from '../hooks/useAppState';

export const TaskCard = ({ task, onClick, onSwipeRight }: { task: Task; onClick: () => void; onSwipeRight?: (id: string) => void }) => {
  const { userName, partnerName } = useAppState();
  const isPurgatory = task.status === 'purgatory';
  const isPardoned = task.status === 'pardoned';

  const getAssigneeConfig = (assignee: string) => {
    switch(assignee) {
      case 'me': return { label: userName || 'אני', icon: User, color: 'bg-[#1a1a1a] text-[#39FF14] border-[#39FF14]' };
      case 'partner': return { label: partnerName || 'שותף', icon: User, color: 'bg-[#1a1a1a] text-[#8A0303] border-[#8A0303]' };
      case 'both': return { label: 'שנינו', icon: Users, color: 'bg-[#1a1a1a] text-purple-500 border-purple-500' };
      case 'rotation': return { label: 'תורנות', icon: RefreshCw, color: 'bg-[#1a1a1a] text-orange-500 border-orange-500' };
      default: return { label: userName || 'אני', icon: User, color: 'bg-[#1a1a1a] text-[#39FF14] border-[#39FF14]' };
    }
  };

  const config = getAssigneeConfig(task.assignee);
  const AssigneeIcon = config.icon;

  // Determine animations based on status
  let animateProps = { opacity: 1, y: 0 };
  let transitionProps: Record<string, unknown> = { type: 'spring', bounce: 0.3 };

  if (isPurgatory) {
      animateProps = { ...animateProps, x: [-2, 2, -2, 2, 0] } as never;
      transitionProps = { ...transitionProps, duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" };
  } else if (isPardoned) {
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
      className={twMerge(
        'p-4 rounded-xl mb-3 cursor-pointer select-none relative overflow-hidden transition-all duration-200 group border-2',
        isPurgatory ? 'bg-[#2a0808] border-[#8A0303] shadow-[4px_4px_0px_0px_rgba(138,3,3,1)]' :
        isPardoned ? 'bg-[#0f1f14] border-[#39FF14] shadow-[4px_4px_0px_0px_rgba(57,255,20,0.5)]' :
        'bg-[#1a1a1a] border-[#333] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-gray-500 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
      )}
      onClick={onClick}
      dir="rtl"
    >
      {isPurgatory && (
        <div className="absolute top-0 right-0 bg-[#8A0303] text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-[0_0_5px_rgba(138,3,3,1)] flex items-center gap-1 z-10">
          <AlertTriangle className="w-3 h-3 animate-pulse" />
          <span className="uppercase tracking-wider">עבר זמנו</span>
        </div>
      )}

      {isPardoned && (
        <div className="absolute top-0 right-0 bg-[#39FF14] text-black text-[10px] font-black px-2 py-1 rounded-bl-lg shadow-[0_0_5px_rgba(57,255,20,1)] flex items-center gap-1 z-10">
          <Ghost className="w-3 h-3 animate-bounce" />
          <span className="uppercase tracking-wider">חזר מהמתים</span>
        </div>
      )}

      <div className="flex justify-between items-start mt-2">
        <div>
          <h3 className={twMerge('text-lg font-black transition-colors',
            isPurgatory ? 'text-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]' :
            isPardoned ? 'text-[#39FF14] drop-shadow-[0_0_5px_rgba(57,255,20,0.3)]' :
            'text-gray-200 group-hover:text-white')}>
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
            "flex flex-col items-center gap-1 text-xs font-bold border-2 px-2 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            isPurgatory ? "bg-black border-[#8A0303] text-[#8A0303]" :
            isPardoned ? "bg-black border-[#39FF14] text-[#39FF14]" :
            "bg-black border-[#333] text-gray-400"
          )}>
            <Clock className="w-3 h-3" />
            <span>{task.deadline}</span>
          </div>
        )}
      </div>

      {/* Background decoration for pardoned */}
      {isPardoned && (
         <div className="absolute -bottom-4 -left-4 text-4xl opacity-10 rotate-12 pointer-events-none">
            🧟
         </div>
      )}
    </motion.div>
  );
};
