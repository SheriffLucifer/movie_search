import React, { useMemo } from 'react';
import { Card, message, Rate } from 'antd';
import { Movie } from '../../types/Movie';
import styles from './MovieCard.module.scss';
import { truncateText } from '../../utils/truncatetext';
import { formatDate } from '../../utils/formatDate';
import { getRatingColor } from '../../utils/getRatingColor';
import { useGenres } from '../../context/GenreProvider';
import { truncateTitle } from '../../utils/truncateTitle';

interface MovieCardProps {
    movie: Movie;
    onRate: (movie: Movie, rating: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onRate }) => {
    const { title, release_date, overview, poster_path, vote_average, genre_ids, user_rating } = movie;
    const { genres } = useGenres();

    const movieGenres = useMemo(() => {
        return genre_ids.map(id => genres.find(genre => genre.id === id)?.name).filter(Boolean);
    }, [genre_ids, genres]);

    const handleRate = async (value: number) => {
        onRate(movie, value);
        message.success(`Вы поставили фильму ${title} оценку ${value}`);
    };

    return (
        <Card
            className={styles.card}
            cover={<img className={styles.picture} alt={title} src={`https://image.tmdb.org/t/p/w500${poster_path}`} />}
        >
            <div className={styles.rating}>
                <svg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='17' cy='17' r='16' stroke={getRatingColor(vote_average)} strokeWidth='2' />
                </svg>
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '12px',
                        fontWeight: 400,
                        color: '#000',
                    }}
                >
                    {vote_average.toFixed(1)}
                </span>
            </div>
            <Card.Meta
                className={styles.card__body}
                title={
                    <div className={styles.title}>
                        {truncateTitle(title)}
                        {release_date && <div className={styles.release}>{formatDate(release_date)}</div>}
                        <div>
                            {movieGenres.map(genre => (
                                <p key={genre} className={styles.genres}>
                                    {genre}
                                </p>
                            ))}
                        </div>
                    </div>
                }
                description={<p className={styles.overview}>{truncateText(overview, 200)}</p>}
            />
            <Rate className={styles.stars} count={10} value={user_rating || 0} onChange={handleRate} allowHalf />
        </Card>
    );
};

export default MovieCard;
