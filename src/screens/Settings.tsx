import { motion } from 'framer-motion';
import { LogOut, Bell, Sun, Skull, ShieldAlert } from 'lucide-react';
import { useRef } from 'react';

export const Settings = ({ onSecretAccess }: { onSecretAccess: () => void }) => {
  const clickCountRef = useRef(0);

  const handleLogout = () => {
    localStorage.removeItem('chores_user');
    window.location.reload();
  };

  const handleLogoClick = () => {
    clickCountRef.current++;
    if (clickCountRef.current >= 5) {
      onSecretAccess();
      clickCountRef.current = 0;
    }
    setTimeout(() => { clickCountRef.current = 0; }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="p-6 pb-24"
      dir="rtl"
    >
      <h2 className="text-3xl font-black mb-8 text-black drop-shadow-sm">הגדרות וקללות</h2>

      <div className="space-y-4">
        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">העדפות</h3>

            <button role="switch" aria-checked="true" className="w-full flex items-center justify-between py-3 border-b-2 border-dashed border-gray-200 group focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                    <span className="font-bold text-gray-800">התראות מציקות</span>
                </div>
                <div className="w-12 h-6 bg-red-600 rounded-full border-2 border-black relative transition-colors shadow-inner">
                    <div className="absolute left-1 top-0.5 w-4 h-4 bg-white border-2 border-black rounded-full" />
                </div>
            </button>

            <button role="switch" aria-checked="true" className="w-full flex items-center justify-between py-3 group focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                    <span className="font-bold text-gray-800">מצב בהיר (מופעל)</span>
                </div>
            </button>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-6">
            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">סכנה</h3>

            <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between py-3 group"
            >
                <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="font-bold text-red-600">ביטול חוזה (התנתקות)</span>
                </div>
            </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button onClick={handleLogoClick} aria-label="מסך מפתחים סודי" className="inline-block transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg">
          <ShieldAlert className="w-12 h-12 text-gray-300 hover:text-red-500 mx-auto transition-colors" />
        </button>
        <p className="text-xs font-bold text-gray-400 mt-2">Chores in Hell v1.0</p>
        <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
            <Skull className="w-3 h-3" />
            Made with hate.
        </p>
      </div>

    </motion.div>
  );
};
