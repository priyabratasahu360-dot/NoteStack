import { useState, useEffect } from "react";
import { ThemeContext } from "./themeContext";

export const THEMES = [
  { id: "dark", label: "Midnight Indigo", icon: "🌙", isDark: true },
  { id: "light", label: "Clean Slate", icon: "☀️", isDark: false },
  { id: "emerald", label: "Forest Mint", icon: "🌲", isDark: true },
  { id: "cyberpunk", label: "Cyberpunk Neon", icon: "⚡", isDark: true },
  { id: "sunset", label: "Sunset Plum", icon: "🌅", isDark: true },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme !== "light";

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
