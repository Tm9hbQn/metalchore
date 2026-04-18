import { useAppState } from '../hooks/useAppState';
import { Copy, AlertTriangle } from 'lucide-react';

export const SecretAltar = ({ onClose }: { onClose: () => void }) => {
  const { logs, currentUser, tasks } = useAppState();

  const handleCopy = () => {
    const debugData = {
      currentUser,
      userAgent: navigator.userAgent,
      logs,
      state: tasks
    };
    navigator.clipboard.writeText(JSON.stringify(debugData, null, 2));
    alert('הועתק ללוח!');
  };

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] overflow-y-auto p-4 text-left" dir="ltr">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <button onClick={onClose} className="text-gray-400 hover:text-white">Close X</button>
        <h1 className="text-red-500 font-mono text-xl flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> SECRET ALTAR
        </h1>
      </div>

      <button
        onClick={handleCopy}
        className="mb-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2"
      >
        <Copy className="w-4 h-4" /> Copy Debug JSON
      </button>

      <div className="bg-black border border-white/10 rounded-xl p-4 font-mono text-xs text-green-400 h-[60vh] overflow-y-auto">
        {logs.map((log: string, i: number) => (
          <div key={i} className="mb-1 border-b border-white/5 pb-1">{log}</div>
        ))}
      </div>
    </div>
  );
};
