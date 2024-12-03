import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';

interface Genre {
    id: number;
    name: string;
}

interface GenreContextProps {
    genres: Genre[];
}

export const GenreContext = createContext<GenreContextProps | undefined>(undefined);

export const GenreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await api.get('/genre/movie/list', {
                    params: { language: 'en-US' },
                });
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Ошибка при получении жанров: ', error);
            }
        };
        fetchGenres();
    }, []);

    return <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>;
};

export const useGenres = () => {
    const context = useContext(GenreContext);
    if (!context) {
        throw new Error('useGenres must be used within GenreProvider');
    }
    return context;
};
