import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FAB = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      aria-label="הוסף משימה"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-24 left-6 w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 z-30 idle-pulse focus-visible:ring-2 focus-visible:ring-white focus:outline-none"
    >
      <Plus className="w-8 h-8 text-white" />
    </motion.button>
  );
};
