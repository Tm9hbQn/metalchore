import { useState, type ReactNode } from 'react';
import { KittenContext, type KittenAction } from './KittenContext';

export const KittenProvider = ({ children }: { children: ReactNode }) => {
  const [currentAction, setAction] = useState<KittenAction>('idle');
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [targetElement, setTargetElement] = useState<DOMRect | null>(null);

  const speak = (text: string, duration = 3000) => {
    setSpeechText(text);
    setTimeout(() => {
      setSpeechText(null);
    }, duration);
  };

  const triggerTransition = () => {
    setAction('hide');
    setSpeechText(null);
    setTimeout(() => {
      setAction('peek');
      setTimeout(() => {
        setAction('walk');
      }, 1000);
    }, 500);
  };

  return (
    <KittenContext.Provider
      value={{
        currentAction,
        setAction,
        speechText,
        speak,
        targetElement,
        setTargetElement,
        triggerTransition,
      }}
    >
      {children}
    </KittenContext.Provider>
  );
};
