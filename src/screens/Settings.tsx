import { useState } from 'react';
import { motion } from 'framer-motion';

export const Settings = ({ onSecretAccess, onClose }: { onSecretAccess: () => void; onClose: () => void }) => {
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
    <div className="fixed inset-0 bg-black z-[60] p-6">
      <button onClick={onClose} className="text-gray-400 mb-8">חזור</button>

      <div className="text-center mt-10">
        <motion.div
          onClick={handleLogoClick}
          whileTap={{ scale: 0.9 }}
          className="w-24 h-24 bg-gradient-to-br from-red-600 to-black rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-red-900 cursor-pointer select-none"
        >
          <span className="text-4xl">🔥</span>
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">הגדרות</h2>
        <p className="text-gray-500">שום דבר לא יעזור לך כאן.</p>
        <p className="text-gray-700 text-xs mt-4">גרסה 0.0.1 PWA</p>
      </div>
    </div>
  );
};
