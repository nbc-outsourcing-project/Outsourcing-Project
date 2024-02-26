import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

const Location = () => {
  const [info, setInfo] = useState();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState({
    center: {
      lat: 37.566826,
      lng: 126.9786567
    },
    errMsg: null
  });

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation((prev) => ({
            ...prev,
            center: { lat: latitude, lng: longitude }
          }));
        },
        (err) => {
          console.log(err.message);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log('Geolocation을 지원하지 않습니다.');
    }
  }, []);

  useEffect(() => {
    if (!map || !location.center.lat || !location.center.lng) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      '카페',
      (data, status) => {
        console.log('카페 검색 결과:', data);
        if (status === window.kakao.maps.services.Status.OK) {
          const bounds = new window.kakao.maps.LatLngBounds();
          let newMarkers = [];

          for (var i = 0; i < Math.min(15, data.length); i++) {
            newMarkers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x
              },
              content: data[i].place_name
            });
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }

          setMarkers(newMarkers);
          map.setBounds(bounds);
          console.log('설정된 마커:', newMarkers);
        }
      },
      {
        location: new window.kakao.maps.LatLng(location.center.lat, location.center.lng),
        radius: 1000
      }
    );
  }, [map, location.center.lat, location.center.lng]);

  const handleDragEnd = () => {
    const center = map.getCenter();
    setLocation({
      center: { lat: center.getLat(), lng: center.getLng() }
    });
  };

  return (
    <Map
      center={location.center}
      style={{
        width: '100%',
        height: '100vh'
      }}
      level={3}
      onCreate={setMap}
      onDragEnd={handleDragEnd}
    >
      {markers.map((marker, index) => (
        <MapMarker key={`marker-${index}`} position={marker.position} onClick={() => setInfo(marker)}>
          {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
        </MapMarker>
      ))}
    </Map>
  );
};

export default Location;