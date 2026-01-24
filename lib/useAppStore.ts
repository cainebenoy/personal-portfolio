import { create } from 'zustand';

interface AppState {
  theme: 'sketch' | 'blueprint';
  toggleTheme: () => void;
  
  // Track which skills to highlight when hovering over projects
  highlightedSkills: string[];
  setHighlightedSkills: (skills: string[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'sketch',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'sketch' ? 'blueprint' : 'sketch' 
  })),

  highlightedSkills: [],
  setHighlightedSkills: (skills) => set({ highlightedSkills: skills }),
}));
