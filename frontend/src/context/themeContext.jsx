import { createContext, useContext, useState } from "react";

export const themeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
}

export default function useTheme() {
  return useContext(themeContext);
}
