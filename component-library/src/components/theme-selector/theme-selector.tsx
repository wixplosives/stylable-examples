import { ChangeEvent, useLayoutEffect, useState } from 'react';
import { classes } from './theme-selector.st.css.js';

function changeTheme<T extends Record<string, string[]>>(themes: T, name: keyof T) {
    if (themes[name]) {
        localStorage.componentLibCurrentTheme = name;
        document.documentElement.className = themes[name].join(' ');
    }
}

export function ThemeBar({ themes }: { themes: Record<string, string[]> }) {
    const [theme, setTheme] = useState(() => {
        return (localStorage.componentLibCurrentTheme as keyof typeof themes) || Object.keys(themes)[0];
    });
    useLayoutEffect(() => {
        changeTheme(themes, theme);
    });
    return (
        <div className={classes.root}>
            <span>Theme: </span>
            <select
                className={classes.select}
                defaultValue={theme}
                style={{ padding: 10 }}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    const newTheme = e.target.value as keyof typeof themes;
                    changeTheme(themes, newTheme);
                    setTheme(newTheme);
                }}
            >
                {Object.keys(themes).map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
}
