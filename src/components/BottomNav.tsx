import { motion } from 'framer-motion';
import { Flame, Skull, Settings } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type TabType = 'home' | 'cemetery' | 'settings';

interface BottomNavProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
}

export const BottomNav = ({ currentTab, setCurrentTab }: BottomNavProps) => {
  const tabs = [
    { id: 'settings', label: 'הגדרות', icon: Settings },
    { id: 'cemetery', label: 'קברות', icon: Skull },
    { id: 'home', label: 'עינויים', icon: Flame },
  ] as const;

  return (
    <nav className="fixed bottom-0 start-0 end-0 glass-card border-t border-red-500/20 bg-black/80 z-40 pb-safe">
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
                isActive ? 'text-red-500' : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <Icon className={twMerge('w-6 h-6', isActive ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : '')} />
              <span className="text-[10px] font-bold">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-2 w-8 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
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
