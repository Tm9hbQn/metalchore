import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dices } from 'lucide-react';

const AVATARS = ['💀', '😈', '😾', '🦇', '🔥', '🧟', '🧛', '🦅', '🕷️', '🕸️'];

const NAMES_MALE = ['אדון האופל', 'שד משחת', 'מלך השאול', 'רוח רפאים', 'לוציפר קטן'];
const NAMES_FEMALE = ['מלכת האופל', 'שדה קטנה', 'נסיכת השאול', 'ערפדית', 'מכשפה מדופלמת'];

export const Login = ({ onComplete }: { onComplete: (user: { name: string; avatar: string; color: string; gender?: string }) => void }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [color, setColor] = useState('#EF4444');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const generateRandomName = () => {
    const isFemale = gender === 'female';
    const list = isFemale ? NAMES_FEMALE : NAMES_MALE;
    const newName = list[Math.floor(Math.random() * list.length)];
    setName(newName);
  };

  // Do not auto-focus the input
  useEffect(() => {
    // Generate name but don't warn about state in effect, as it's intended here on gender change
    const isFemale = gender === 'female';
    const list = isFemale ? NAMES_FEMALE : NAMES_MALE;
    const newName = list[Math.floor(Math.random() * list.length)];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(newName);
  }, [gender]);

  const handleSuggestName = (suggestion: string) => {
      setName(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete({ name: name.trim(), avatar, color, gender });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center p-6 text-black text-center" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <h1 className="text-4xl font-black mb-2 text-red-600 drop-shadow-sm">חתימת החוזה</h1>
        <p className="text-gray-600 mb-8 font-medium">ברוכים הבאים לגיהנום. בחרו את האווטאר שלכם בחוכמה, כי אין דרך חזרה.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-start">
            <label className="block text-sm font-bold text-gray-700 mb-2">איך קוראים לכם?</label>

            <div className="flex gap-2 mb-4">
              <button type="button" onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg border-2 font-bold transition-all ${gender === 'male' ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]' : 'border-gray-300 bg-white text-gray-500'}`}>זכר</button>
              <button type="button" onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg border-2 font-bold transition-all ${gender === 'female' ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]' : 'border-gray-300 bg-white text-gray-500'}`}>נקבה</button>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
                {(gender === 'female' ? NAMES_FEMALE : NAMES_MALE).slice(0, 3).map(n => (
                    <button key={n} type="button" onClick={() => handleSuggestName(n)} className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md border border-gray-300 transition-colors">{n}</button>
                ))}
            </div>

            <div className="flex gap-2 items-center">
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 bg-white border-2 border-black rounded-xl p-4 text-black focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 transition-all text-lg text-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full"
                placeholder="הכנס שם ציני כאן..."
                />
                <button
                    type="button"
                    onClick={generateRandomName}
                    className="p-4 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-colors shrink-0 flex items-center justify-center text-black h-full"
                    title="רנדום שם"
                >
                    <Dices className="w-6 h-6" />
                </button>
            </div>
          </div>

          <div className="text-start">
            <label className="block text-sm font-bold text-gray-700 mb-2">בחרו פרצוף</label>
            <div className="flex flex-wrap justify-center gap-4 text-3xl bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  className={`p-2 rounded-full transition-all ${avatar === a ? 'bg-red-100 scale-125 border border-red-300' : 'opacity-50 hover:opacity-100'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="text-start">
            <label className="block text-sm font-bold text-gray-700 mb-2">צבע ההילה שלכם</label>
            <div className="flex justify-center gap-4 bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {['#EF4444', '#10B981', '#3B82F6', '#F59E0B'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: c, borderColor: color === c ? 'black' : 'transparent', transform: color === c ? 'scale(1.2)' : 'scale(1)' }}
                />
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-black text-white font-black text-lg py-4 rounded-xl flex items-center justify-center gap-2 mt-8 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] border-2 border-red-600 hover:bg-gray-900 transition-colors"
          >
            חתמו בדם (היכנסו)
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
