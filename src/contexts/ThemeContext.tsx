import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  t: {
    heading: string;
    sub: string;
    muted: string;
    cardBg: string;
  };
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  useEffect(() => {
    const saved = localStorage.getItem("devscore_theme");
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("devscore_theme", next);
    applyTheme(next);
  };

  const isDark = theme === "dark";

  const t = {
    heading: isDark ? "text-gray-100" : "text-gray-900",
    sub: isDark ? "text-gray-300" : "text-gray-700",
    muted: isDark ? "text-gray-400" : "text-gray-500",
    cardBg: isDark ? "glass" : "bg-white",
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.classList.toggle("dark", theme === "dark");

  document.body.className =
    theme === "dark"
      ? "bg-gray-900 text-gray-100 dark"
      : "bg-white text-gray-900 light";
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
