import { createContext } from 'react';
import type { AppStateContextType } from '../types';

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);
