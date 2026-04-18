import { motion } from 'framer-motion';
import { useAppState } from '../hooks/useAppState';
import { Skull, TrendingUp, Ghost } from 'lucide-react';

export const Cemetery = () => {
  const { tasks } = useAppState();

  const failedTasks = tasks.filter(t => t.status === 'failed');
  const doneTasks = tasks.filter(t => t.status === 'done');

  // Simple mock analytics
  const myDoneCount = doneTasks.filter(t => t.assignee === 'me').length || 3;
  const partnerDoneCount = doneTasks.filter(t => t.assignee === 'partner').length || 1;
  const totalDone = myDoneCount + partnerDoneCount;
  const myPercentage = totalDone === 0 ? 50 : Math.round((myDoneCount / totalDone) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="p-6 pb-24 min-h-[80vh] relative"
      dir="rtl"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-20 right-20 text-8xl">🦇</motion.div>
      </div>

      <div className="flex items-center mb-8 gap-4 pt-4 relative z-10">
        <h2 className="text-3xl font-black text-black drop-shadow-sm">בית הקברות ומאזני הצדק</h2>
      </div>

      <section className="mb-12 relative z-10">
        <h3 className="text-black font-bold mb-4 flex items-center gap-2 text-lg">
            <TrendingUp className="w-6 h-6 text-purple-600 drop-shadow-sm" />
            מי סוחב את הקשר הזה?
        </h3>

        <div className="bg-white border-2 border-black p-6 rounded-2xl text-center relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="absolute top-0 start-0 w-full h-2 bg-gray-200 border-b-2 border-black">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${myPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 border-r-2 border-black"
                />
            </div>

            <div className="flex justify-between items-end mb-2 mt-4 px-2">
                <div>
                    <span className="block text-4xl font-black text-green-600 drop-shadow-sm">{myPercentage}%</span>
                    <span className="text-sm font-bold text-gray-600">אני</span>
                </div>
                <div className="text-end">
                    <span className="block text-4xl font-black text-red-600 drop-shadow-sm">{100 - myPercentage}%</span>
                    <span className="text-sm font-bold text-gray-600">השותף</span>
                </div>
            </div>

            <p className="text-sm font-bold text-gray-700 mt-6 pt-4 border-t-2 border-dashed border-gray-300">
                {myPercentage > 50 ? 'אתם לגמרי סוחבים את הבית הזה השבוע. מגיע לכם מסאז\'.' : 'השותף עושה יותר. תתחילו להזיז עניינים לפני שתקבלו גט.'}
            </p>
        </div>
      </section>

      <section className="relative z-10">
        <h3 className="text-black font-bold mb-4 flex items-center gap-2 text-lg">
            <Skull className="w-6 h-6 text-red-600 drop-shadow-sm" />
            נרקבו לאחרונה (נכשלו)
        </h3>

        <div className="space-y-3">
            {failedTasks.length === 0 && (
                <div className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center text-center">
                    <Ghost className="w-12 h-12 text-gray-400 mb-2 opacity-50" />
                    <p className="text-gray-600 font-bold">אין פה גופות. הכל מתוקתק להפליא.</p>
                </div>
            )}
            {failedTasks.map(t => (
                <div key={t.id} className="bg-red-50 border-2 border-black p-4 rounded-xl flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] grayscale-[50%] hover:grayscale-0 transition-all">
                    <div>
                        <span className="block font-bold text-gray-800 line-through decoration-red-600 decoration-2">{t.title}</span>
                        <span className="text-xs font-bold text-red-600 mt-1 block flex items-center gap-1">
                            <Skull className="w-3 h-3" />
                            פספס את הרכבת
                        </span>
                    </div>
                </div>
            ))}
        </div>
      </section>

    </motion.div>
  );
};
