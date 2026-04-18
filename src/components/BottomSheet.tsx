import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BottomSheet = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 start-0 end-0 z-50 bg-[#111] rounded-t-3xl border-t border-white/10 p-6 shadow-2xl max-h-[90vh] overflow-y-auto overscroll-contain"
          >
            <div className="w-12 h-1.5 bg-gray-600 rounded-full mx-auto mb-6 opacity-50" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
