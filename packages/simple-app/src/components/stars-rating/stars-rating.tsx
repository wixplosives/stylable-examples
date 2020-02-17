import React from 'react';
import { st, classes } from './stars-rating.st.css';

export interface StarsRatingProps {
    rating: number;
    className?: string;
}

export const StarsRating = React.memo<StarsRatingProps>(props => {
    const { rating, className } = props;

    const normalizedRating = Math.min(Math.max(rating, 0), 5);

    return (
        <div className={st(classes.root, className)}>
            {Array.from(Array(5), (_, index) => (
                <i
                    title={`${normalizedRating}/5`}
                    key={index}
                    className={st(classes.star, { isHighlighted: index + 1 <= normalizedRating }, 'fas fa-star')}
                />
            ))}
        </div>
    );
});
