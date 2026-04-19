import { User, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const TopBar = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'בוקר טוב';
    if (hour >= 12 && hour < 18) return 'צהריים טובים';
    if (hour >= 18 && hour < 22) return 'ערב טוב';
    return 'לילה טוב';
  };
  return (
    <header className="sticky top-0 z-50 p-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm flex justify-between items-center" dir="rtl">
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full hover:bg-red-900/30 transition-colors cursor-pointer"
      >
        <Zap className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
      </motion.div>

      <motion.h1 layoutId="greeting-title" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-sm text-center flex-1 mx-2 tracking-wide" >
        {getGreeting()}
      </motion.h1>

      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-blue-200 flex items-center justify-center bg-blue-50 shadow-sm">
          <User className="w-4 h-4 text-blue-500" />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-purple-200 flex items-center justify-center bg-purple-50 shadow-sm">
          <Users className="w-4 h-4 text-purple-500" />
        </div>
      </div>
    </header>
  );
};
