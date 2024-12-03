export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    genre_ids: number[];
    release_date: string;
    vote_average: number;
    user_rating?: number;
}
