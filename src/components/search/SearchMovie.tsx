import React, { useState } from 'react';
import SearchForm from './SearchForm';
import { Movie } from '../../types/Movie';
import api from '../../api';
import MovieList from '../list/MovieList';
import { Alert, Spin } from 'antd';

const SearchMovie: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [offline, setOffline] = useState<boolean>(false);

    const searchMovies = async (query: string) => {
        setLoading(true);
        setError(null);
        setOffline(false);

        try {
            if (!navigator.onLine) {
                setOffline(true);
                return;
            }

            const response = await api.get('/search/movie', {
                params: { query },
            });
            setMovies(response.data.results);
        } catch (error) {
            setError('Ошибка при загрузке фильмов. Попробуйте еще раз.');
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SearchForm onSearch={searchMovies} />
            {offline && (
                <Alert
                    message='Нет соединения с интернетом'
                    description='Проверьте Ваше интернет-соединение и повторите попытку.'
                    type='error'
                    showIcon
                    style={{ marginBottom: 20 }}
                />
            )}
            {error && <Alert message='Ошибка' description={error} type='error' showIcon style={{ marginBottom: 20 }} />}
            {loading ? <Spin size='large' style={{ marginBottom: 20 }} /> : <MovieList movies={movies} />}
        </div>
    );
};

export default SearchMovie;
