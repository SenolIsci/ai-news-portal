"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const savedTheme = localStorage.getItem("theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute("data-theme", savedTheme);
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    }, [mounted]);

    // Always render the Provider, even if not mounted yet.
    // We can use a default theme for SSR or handle hydration mismatch differently.
    // The previous implementation removed the Provider when !mounted, which caused the error.

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {/* To avoid hydration mismatch, we can suppress children rendering until mounted, 
                OR better, render them but accept that theme might change on client.
                For this specific error, we MUST render the Provider. */}
            {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
