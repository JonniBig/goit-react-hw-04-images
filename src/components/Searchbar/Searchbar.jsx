import React, { useState } from 'react';
import CSS from './Searchbar.module.scss';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={CSS.Searchbar}>
      <form className={CSS.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={CSS.SearchFormButton}>
          <span className={CSS.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={CSS.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
