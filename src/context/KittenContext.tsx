import { createContext } from 'react';

export type KittenAction = 'idle' | 'walk' | 'sit' | 'lick' | 'sleep' | 'alert' | 'prep-jump' | 'jump' | 'hide' | 'peek';

export interface KittenContextType {
  currentAction: KittenAction;
  setAction: (action: KittenAction) => void;
  speechText: string | null;
  speak: (text: string, duration?: number) => void;
  targetElement: DOMRect | null;
  setTargetElement: (rect: DOMRect | null) => void;
  triggerTransition: () => void;
}

export const KittenContext = createContext<KittenContextType | undefined>(undefined);
