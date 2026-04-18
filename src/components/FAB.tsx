import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FAB = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-24 left-6 w-16 h-16 bg-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] border-2 border-red-600 z-30 transition-transform"
    >
      <Plus className="w-8 h-8 text-white" />
    </motion.button>
  );
};
