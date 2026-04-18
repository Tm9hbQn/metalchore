import { Settings, User, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const TopBar = ({ onSettingsClick }: { onSettingsClick: () => void }) => {
  return (
    <header className="sticky top-0 z-50 p-4 glass-card flex justify-between items-center bg-black/50">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onSettingsClick}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <Settings className="w-6 h-6 text-gray-400" />
      </motion.button>

      <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
        Chores in Hell
      </h1>

      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center bg-gray-800">
          <User className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 flex items-center justify-center bg-gray-800">
          <Users className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
};
