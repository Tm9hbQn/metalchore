import { motion } from 'framer-motion';
import { useAppState } from '../hooks/useAppState';
import { Terminal, Copy, Check, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export const SecretAltar = ({ onClose }: { onClose: () => void }) => {
  const { logs, tasks } = useAppState();
  const [copied, setCopied] = useState(false);

  const errorData = {
      state: { tasks },
      lastLogs: logs.slice(-5),
      environment: {
          userAgent: navigator.userAgent,
          time: new Date().toISOString()
      }
  };

  const handleCopy = () => {
    const payload = `Please analyze this error from the Chores in Hell app:\n\n\`\`\`json\n${JSON.stringify(errorData, null, 2)}\n\`\`\``;
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-[#111] overflow-y-auto"
      dir="rtl"
    >
      <div className="sticky top-0 bg-[#111]/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/10 z-10">
        <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                <ArrowRight className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2 text-green-500 font-mono">
            <Terminal className="w-5 h-5" />
            <span>The Secret Altar (Debug)</span>
            </div>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <h3 className="text-red-400 font-bold mb-1">Network Fetch Error בטבלת משימות</h3>
            <p className="text-xs text-red-300/70">המערכת לא הצליחה לסנכרן מול השרת. כנראה התנתקתם מהאינטרנט או שהשדים נרדמו.</p>
        </div>

        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-xl mb-6 hover:bg-gray-200 transition-colors"
        >
          {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
          {copied ? 'הועתק ל-Clipboard!' : 'העתק דוח קריסה לאבחון (Jules / Claude Code)'}
        </button>

        <div className="space-y-4">
          <div className="bg-black border border-white/10 rounded-lg p-4">
            <h4 className="text-gray-500 text-sm mb-2 font-mono">APP_STATE</h4>
            <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap font-mono start-0 text-start" dir="ltr">
              {JSON.stringify({ tasks }, null, 2)}
            </pre>
          </div>

          <div className="bg-black border border-white/10 rounded-lg p-4">
            <h4 className="text-gray-500 text-sm mb-2 font-mono">LAST_LOGS</h4>
            <div className="text-xs text-gray-400 font-mono space-y-1 start-0 text-start" dir="ltr">
              {logs.slice(-5).map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
