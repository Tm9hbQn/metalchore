import { User, Users, Skull } from 'lucide-react';
import { motion } from 'framer-motion';

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 p-4 glass-card border-b border-red-500/20 shadow-md flex justify-between items-center bg-[#161618]/80 backdrop-blur-xl">
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
      >
        <Skull className="w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
      </motion.div>

      <h1 className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
        Chores in Hell
      </h1>

      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center bg-gray-800 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
          <User className="w-4 h-4 text-green-500" />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 flex items-center justify-center bg-gray-800 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
          <Users className="w-4 h-4 text-purple-500" />
        </div>
      </div>
    </header>
  );
};
