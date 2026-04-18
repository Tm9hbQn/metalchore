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
import { BottomSheet } from './components/BottomSheet';
import { BottomNav, type TabType } from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { motion, AnimatePresence } from 'framer-motion';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'בוקר טוב, סאנשיין.';
  if (hour >= 12 && hour < 18) return 'צהריים טובים.';
  if (hour >= 18 && hour < 22) return 'ערב קשוח.';
  return 'לילה טוב.';
};

const PRELOADER_TEXTS = [
  'מעורר את השדים...',
  'מחמם את הלהבות...',
  'בודק מי לא שטף כלים...'
];

const MainApp = () => {
  const [appState, setAppState] = useState<'pact' | 'preloader' | 'splash' | 'main'>(() => localStorage.getItem('chores_user') ? 'preloader' : 'pact');
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

  const handleLoginComplete = (user: { name: string; avatar: string; color: string }) => {
    localStorage.setItem('chores_user', JSON.stringify(user));
    setAppState('preloader');
  };

  if (appState === 'pact') {
    return <Login onComplete={handleLoginComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#161618] text-white flex flex-col relative overflow-hidden">
      {/* Background ambient light */}
      <div className="fixed top-0 inset-x-0 h-64 bg-red-900/10 blur-[100px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {appState === 'preloader' && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 bg-[#161618] z-[100] flex flex-col items-center justify-center text-white"
          >
             <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="text-6xl mb-4"
            >
              ⏳
            </motion.div>
            <p className="text-gray-500 mt-2 font-mono">{preloaderText}</p>
          </motion.div>
        )}

        {appState === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 bg-[#161618] z-[90] flex flex-col items-center justify-center text-white"
          >
            <motion.h1
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-center px-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
            >
              {getGreeting()}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {(appState === 'main' || appState === 'splash') && (
        <motion.div
           className="flex-1 flex flex-col z-10"
           initial={appState === 'splash' ? { opacity: 0, y: 50 } : { opacity: 1, y: 0 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ staggerChildren: 0.1, delayChildren: 0.5, type: "spring", bounce: 0.2 }}
        >
          <TopBar />

          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
                {currentTab === 'home' && (
                    <motion.div key="home" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: 20}}>
                        <Home onTaskClick={handleTaskClick} greeting={getGreeting()} />
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
