import React from 'react';
import { useSelector } from 'react-redux';

const SearchList = () => {
  const cafes = useSelector((state) => state.todo);

  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {cafes.map((cafe) => (
          <li key={cafe.id}>
            {cafe.name} - 위치: {cafe.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
