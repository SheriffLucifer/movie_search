import React, { useState } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import SearchForm from './component/SearchForm';
import { Movie } from '../../types/Movie';
import api from '../../api/api';
import MovieList from '../list/MovieList';
import { useRatedMovies } from '../../context/RatedMoviesProvider';
import styles from './SearchMovie.module.scss';

const SearchMovie: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [offline, setOffline] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { addRatedMovie, ratedMovies } = useRatedMovies();

    const searchMovies = async (newQuery: string, page: number = 1) => {
        setLoading(true);
        setError(null);
        setOffline(false);

        try {
            if (!navigator.onLine) {
                setOffline(true);
                return;
            }

            const response = await api.get('/search/movie', {
                params: { query: newQuery, page },
            });

            setMovies(response.data.results || []);
            setTotalPages(response.data.total_pages || 0);
            setQuery(newQuery);
        } catch (error) {
            setError('Ошибка при загрузке фильмов. Попробуйте еще раз.');
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRateMovie = (movie: Movie, rating: number) => {
        addRatedMovie(movie.id, movie, rating);
    };

    const moviesWithRatings = movies.map(movie => ({ ...movie, user_rating: ratedMovies[movie.id]?.rating || 0 }));

    return (
        <div className={styles.content}>
            <SearchForm
                onSearch={query => {
                    setCurrentPage(1);
                    searchMovies(query);
                }}
            />
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
                <>
                    <MovieList movies={moviesWithRatings} onRate={handleRateMovie} />
                    {totalPages > 1 && (
                        <Pagination
                            className={styles.pagination}
                            current={currentPage}
                            total={totalPages * 10}
                            onChange={page => {
                                setCurrentPage(page);
                                searchMovies(query, page);
                            }}
                            pageSize={10}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default SearchMovie;
