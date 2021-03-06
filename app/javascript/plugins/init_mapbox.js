import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      dragPan: true,
      style: 'mapbox://styles/mapbox/streets-v10'
    });
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
    // map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
    //                                   mapboxgl: mapboxgl }));
  }
};

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 2 });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    // console.log(marker);
    const popup = new mapboxgl.Popup(); // add this
        // Create a HTML element for your custom marker
    const element = document.createElement('div');
    element.className = 'marker mission-marker mission-marker-' + marker.id;
    element.style.backgroundImage = `url(${marker.imageUrl})`;
    // element.style.backgroundColor = 'green'
    element.style.backgroundSize = 'contain';


    new mapboxgl.Marker(element)
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup) // add this
      .addTo(map);
  });
};

export { initMapbox };
