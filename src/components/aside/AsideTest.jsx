import { Link, Outlet } from 'react-router-dom';
import * as S from '../../styles/aside';
import SearchCustomHook from './SearchCustomHook';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Aside = () => {
  const { keyword, setKeyword, places, loading, search } = SearchCustomHook(); // 커스텀 훅 사용

  // 검색 버튼을 클릭했을 때 실행되는 함수
  const handleSearch = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <>
      <S.Aside>
        <Link to="/">COFFEEHOLIC</Link>
        <div>
          <form onSubmit={handleSearch}>
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} id="keyword" size="15" />
            <button type="submit" disabled={loading}>
              {loading ? '검색 중...' : '검색'}
            </button>
          </form>
        </div>
        <div>
          <ul>
            {places.map((place, index) => (
              <li key={index}>
                <span className={`markerbg marker_${index + 1}`}></span>
                <div className="info">
                  <h5>{place.place_name}</h5>
                  {/* 도로명 주소와 지번 주소가 있는 경우 각각 출력합니다. */}
                  <p>
                    {place.road_address_name && (
                      <>
                        <span>{place.road_address_name}</span>
                        <br />
                        <span className="jibun gray">{`(${place.address_name})`}</span>
                      </>
                    )}
                  </p>
                  {/* 도로명 주소만 있는 경우 출력합니다. */}
                  {!place.road_address_name && <span>{place.address_name}</span>}
                  {/* 전화번호 출력 */}
                  <span className="tel">{place.phone}</span>
                </div>
              </li>
            ))}
          </ul>
          {/* <Map
            style={{ width: '100%', height: '400px' }}
            center={new window.kakao.maps.LatLng(37.566826, 126.9786567)}
            level={3}
          > */}
          {/* 검색된 장소의 마커를 지도에 표시합니다. */}
          {/* {markers.map((marker) => (
              <MapMarker key={marker.id} position={marker.position} onClick={() => displayInfowindow(marker)} />
            ))}
          </Map> */}
        </div>
      </S.Aside>
      <Outlet />
    </>
  );
};

export default Aside;
