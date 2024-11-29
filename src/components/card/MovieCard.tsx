import React from 'react';
import { Card } from 'antd';
import { Movie } from '../../types/Movie';
import styles from './MovieCard.module.css';
import { format } from 'date-fns';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const { title, release_date, overview, poster_path } = movie;

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text;
        const truncated = text.slice(0, maxLength).split(' ');
        truncated.pop();
        return `${truncated.join(' ')}...`;
    };

    const formatDate = (date: string): string => {
        return format(new Date(date), 'MMMM d, yyyy');
    };

    return (
        <Card
            className={styles.card}
            cover={
                poster_path ? (
                    <img className={styles.picture} alt={title} src={`https://image.tmdb.org/t/p/w500${poster_path}`} />
                ) : (
                    <div />
                )
            }
        >
            <Card.Meta
                title={
                    <div className={styles.title}>
                        <div>
                            {title}
                            {truncateText(overview, 20)}
                        </div>
                        {release_date && <div className={styles.release}>{formatDate(release_date)}</div>}
                    </div>
                }
                description={<p className={styles.overview}>{truncateText(overview, 200)}</p>}
            />
        </Card>
    );
};

export default MovieCard;
