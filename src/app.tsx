import { Tabs } from 'antd';
import SearchMovie from './components/search/SearchMovie';
import RatedMovies from './components/ratedMovies/RatedMovies';

const App: React.FC = () => {
    const items = [
        {
            key: '1',
            label: 'Search',
            children: <SearchMovie />,
        },
        {
            key: '2',
            label: 'Rated',
            children: <RatedMovies />,
        },
    ];
    return <Tabs defaultActiveKey='1' centered items={items} />;
};

export default App;
