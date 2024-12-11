import React, { createContext, useState } from 'react';
import { Movie } from '../types/Movie';

interface RatedMovie {
    movie: Movie;
    rating: number;
}

interface RatedMoviesContextProps {
    ratedMovies: Record<number, RatedMovie>;
    addRatedMovie: (movieId: number, movie: Movie, rating: number) => void;
}

export const RatedMoviesContext = createContext<RatedMoviesContextProps | undefined>(undefined);

export const RatedMoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ratedMovies, setRatedMovies] = useState<Record<number, RatedMovie>>({});

    const addRatedMovie = (movieId: number, movie: Movie, rating: number) => {
        setRatedMovies(prev => ({
            ...prev,
            [movieId]: { movie, rating },
        }));
    };

    return <RatedMoviesContext.Provider value={{ ratedMovies, addRatedMovie }}>{children}</RatedMoviesContext.Provider>;
};
