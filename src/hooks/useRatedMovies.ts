import { useContext } from 'react';
import { RatedMoviesContext } from '../context/RatedMoviesProvider';

export const useRatedMovies = () => {
    const context = useContext(RatedMoviesContext);
    if (!context) {
        throw new Error('useRatedMovies must be used within RatedMoviesProvider');
    }
    return context;
};
