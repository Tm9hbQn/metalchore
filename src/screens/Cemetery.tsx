import { motion } from 'framer-motion';
import { useAppState } from '../hooks/useAppState';
import { Skull, TrendingUp } from 'lucide-react';

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
      className="p-6 pb-24"
      dir="rtl"
    >
      <div className="flex items-center mb-8 gap-4 pt-4">
        <h2 className="text-2xl font-bold">בית הקברות ומאזני הצדק</h2>
      </div>

      <section className="mb-12">
        <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            מי סוחב את הקשר הזה?
        </h3>

        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 start-0 w-full h-1 bg-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${myPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                    className="h-full bg-gradient-to-r from-green-500 to-green-400"
                />
            </div>

            <div className="flex justify-between items-end mb-2 mt-2">
                <div>
                    <span className="block text-2xl font-black text-green-400">{myPercentage}%</span>
                    <span className="text-sm text-gray-500">אני</span>
                </div>
                <div className="text-end">
                    <span className="block text-2xl font-black text-red-400">{100 - myPercentage}%</span>
                    <span className="text-sm text-gray-500">השותף</span>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-6 pt-4 border-t border-white/5">
                {myPercentage > 50 ? 'אתם לגמרי סוחבים את הבית הזה השבוע. מגיע לכם מסאז\'.' : 'השותף עושה יותר. תתחילו להזיז עניינים.'}
            </p>
        </div>
      </section>

      <section>
        <h3 className="text-gray-500 font-bold mb-4 flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-500" />
            נרקבו לאחרונה (נכשלו)
        </h3>

        <div className="space-y-3">
            {failedTasks.length === 0 && (
                <p className="text-gray-600 text-sm italic">אין פה גופות. הכל מתוקתק.</p>
            )}
            {failedTasks.map(t => (
                <div key={t.id} className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex justify-between items-center opacity-80 grayscale">
                    <div>
                        <span className="block font-bold text-gray-300 line-through">{t.title}</span>
                        <span className="text-xs text-red-500/50">פספס את הרכבת</span>
                    </div>
                </div>
            ))}
        </div>
      </section>

    </motion.div>
  );
};
