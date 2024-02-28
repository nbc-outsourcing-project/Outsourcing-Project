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
            <strong>{cafe.place_name}</strong>
            <p>주소: {cafe.address_name}</p>
            <p>도로명 주소: {cafe.road_address_name}</p>
            <p>전화번호: {cafe.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
