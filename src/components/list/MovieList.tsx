import React from 'react';
import { Row, Col } from 'antd';
import { Movie } from '../../types/Movie';
import MovieCard from '../card/MovieCard';
import styles from './MovieList.module.scss';

interface MovieListProps {
    movies: Movie[];
    onRate: (movie: Movie, rating: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onRate }) => {
    return (
        <Row className={styles.list}>
            {movies.map(movie => (
                <Col key={movie.id} xs={24} md={12}>
                    <MovieCard onRate={onRate} movie={movie} />
                </Col>
            ))}
        </Row>
    );
};

export default MovieList;
