import React from 'react';
import { Row, Col } from 'antd';
import { Movie } from '../../types/Movie';
import MovieCard from '../card/MovieCard';

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <Row gutter={[16, 16]}>
            {movies.map(movie => (
                <Col key={movie.id} xs={24} md={12}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </Row>
    );
};

export default MovieList;
