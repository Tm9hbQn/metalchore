import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task } from '../types';
import { useAppState } from '../hooks/useAppState';
import { Edit2, Save, ShieldAlert } from 'lucide-react';
import { Checkbox } from '../components/Checkbox';

export const TaskModal = ({ task, onClose }: { task: Task | null; onClose: () => void }) => {
  const [isEditing, setIsEditing] = useState(!task);
  const { addLog } = useAppState();

  // Mock subtasks
  const [subtasks, setSubtasks] = useState([
    { id: 1, label: 'לקנות שקיות', checked: false },
    { id: 2, label: 'לרוקן פחים', checked: false }
  ]);

  const toggleSubtask = (id: number) => {
    setSubtasks(prev => prev.map(st => st.id === id ? { ...st, checked: !st.checked } : st));
  };

  const handleSave = () => {
    // Save logic
    addLog('Saved task');
    onClose();
  };

  return (
    <div className="relative min-h-[50vh]">
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
                <h2 className="text-3xl font-bold text-white mb-2">{task?.title}</h2>
                <p className="text-gray-400">{task?.description || 'אין תיאור למטלה זו.'}</p>
              </div>
              <button onClick={() => setIsEditing(true)} className="p-3 bg-white/5 rounded-full hover:bg-white/10">
                <Edit2 className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            {task?.status === 'purgatory' && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl mb-6 flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h4 className="text-red-400 font-bold">ממתין לגזר דין!</h4>
                  <p className="text-sm text-red-300/80 mt-1">המטלה הזו פקעה. השותף יחליט אם לחון או לשלוח לגיהנום.</p>
                </div>
              </div>
            )}

            <div className="space-y-2 flex-grow">
              {subtasks.map(st => (
                <Checkbox key={st.id} checked={st.checked} onChange={() => toggleSubtask(st.id)} label={st.label} />
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">אחראי</span>
                <span className="text-white">{task?.assignee}</span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">פספוסים</span>
                <span className="text-red-400 font-bold">{task?.missCount}</span>
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
            <h2 className="text-2xl font-bold mb-6 text-white">{task ? 'עריכת מטלה' : 'זימון מטלה חדשה'}</h2>

            <div className="space-y-4 flex-grow">
              <div>
                <label className="block text-sm text-gray-500 mb-2">שם המטלה</label>
                <input
                  type="text"
                  defaultValue={task?.title || ''}
                  autoFocus
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-green-500 transition-colors text-lg"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">מי סובל?</label>
                <div className="grid grid-cols-2 gap-2">
                  {['אני', 'השותף', 'תורנות', 'יחד'].map(opt => (
                    <button key={opt} className="p-3 bg-white/5 rounded-lg border border-transparent hover:border-white/20 text-center">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="mt-8 w-full bg-green-500 text-black font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              שמור שינויים
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
