import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FAB = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)] z-30"
    >
      <Plus className="w-8 h-8 text-black" />
    </motion.button>
  );
};
