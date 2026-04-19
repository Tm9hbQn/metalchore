import { motion, AnimatePresence } from 'framer-motion';
import { useKitten } from '../../hooks/useKitten';
import { useEffect, useState, useRef } from 'react';
import './UndeadKitten.css';

export const UndeadKitten = () => {
  const { currentAction, speechText, targetElement } = useKitten();
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight - 100 });
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const posRef = useRef(position); // Track position for comparison without dependencies

  useEffect(() => {
    posRef.current = position;
  }, [position]);

  useEffect(() => {
    if (!targetElement) return;

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {

    // Defer state update to avoid cascading render warning

        const rect = targetElement;
        const targetX = rect.left + (rect.width / 2);
        const targetY = rect.top - 60;

        if (targetX < posRef.current.x) {
            setDirection('left');
        } else if (targetX > posRef.current.x) {
            setDirection('right');
        }

        setPosition({
            x: targetX,
            y: targetY
        });
    }, 0);

    return () => clearTimeout(timeoutId);

  }, [targetElement]);


  if (currentAction === 'hide') return null;

  return (
    <motion.div
      className={`fixed top-0 left-0 z-[999] pointer-events-none undead-kitten ${currentAction}`}
      animate={{
        x: position.x,
        y: position.y,
        scaleX: direction === 'left' ? -1 : 1
      }}
      transition={{
          type: "spring",
          stiffness: currentAction === 'jump' ? 100 : 50,
          damping: currentAction === 'jump' ? 15 : 20,
          mass: 1,
          duration: currentAction === 'jump' ? 0.5 : 2
      }}
      style={{ width: 60, height: 60, marginLeft: -30, marginTop: -60 }}
    >

      {/* Speech Bubble (doesn't flip with scaleX) */}
      <AnimatePresence>
          {speechText && (
              <motion.div
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0, scaleX: direction === 'left' ? -1 : 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute bottom-[80px] left-[-30px] bg-white text-black font-bold text-xs p-2 rounded-xl rounded-bl-none border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] min-w-[100px] pointer-events-auto z-10 text-center"
                  style={{ transformOrigin: 'bottom left' }}
                  dir="rtl"
              >
                  {speechText}
              </motion.div>
          )}
      </AnimatePresence>

      <div className="cat-body relative w-full h-full">
         {/* Skeleton / Undead Cat Vector Art (Simplified with CSS) */}

         <div className="cat-tail absolute bottom-2 -left-4 w-12 h-3 bg-[#111] rounded-full origin-right border border-[#333]" />

         <div className="cat-leg-back-left absolute bottom-0 left-2 w-3 h-8 bg-[#222] rounded-full border border-[#444]" />
         <div className="cat-leg-front-left absolute bottom-0 right-8 w-2 h-7 bg-[#222] rounded-full border border-[#444]" />

         <div className="cat-torso absolute bottom-4 left-0 w-12 h-8 bg-[#1a1a1a] rounded-[20px] border-2 border-[#333] shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.5)]">
             {/* Exposed ribs */}
             <div className="absolute top-2 left-2 w-1 h-3 bg-gray-400 rounded-full" />
             <div className="absolute top-2 left-4 w-1 h-3 bg-gray-400 rounded-full" />
             <div className="absolute top-2 left-6 w-1 h-3 bg-gray-400 rounded-full" />
         </div>

         <div className="cat-leg-back-right absolute bottom-0 left-4 w-3 h-8 bg-[#111] rounded-full border border-[#333]" />
         <div className="cat-leg-front-right absolute bottom-0 right-6 w-2 h-7 bg-[#111] rounded-full border border-[#333]" />

         <div className="cat-head absolute bottom-6 right-0 w-10 h-10 bg-[#1a1a1a] rounded-full border-2 border-[#333] shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.5)]">
             <div className="cat-ear-left absolute -top-2 left-0 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-[#1a1a1a]" />
             <div className="cat-ear-right absolute -top-3 right-2 w-0 h-0 border-l-5 border-r-5 border-b-10 border-transparent border-b-[#1a1a1a] rotate-12" />

             {/* Glowing Eyes */}
             <div className="cat-eye-left absolute top-3 left-2 w-2 h-2 bg-[#39FF14] rounded-full shadow-[0_0_5px_rgba(57,255,20,1)]" />
             <div className="cat-eye-right absolute top-3 right-3 w-3 h-3 bg-[#39FF14] rounded-full shadow-[0_0_8px_rgba(57,255,20,1)] flex items-center justify-center">
                 <div className="w-[1px] h-2 bg-black" /> {/* Slit pupil */}
             </div>

             <div className="cat-nose absolute top-6 right-4 w-1 h-1 bg-pink-900 rounded-full" />

             {/* Skull crack */}
             <div className="absolute top-1 left-4 w-3 h-[1px] bg-gray-600 rotate-45" />
         </div>
      </div>
    </motion.div>
  );
};
