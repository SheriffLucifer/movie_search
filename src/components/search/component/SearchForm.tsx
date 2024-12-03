import React, { useState } from 'react';
import { Input } from 'antd';
import styles from './SearchForm.module.scss';

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
        <div className={styles.input__block}>
            <Search
                className={styles.input}
                placeholder='Type to search...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onSearch={handleSearch}
                enterButton
            />
        </div>
    );
};

export default SearchForm;
