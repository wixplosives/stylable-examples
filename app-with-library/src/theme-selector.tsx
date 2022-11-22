import type { ChangeEvent } from 'react';
import { project } from 'component-library';

const themes = {
    raw: [project.root],
};

export function changeTheme(name: keyof typeof themes) {
    if (themes[name]) {
        localStorage.componentLibCurrentTheme = name;
        document.documentElement.className = themes[name].join(' ');
    }
}

export function ThemeBar({ theme }: { theme: string }) {
    return (
        <div style={{ padding: 10, fontFamily: 'monospace' }}>
            <span>Theme: </span>
            <select
                defaultValue={theme}
                style={{ padding: 10 }}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => changeTheme(e.target.value as keyof typeof themes)}
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
