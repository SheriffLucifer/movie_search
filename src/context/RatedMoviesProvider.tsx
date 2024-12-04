import React, { createContext, useContext, useState } from 'react';
import { Movie } from '../types/Movie';

interface RatedMoviesContextProps {
    ratedMovies: Record<number, { movie: Movie; rating: number }>;
    addRatedMovie: (movieId: number, movie: Movie, rating: number) => void;
}

const RatedMoviesContext = createContext<RatedMoviesContextProps | undefined>(undefined);

export const RatedMoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ratedMovies, setRatedMovies] = useState<Record<number, { movie: Movie; rating: number }>>({});

    const addRatedMovie = (movieId: number, movie: Movie, rating: number) => {
        setRatedMovies(prev => ({
            ...prev,
            [movieId]: { movie, rating },
        }));
    };

    return <RatedMoviesContext.Provider value={{ ratedMovies, addRatedMovie }}>{children}</RatedMoviesContext.Provider>;
};

export const useRatedMovies = () => {
    const context = useContext(RatedMoviesContext);
    if (!context) {
        throw new Error('useRatedMovies must be used within RatedMoviesProvider');
    }
    return context;
};
