import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './SearchForm.module.scss';

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const { Search } = Input;

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className={styles.input__block}>
            <Search
                className={styles.input}
                placeholder='Type to search...'
                value={query}
                onChange={handleQueryChange}
                onSearch={handleSearch}
                enterButton
            />
        </div>
    );
};

export default SearchForm;
