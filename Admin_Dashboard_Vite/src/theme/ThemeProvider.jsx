import { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_STORAGE_KEY = "admin-dashboard-theme";
const ThemeContext = createContext(null);

const getInitialTheme = () => {
	if (typeof localStorage === "undefined") {
		return "light";
	}

	const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
	return storedTheme === "dark" ? "dark" : "light";
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	const value = useMemo(
		() => ({
			theme,
			isDark: theme === "dark",
			toggleTheme: () =>
				setTheme((currentTheme) =>
					currentTheme === "dark" ? "light" : "dark",
				),
		}),
		[theme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
};
