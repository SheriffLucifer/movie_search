import ReactDOM from 'react-dom/client';
import App from './app';
import GlobalStyles from './assets/styles/global.styles';
import { GenreProvider } from './context/GenreProvider';
import { RatedMoviesProvider } from './context/RatedMoviesProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RatedMoviesProvider>
        <GenreProvider>
            <App />
            <GlobalStyles />
        </GenreProvider>
    </RatedMoviesProvider>
);
