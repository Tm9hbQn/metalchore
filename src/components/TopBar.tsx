import { User, Users, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const TopBar = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'בוקר טוב, סאנשיין.';
    if (hour >= 12 && hour < 18) return 'צהריים טובים.';
    if (hour >= 18 && hour < 22) return 'ערב קשוח.';
    return 'לילה טוב, סאנשיין.';
  };
  return (
    <header className="sticky top-0 z-50 p-4 bg-black border-b-2 border-[#8A0303] shadow-[0_4px_15px_rgba(138,3,3,0.5)] flex justify-between items-center" dir="rtl">
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-full hover:bg-red-900/30 transition-colors cursor-pointer"
      >
        <Flame className="w-6 h-6 text-[#8A0303]" />
      </motion.div>

      <motion.h1 layoutId="greeting-title" className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] text-center flex-1 mx-2 uppercase tracking-widest" style={{ fontFamily: 'Impact, sans-serif' }}>
        {getGreeting()}
      </motion.h1>

      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-[#39FF14] flex items-center justify-center bg-black shadow-[0_0_10px_rgba(57,255,20,0.5)]">
          <User className="w-4 h-4 text-[#39FF14]" />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 flex items-center justify-center bg-black shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          <Users className="w-4 h-4 text-purple-500" />
        </div>
      </div>
    </header>
  );
};
