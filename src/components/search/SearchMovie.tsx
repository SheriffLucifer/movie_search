import React, { useState } from 'react';
import SearchForm from './SearchForm';
import { Movie } from '../../types/Movie';
import api from '../../api';
import MovieList from '../list/MovieList';

const Search: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async (query: string) => {
        setLoading(true);
        try {
            const response = await api.get('/search/movie', {
                params: { query },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <SearchForm onSearch={searchMovies} />
            {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
        </div>
    );
};

export default Search;
