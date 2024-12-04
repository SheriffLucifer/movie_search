import React from 'react';
import { useRatedMovies } from '../../context/RatedMoviesProvider';
import MovieList from '../list/MovieList';

const RatedMovies: React.FC = () => {
    const { ratedMovies } = useRatedMovies();

    const ratedMoviesArray = Object.values(ratedMovies).map(item => item.movie);

    if (ratedMoviesArray.length === 0) {
        return <p style={{ textAlign: 'center', fontSize: 48 }}>Вы пока не оценили ни одного фильма.</p>;
    }

    return <MovieList movies={ratedMoviesArray} onRate={() => {}} />;
};

export default RatedMovies;
