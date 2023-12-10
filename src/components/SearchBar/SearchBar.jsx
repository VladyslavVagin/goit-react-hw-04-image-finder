import React from 'react';
import css from './SearchBar.module.css'

const SearchBar = ({onSubmit}) => {
  return (
    <header className={css.searchbar}>
      <p className={css.title}>PIXABAY.COM</p>
      <form className={css.form} onSubmit={onSubmit}>
        <button type="submit" className={css.button}></button>

        <input
          className={css.input}
          type="text"
          autoComplete="false"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
