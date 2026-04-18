import { motion } from 'framer-motion';
import { Flame, Skull, Settings, CalendarDays } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type TabType = 'home' | 'weekly' | 'cemetery' | 'settings';

interface BottomNavProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export const BottomNav = ({ currentTab, setCurrentTab }: BottomNavProps) => {
  // In RTL, the array is rendered from right to left natively by flex.
  // We want Home to be on the far right, so it should be the FIRST item in the array for an RTL container with default flex-row.
  const tabs = [
    { id: 'home', label: 'ראשי', icon: Flame },
    { id: 'weekly', label: 'לו"ז שבועי', icon: CalendarDays },
    { id: 'cemetery', label: 'בית קברות', icon: Skull },
    { id: 'settings', label: 'הגדרות', icon: Settings },
  ] as const;

  return (
    <nav className="fixed bottom-0 start-0 end-0 bg-white border-t border-gray-200 z-40 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]" dir="rtl">
      <div className="flex justify-around items-center p-2 h-16">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentTab(tab.id as TabType)}
              className={twMerge(
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors relative',
                isActive ? 'text-black' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <Icon className={twMerge('w-6 h-6', isActive ? 'text-red-600' : '')} />
              <span className={twMerge("text-[10px] font-bold", isActive ? "text-black" : "text-gray-400")}>{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-2 w-8 h-1 bg-red-600 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
