import { useState } from 'react';
import { motion } from 'framer-motion';

export const Settings = ({ onSecretAccess }: { onSecretAccess: () => void }) => {
  const [clicks, setClicks] = useState(0);

  const handleLogoClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 5) {
      onSecretAccess();
      setClicks(0);
    }
  };

  return (
    <div className="p-6 pb-24 h-full flex flex-col items-center pt-20">
      <div className="text-center w-full max-w-sm">
        <motion.div
          onClick={handleLogoClick}
          whileTap={{ scale: 0.9 }}
          className="w-32 h-32 bg-gradient-to-br from-red-800 to-[#161618] rounded-full mx-auto mb-8 flex items-center justify-center border-2 border-red-900/50 cursor-pointer select-none shadow-[0_0_20px_rgba(138,3,3,0.5)]"
        >
          <span className="text-5xl drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">🔥</span>
        </motion.div>

        <div className="glass-card p-6 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold mb-2 text-red-100">הגדרות המערכת</h2>
            <p className="text-gray-400 text-sm">שום דבר לא יעזור לכם כאן. הכל כבר חתום בדם.</p>
        </div>

        <div className="flex flex-col gap-3">
            <button className="glass-card p-4 rounded-xl text-start font-bold text-gray-300 hover:text-white hover:border-red-500/30 transition-all">
                התראות (בקרוב)
            </button>
            <button className="glass-card p-4 rounded-xl text-start font-bold text-gray-300 hover:text-white hover:border-red-500/30 transition-all">
                החלף שותף (לא באמת)
            </button>
        </div>

        <p className="text-gray-700 text-xs mt-12 font-mono">גרסה 0.0.1 PWA | נבנה עם שדים</p>
      </div>
    </div>
  );
};
