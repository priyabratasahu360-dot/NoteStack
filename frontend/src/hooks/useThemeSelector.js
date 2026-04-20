import { useState } from "react";


export const useThemeSelector = () => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    }
    
    return {isDark, toggleTheme};
}