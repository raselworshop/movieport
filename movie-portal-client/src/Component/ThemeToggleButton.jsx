import { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";

const ThemeToggleButton = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-yellow-400' : 'bg-gray-700 text-white'}`}
    >
      {theme === 'light' ? '🌞 Light' : '🌜 Dark'}
    </button>
  );
};

export default ThemeToggleButton;
