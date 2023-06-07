import React, { useState } from 'react';
import { MagnifyingGlassIcon, Cross2Icon } from '@radix-ui/react-icons';
import SuggestionList from './SuggestionList/SuggestionList';
import { useDebounce } from '../../hooks/useDebounce';

import styles from './Searchbar.module.scss';

const Searchbar = () => {
  const [searchTerm, setValue] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  const handleChange = (keyword: string) => {
    setValue(keyword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.searchbar}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Поиск..."
          />
          <button
            type="button"
            className={`${styles.btnClose} ${
              searchTerm && styles.btnCloseActive
            }`}
            onClick={() => setValue('')}
          >
            <Cross2Icon width="18" height="18" />
          </button>
          <button type="submit" className={styles.btnSearch}>
            <MagnifyingGlassIcon width="21" height="21" />
          </button>
        </div>
      </form>
      {debouncedSearchTerm && (
        <SuggestionList
          key={debouncedSearchTerm}
          keyword={debouncedSearchTerm}
        />
      )}
    </div>
  );
};

export default Searchbar;
