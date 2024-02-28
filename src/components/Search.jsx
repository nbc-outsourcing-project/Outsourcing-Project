import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTodos } from '../api/api';
import { setTodos } from '../shared/store/modules/test'; // Removed addTodo since it seems not used
import SearchList from './SearchList';

const Search = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    try {
      const cafes = await getTodos(query);
      console.log('Cafe Information:', cafes);

      dispatch(setTodos(cafes));
    } catch (error) {
      console.error('Error fetching cafe information:', error);
    }
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="카페 검색" />
      <button onClick={() => handleSearch(searchQuery)}>검색</button>
      <SearchList />
    </div>
  );
};

export default Search;
