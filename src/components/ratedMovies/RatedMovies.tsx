import React from 'react';
import MovieList from '../list/MovieList';
import { useRatedMovies } from '../../hooks/useRatedMovies';

const RatedMovies: React.FC = () => {
    const { ratedMovies } = useRatedMovies();

    const ratedMoviesArray = Object.values(ratedMovies).map(item => item.movie);

    if (ratedMoviesArray.length === 0) {
        return <p style={{ textAlign: 'center', fontSize: 48 }}>Вы пока не оценили ни одного фильма.</p>;
    }

    return <MovieList movies={ratedMoviesArray} />;
};

export default RatedMovies;
