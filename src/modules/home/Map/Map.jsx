import { Space, Typography } from 'antd';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Map = () => {
  return (
    <Space size="middle" direction="vertical" style={{ display: 'flex' }}>
      <Typography.Title level={5}>Lokalizacja</Typography.Title>
      <MapContainer
        center={[50.2886641, 18.6772784]}
        zoom={18}
        scrollWheelZoom={false}
        style={{ minHeight: '400px' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[50.2886641, 18.6772784]}>
          <Popup>Lokalizacja naszej przychodni</Popup>
        </Marker>
      </MapContainer>
    </Space>
  );
};

export default Map;
