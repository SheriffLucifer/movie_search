import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <Search
            placeholder='Search for a movie'
            value={query}
            onChange={e => setQuery(e.target.value)}
            onSearch={handleSearch}
            enterButton
        />
    );
};

export default SearchForm;
