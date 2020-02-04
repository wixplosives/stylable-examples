import React from 'react';
import { classes as project, vars } from './common/project.st.css';
import { classes as basic } from './themes/basic.st.css';
import { classes as dark } from './themes/dark.st.css';
import { classes as gentle } from './themes/gentle.st.css';

const themes = {
    basic: [project.root, basic.root],
    dark: [project.root, basic.root, dark.root],
    gentle: [project.root, basic.root, gentle.root]
};

export function changeTheme(name: keyof typeof themes) {
    localStorage.currentTheme = name;
    document.documentElement.className = themes[name].join(' ');
}

export function ThemeBar({ theme }: { theme: string }) {
    return (
        <div style={{ padding: 10, fontFamily: `var(${vars['font-family-primary']})` }}>
            <span>Theme: </span>
            <select
                defaultValue={theme}
                style={{ padding: 10 }}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    changeTheme(e.target.value as keyof typeof themes)
                }
            >
                <option value="basic">Basic</option>
                <option value="dark">Dark</option>
                <option value="gentle">Gentle</option>
            </select>
        </div>
    );
}
