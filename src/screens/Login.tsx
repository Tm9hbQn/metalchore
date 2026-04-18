import { useState } from 'react';
import { motion } from 'framer-motion';

const AVATARS = ['💀', '😈', '😾', '🦇', '🔥'];

export const Login = ({ onComplete }: { onComplete: (user: { name: string; avatar: string; color: string }) => void }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [color, setColor] = useState('#39FF14');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name: name.trim(), avatar, color });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-white text-center" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <h1 className="text-4xl font-bold mb-2">חתימת החוזה</h1>
        <p className="text-gray-400 mb-8">ברוכים הבאים לגיהנום. בחרו את האווטאר שלכם בחוכמה, כי אין דרך חזרה.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-500 mb-2">איך קוראים לכם?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-red-500 transition-colors text-lg text-center"
              placeholder="הכנס שם ציני כאן..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">בחרו פרצוף</label>
            <div className="flex justify-center gap-4 text-3xl">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  className={`p-2 rounded-full transition-all ${avatar === a ? 'bg-white/20 scale-125' : 'opacity-50 hover:opacity-100'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-2">צבע ההילה שלכם</label>
            <div className="flex justify-center gap-4">
              {['#39FF14', '#FF0055', '#00E5FF', '#FFB300'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-8 h-8 rounded-full border-2"
                  style={{ backgroundColor: c, borderColor: color === c ? 'white' : 'transparent' }}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-600 text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 mt-8"
          >
            חתמו בדם (היכנסו)
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
