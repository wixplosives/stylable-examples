import { Button } from 'component-library';
import { classes, st } from './app.st.css';

export interface AppProps {
    className?: string;
}
export const App: React.FC<AppProps> = ({ className }) => {
    return (
        <div className={st(classes.root, className)}>
            <Button className={classes.button} text="Click me" />
        </div>
    );
};
