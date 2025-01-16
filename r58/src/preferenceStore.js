// preferenceStore.js
import { create } from "zustand";

const usePreferenceStore = create((set) => ({
  genreFilter: [], // Array to store selected genre IDs or names
  languageFilter: [], // Array to store selected language codes or names

  setGenreFilter: (genres) => set({ genreFilter: genres }),
  addGenreToFilter: (genre) =>
    set((state) => ({ genreFilter: [...state.genreFilter, genre] })),
  removeGenreFromFilter: (genre) =>
    set((state) => ({
      genreFilter: state.genreFilter.filter((g) => g !== genre),
    })),
  clearGenreFilter: () => set({ genreFilter: [] }),

  setLanguageFilter: (languages) => set({ languageFilter: languages }),
  addLanguageToFilter: (language) =>
    set((state) => ({ languageFilter: [...state.languageFilter, language] })),
  removeLanguageFromFilter: (language) =>
    set((state) => ({
      languageFilter: state.languageFilter.filter((lang) => lang !== language),
    })),
  clearLanguageFilter: () => set({ languageFilter: [] }),

  clearAllFilters: () => set({ genreFilter: [], languageFilter: [] }), // Already exists, but let's keep it for clarity

  // --- NEW: Reset Filters Action ---
  resetFilters: () => set({ genreFilter: [], languageFilter: [] }),
}));

export default usePreferenceStore;
