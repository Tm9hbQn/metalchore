import { useState, useEffect } from 'react';
import { AppStateProvider } from './context/AppStateProvider';
import type { Task } from './types';
import { Home } from './screens/Home';
import { Settings } from './screens/Settings';
import { SecretAltar } from './screens/SecretAltar';
import { TaskModal } from './screens/TaskModal';
import { BottomSheet } from './components/BottomSheet';
import { motion, AnimatePresence } from 'framer-motion';

const MainApp = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showSecretAltar, setShowSecretAltar] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTaskClick = (task: Task | null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-4"
            >
              🔥
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              בוקר טוב, סאנשיין.
            </h1>
            <p className="text-gray-500 mt-2">ברוך הבא לכור המצרף.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Home
        onTaskClick={handleTaskClick}
        onSettingsClick={() => setShowSettings(true)}
      />

      <BottomSheet isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskModal task={selectedTask} onClose={() => setIsModalOpen(false)} />
      </BottomSheet>

      <AnimatePresence>
        {showSettings && (
          <Settings
            onClose={() => setShowSettings(false)}
            onSecretAccess={() => {
              setShowSettings(false);
              setShowSecretAltar(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecretAltar && (
          <SecretAltar onClose={() => setShowSecretAltar(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <MainApp />
    </AppStateProvider>
  );
}
