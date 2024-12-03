import React, { createContext, useContext, useState } from 'react';
import { Movie } from '../types/Movie';

interface RatedMoviesContextProps {
    ratedMovies: Movie[];
    addRatedMovie: (movie: Movie, rating: number) => void;
    updateRating: (movie: Movie, rating: number) => void;
}

const RatedMoviesContext = createContext<RatedMoviesContextProps | undefined>(undefined);

export const RatedMoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);

    const addRatedMovie = (movie: Movie, rating: number) => {
        setRatedMovies(prev => {
            if (!prev.find(m => m.id === movie.id)) {
                return [...prev, { ...movie, userRating: rating }];
            }
            return prev.map(m => (m.id === movie.id ? { ...m, userRating: rating } : m));
        });
    };

    const updateRating = (movie: Movie, rating: number) => {
        setRatedMovies(prev => prev.map(m => (m.id === movie.id ? { ...m, uaser_rating: rating } : m)));
    };

    return (
        <RatedMoviesContext.Provider value={{ ratedMovies, addRatedMovie, updateRating }}>
            {children}
        </RatedMoviesContext.Provider>
    );
};

export const useRatedMovies = () => {
    const context = useContext(RatedMoviesContext);
    if (!context) {
        throw new Error('useRatedMovies must be used within RatedMoviesProvider');
    }
    return context;
};
