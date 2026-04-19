import { useContext } from 'react';
import { type KittenContextType } from '../context/KittenContext';
import { KittenContext } from '../context/KittenContext';

export const useKitten = (): KittenContextType => {
  const context = useContext(KittenContext);
  if (context === undefined) {
    throw new Error('useKitten must be used within a KittenProvider');
  }
  return context;
};
