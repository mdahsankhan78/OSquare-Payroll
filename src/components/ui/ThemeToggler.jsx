import { Moon, Sun } from "lucide-react";
import { ThemeButton } from "./ThemeButton";
import { useTheme } from "./../theme-provider";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
      <ThemeButton variant="outline" size="icon" onClick={toggleTheme} className={theme === 'dark' ? 'text-white' : 'text-dark'}>
        <Sun className="absolute h-full rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        <Moon className="rotate-0 scale-100 transition-all duration-300 dark:-rotate-180 dark:scale-0 " />
      </ThemeButton>
  );
}
