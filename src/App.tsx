import { ErrorBoundary } from "./components/ErrorBoundary";
import { useState, useEffect } from 'react';
import { AppStateProvider } from './context/AppStateProvider';
import type { Task } from './types';
import { Home } from './screens/Home';
import { Settings } from './screens/Settings';
import { Cemetery } from './screens/Cemetery';
import { SecretAltar } from './screens/SecretAltar';
import { TaskModal } from './screens/TaskModal';
import { Login } from './screens/Login';
import { WeeklyView } from './screens/WeeklyView';
import { BottomSheet } from './components/BottomSheet';
import { BottomNav, type TabType } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { motion, AnimatePresence } from 'framer-motion';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'בוקר טוב';
  if (hour >= 12 && hour < 18) return 'צהריים טובים';
  if (hour >= 18 && hour < 22) return 'ערב טוב';
  return 'לילה טוב';
};

const PRELOADER_TEXTS = [
  'Bootstrapping...',
  'Deploying to production...',
  'Initializing MVP...'
];

const MainApp = () => {
  const [appState, setAppState] = useState<'login' | 'preloader' | 'splash' | 'main'>(() => localStorage.getItem('chores_user') ? 'preloader' : 'login');
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [showSecretAltar, setShowSecretAltar] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preloaderText, setPreloaderText] = useState(PRELOADER_TEXTS[0]);

  useEffect(() => {
    if (appState === 'preloader') {
      const interval = setInterval(() => {
        setPreloaderText(PRELOADER_TEXTS[Math.floor(Math.random() * PRELOADER_TEXTS.length)]);
      }, 1000);
      const timer = setTimeout(() => {
        clearInterval(interval);
        setAppState('splash');
      }, 3000);
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [appState]);

  useEffect(() => {
    if (appState === 'splash') {
      const timer = setTimeout(() => setAppState('main'), 2000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const handleTaskClick = (task: Task | null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleLoginComplete = (user: { name: string; avatar: string; color: string; gender?: string }) => {
    localStorage.setItem('chores_user', JSON.stringify(user));
    setAppState('preloader');
  };

  if (appState === 'login') {
    return <Login onComplete={handleLoginComplete} />;
  }

  return (
    <div className="min-h-screen bg-[var(--color-startup-bg)] text-black flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === 'preloader' && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 bg-[var(--color-startup-bg)] z-[100] flex flex-col items-center justify-center text-black"
          >
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="text-6xl mb-4"
            >
              ⏳
            </motion.div>
            <p className="text-gray-500 mt-2 font-bold">{preloaderText}</p>
          </motion.div>
        )}

        {appState === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--color-startup-bg)] z-[90] flex flex-col items-center justify-center text-black"
          >
            <motion.h1
              layoutId="greeting-title"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-center px-4 drop-shadow-md"
            >
              {getGreeting()}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {(appState === 'main' || appState === 'splash') && (
        <motion.div
           className="flex-1 flex flex-col z-10 h-full"
           initial={appState === 'splash' ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ staggerChildren: 0.1, delayChildren: 0.5, type: "spring", bounce: 0.2 }}
        >
          <TopBar />

          <div className="flex-1 overflow-y-auto bg-[var(--color-startup-bg)]">
            <AnimatePresence mode="wait">
                {currentTab === 'home' && (
                    <motion.div key="home" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <Home onTaskClick={handleTaskClick} />
                    </motion.div>
                )}
                {currentTab === 'weekly' && (
                    <motion.div key="weekly" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <WeeklyView onTaskClick={handleTaskClick} />
                    </motion.div>
                )}
                {currentTab === 'cemetery' && (
                    <motion.div key="cemetery" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <Cemetery />
                    </motion.div>
                )}
                {currentTab === 'settings' && (
                    <motion.div key="settings" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <Settings onSecretAccess={() => setShowSecretAltar(true)} />
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </motion.div>
      )}

      <BottomSheet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskModal task={selectedTask} onClose={() => setIsModalOpen(false)} />
      </BottomSheet>

      <AnimatePresence>
        {showSecretAltar && (
          <SecretAltar onClose={() => setShowSecretAltar(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary><AppStateProvider>
      <MainApp />
    </AppStateProvider></ErrorBoundary>
  );
}
