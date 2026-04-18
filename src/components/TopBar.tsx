import { User, Users, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const TopBar = () => {
  return (
    <header className="sticky top-0 z-50 p-4 bg-white border-b-2 border-black shadow-[0_2px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center" dir="rtl">
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
      >
        <Flame className="w-6 h-6 text-red-600" />
      </motion.div>

      <h1 className="text-xl font-black text-black uppercase tracking-wider drop-shadow-sm">
        Chores in Hell
      </h1>

      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-green-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <User className="w-4 h-4 text-black" />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-purple-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Users className="w-4 h-4 text-black" />
        </div>
      </div>
    </header>
  );
};
