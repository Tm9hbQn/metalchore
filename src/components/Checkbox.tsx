import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

export const Checkbox = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors"
      onClick={onChange}
    >
      <motion.div
        layout
        className={clsx(
          "w-8 h-8 rounded-md border-2 flex items-center justify-center transition-colors shrink-0",
          checked ? "bg-green-500 border-green-500" : "border-gray-500 bg-transparent"
        )}
      >
        {checked && <Check className="w-5 h-5 text-black" />}
      </motion.div>
      <span className={clsx(
        "text-lg transition-all duration-300 relative",
        checked ? "text-gray-500" : "text-white"
      )}>
        {label}
        {checked && (
          <motion.div
            layoutId={`strikethrough-${label}`}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            className="absolute top-1/2 left-0 h-0.5 bg-gray-500 -translate-y-1/2"
          />
        )}
      </span>
    </div>
  );
};
