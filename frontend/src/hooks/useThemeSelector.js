import { useContext } from "react";
import { ThemeContext } from "./themeContext";

export const useThemeSelector = () => {
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error("Something went wrong in theme");
    }

    return context;
}