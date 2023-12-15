import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import marker from "../../images/location-dot-solid.svg";

const customIcon = new L.Icon({
  iconUrl: marker, // Specify the path to your custom icon image
  iconSize: [30, 30], // Set the icon size
  iconAnchor: [15, 30], // Set the icon anchor point
});

const MapComponent = ({ startPos = [10.304294, 123.890284], markers, zoom = 13, onMarkerClick, ...rest }) => {
  const ref = useRef(0);

  return (
    <MapContainer center={startPos} zoom={zoom} {...rest}>
      <Map onMarkerClick={onMarkerClick} />

      {markers && markers.map(marker => (
        <Marker
          key={ref.current++}
          icon={customIcon}
          position={[marker.lat, marker.lng]}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const Map = ({ onMarkerClick }) => {
  const [clickLocation, setClickLocation] = useState(null);

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setClickLocation({ lat, lng });
      onMarkerClick && onMarkerClick({ lat, lng });
    },
  });

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {clickLocation && (
        <Marker
          icon={customIcon}
          position={[clickLocation.lat, clickLocation.lng]}>
          <Popup>{clickLocation.lat + "° N, " + clickLocation.lng + "° E"}</Popup>
        </Marker>
      )}
    </>
  );
}

export default MapComponent;