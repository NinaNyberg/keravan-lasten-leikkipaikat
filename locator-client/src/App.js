import { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Sidebar from './component/Sidebar';

const mapboxToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
mapboxgl.accessToken = mapboxToken;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(25.105);
  const [lat, setLat] = useState(60.40338);
  const [zoom, setZoom] = useState(13);
  const [playgrounds, setPlaygrounds] = useState([]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    getPlaygrounds();
  }, []);

  async function getPlaygrounds() {
    const res = await fetch('http://localhost:5000/api/v1/playgrounds');
    const data = await res.json();
    console.log(data.data);

    const playgrounds = data.data.map((playground) => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            playground.location.coordinates[0],
            playground.location.coordinates[1]
          ]
        },
        properties: {
          playgroundName: playground.playgroundName
        }
      };
    });
    console.log(playgrounds);

    loadMap(playgrounds);
    setPlaygrounds(playgrounds);
  }

  function loadMap(playgrounds) {
    console.log(map);
    map.current.on('load', () => {
      // map.current.loadImage(playgroundImg, (error, image) => {
      //   if (error) throw error;

      // Add the image to the map style.
      //map.current.addImage('playground', image);
      // Add a data source containing one point feature.
      map.current.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: playgrounds
        }
      });

      map.current.addLayer({
        id: 'points',
        type: 'circle',
        source: 'point',
        minzoom: 10
      });

      map.current.addLayer({
        id: 'texts',
        type: 'symbol',
        source: 'point',
        minzoom: 12,
        layout: {
          // 'icon-image': 'bus-15',
          // 'icon-size': 0.04,
          'text-field': '{playgroundName}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-size': 10,
          'text-offset': [0, 0.9],
          'text-anchor': 'top'
        }
      });
    });
  }

  function flyToPlayground(currentFeature) {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 20
    });
  }

  function flyToCenter() {
    map.current.flyTo({
      center: [lng, lat],
      zoom: zoom
    });
  }

  return (
    <div>
      <Sidebar
        flyToCenter={flyToCenter}
        playgrounds={playgrounds}
        flyToPlayground={flyToPlayground}
      />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
