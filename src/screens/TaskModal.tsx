import type { Assignee } from "../types";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '../types';
import { useAppState } from '../hooks/useAppState';
import { Edit2, Save, ShieldAlert, Umbrella, User, Repeat, CheckCircle, XCircle, Flame } from 'lucide-react';
import { Checkbox } from '../components/Checkbox';

export const TaskModal = ({ task, onClose }: { task: Task | null; onClose: () => void }) => {
  const [isEditing, setIsEditing] = useState(!task);
  const [isLoading, setIsLoading] = useState(false);
  const { addLog, setTasks, userName, partnerName } = useAppState();

  const [title, setTitle] = useState(task?.title || '');
  const [assignee, setAssignee] = useState(task?.assignee || 'me');
  const [recurring, setRecurring] = useState(false);
  const [timeframe, setTimeframe] = useState('היום');

  // Mock subtasks
  const [subtasks, setSubtasks] = useState([
    { id: 1, label: 'לקנות שקיות', checked: false },
    { id: 2, label: 'לרוקן פחים', checked: false }
  ]);

  const toggleSubtask = (id: number) => {
    setSubtasks(prev => prev.map(st => st.id === id ? { ...st, checked: !st.checked } : st));
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
        if (task) {
            setTasks(prev => prev.map(t => t.id === task.id ? { ...t, title, assignee } : t));
        } else {
            const newTask: Task = {
                id: Date.now().toString(),
                title: title || 'מטלה חדשה',
                assignee: assignee as Assignee,
                status: 'active',
                missCount: 0,
                deadline: timeframe
            };
            setTasks(prev => [...prev, newTask]);
        }
      addLog(`Saved task: ${title}`);
      setIsLoading(false);
      onClose();
    }, 800);
  };

  const handleResurrect = () => {
      if(!task) return;
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'pardoned', deadline: 'היום' } : t));
      addLog(`Pardoned task ${task.id}`);
      onClose();
  };

  const handleReject = () => {
      if(!task) return;
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'failed', missCount: t.missCount + 1 } : t));
      addLog(`Rejected/Failed task ${task.id}`);
      onClose();
  };

  const handleOverrule = () => {
      if(!task) return;
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'done' } : t));
      addLog(`Overruled and completed task ${task.id}`);
      onClose();
  };

  return (
    <div className="relative min-h-[50vh] text-gray-900" dir="rtl">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="view"
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{task?.title}</h2>
                <p className="text-gray-500">{task?.description || 'אין תיאור למטלה זו.'}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200">
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {task?.status === 'purgatory' && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                    <div>
                    <h4 className="text-red-600 font-bold">המשימה מתעכבת</h4>
                    <p className="text-sm text-red-500 mt-1">המשימה חרגה מהזמן. אפשר לתת הזדמנות נוספת או לבטל.</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button onClick={handleResurrect} className="flex-1 bg-green-500/20 text-green-400 border border-green-500/50 py-2 rounded-lg font-bold text-sm hover:bg-green-500 hover:text-black transition-colors flex justify-center items-center gap-1">
                        <CheckCircle className="w-4 h-4"/> הזדמנות שניה
                    </button>
                    <button onClick={handleReject} className="flex-1 bg-red-500/20 text-red-600 border border-red-500/50 py-2 rounded-lg font-bold text-sm hover:bg-red-500 hover:text-black transition-colors flex justify-center items-center gap-1">
                        <XCircle className="w-4 h-4"/> בטל משימה
                    </button>
                </div>

                <div className="pt-3 border-t border-red-500/20">
                    <button onClick={handleOverrule} className="w-full text-center text-sm text-gray-500 hover:text-gray-900 flex items-center justify-center gap-2">
                        <Flame className="w-4 h-4"/> אני אעשה את זה עכשיו
                    </button>
                </div>
              </div>
            )}

            <div className="space-y-2 flex-grow mb-6">
              <h3 className="text-gray-500 text-sm mb-3 font-bold">תת-מטלות</h3>
              {subtasks.map(st => (
                <Checkbox key={st.id} checked={st.checked} onChange={() => toggleSubtask(st.id)} label={st.label} />
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">אחראי</span>
                <span className="text-gray-900 flex items-center gap-1">
                    {task?.assignee === 'both' ? <><Umbrella className="w-4 h-4 text-purple-400"/> שנינו</> : task?.assignee}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">פספוסים</span>
                <span className="text-red-600 font-bold">{task?.missCount}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">{task ? 'עריכת מטלה' : 'זימון מטלה חדשה'}</h2>

            <div className="space-y-6 flex-grow">
              <div>
                <label className="block text-sm text-gray-500 mb-2">שם המטלה</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-lg"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">מי נדפק עם זה?</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAssignee('me')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center gap-2 ${assignee === 'me' ? 'bg-blue-50 border-blue-500 text-blue-600 shadow-sm' : 'bg-gray-100 border-transparent hover:border-gray-300'}`}>
                    <User className="w-4 h-4" /> {userName}
                  </button>
                  <button
                    onClick={() => setAssignee('partner')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center gap-2 ${assignee === 'partner' ? 'bg-purple-50 border-purple-500 text-purple-600 shadow-sm' : 'bg-gray-100 border-transparent hover:border-gray-300'}`}>
                    {partnerName}
                  </button>
                  <button
                    onClick={() => setAssignee('rotation')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center gap-2 ${assignee === 'rotation' ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-sm' : 'bg-gray-100 border-transparent hover:border-gray-300'}`}>
                    תורנות
                  </button>
                  <button
                    onClick={() => setAssignee('both')}
                    className={`p-3 rounded-lg border text-center flex items-center justify-center gap-2 ${assignee === 'both' ? 'bg-pink-50 border-pink-500 text-pink-600 shadow-sm' : 'bg-gray-100 border-transparent hover:border-gray-300'}`}>
                    <Umbrella className="w-4 h-4" /> יחד
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">מתי זה פג תוקף?</label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['היום', 'מחר', 'בסופ"ש', 'ראשון עד שני'].map(t => (
                        <button
                            key={t}
                            onClick={() => setTimeframe(t)}
                            className={`px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${timeframe === t ? 'bg-white text-black border-white' : 'bg-transparent border-gray-300 text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl border border-white/5">
                <div>
                    <span className="block text-sm font-bold text-gray-200">לולאה מקוללת (חזרתיות)</span>
                    <span className="text-xs text-gray-500">הסיוט הזה יחזור על עצמו</span>
                </div>
                <button
                    onClick={() => setRecurring(!recurring)}
                    className={`p-2 rounded-full transition-colors ${recurring ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}
                >
                    <Repeat className="w-5 h-5" />
                </button>
              </div>

            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={isLoading || !title}
              className={`mt-8 w-full font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-colors ${isLoading || !title ? 'bg-gray-700 text-gray-500' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'}`}
            >
              {isLoading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                      ⏳
                  </motion.div>
              ) : (
                  <><Save className="w-5 h-5" /> שמור משימה</>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
