import { create } from "zustand";

interface ThemeStore {
  mode: "light" | "dark";
  toggleMode: () => void;
  setMode: (mode: "light" | "dark") => void;
}

// Get initial mode from localStorage or system preference
const getInitialMode = (): "light" | "dark" => {
  const saved = localStorage.getItem("theme-mode");
  if (saved === "light" || saved === "dark") return saved;

  // Check system preference
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
};

export const useThemeStore = create<ThemeStore>((set) => ({
  mode: getInitialMode(),
  toggleMode: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", newMode);
      return { mode: newMode };
    }),
  setMode: (mode) => {
    localStorage.setItem("theme-mode", mode);
    set({ mode });
  },
}));
