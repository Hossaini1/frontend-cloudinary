import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useState } from "react";


const themes = {
  light: "light",
  luxury: "luxury",
};

const ThemeToggler = () => {
  const [theme, setTheme] = useState(themes.light);

  const handleThemeToggle = () => {
    const newTheme = theme === themes.light ? themes.luxury : themes.light;
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme",newTheme)
  };
  return <button onClick={handleThemeToggle} className="btn btn-sm">{theme==="light"?<MdOutlineDarkMode />:<MdOutlineLightMode />}</button>;
};
export default ThemeToggler;
