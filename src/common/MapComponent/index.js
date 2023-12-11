import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ startPos = [10.304294, 123.890284], markers, zoom = 13, ...rest }) => {
  return (
    <MapContainer center={startPos} zoom={zoom} {...rest}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default MapComponent;