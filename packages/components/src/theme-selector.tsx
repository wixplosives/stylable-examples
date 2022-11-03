import React from 'react';
import { classes as project, vars } from './common/project.st.css';
import { classes as basic } from './themes/basic.st.css';

const themes = {
    raw: [project.root],
    basic: [project.root, basic.root],
};

export function changeTheme(name: keyof typeof themes) {
    if (themes[name]) {
        localStorage.componentLibCurrentTheme = name;
        document.documentElement.className = themes[name].join(' ');
    }
}

export function ThemeBar({ theme }: { theme: string }) {
    return (
        <div style={{ padding: 10, fontFamily: `var(${vars['font-family-primary']})` }}>
            <span>Theme: </span>
            <select
                aria-label='Theme Selector'
                defaultValue={theme}
                style={{ padding: 10 }}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    changeTheme(e.target.value as keyof typeof themes)
                }
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
