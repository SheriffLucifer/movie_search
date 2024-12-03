import React, { useState } from 'react';
import SearchForm from './component/SearchForm';
import { Movie } from '../../types/Movie';
import api from '../../api/api';
import MovieList from '../list/MovieList';
import { Alert, Spin } from 'antd';
import styles from './SearchMovie.module.scss';
import { useRatedMovies } from '../../context/RatedMoviesProvider';

const SearchMovie: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [offline, setOffline] = useState<boolean>(false);
    const { addRatedMovie } = useRatedMovies();

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

    const handleRateMovie = (movie: Movie, rating: number) => {
        addRatedMovie(movie, rating);
    };

    return (
        <div className={styles.content}>
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
            {loading ? (
                <Spin size='large' style={{ marginBottom: 20 }} />
            ) : (
                <MovieList movies={movies} onRate={handleRateMovie} />
            )}
        </div>
    );
};

export default SearchMovie;
