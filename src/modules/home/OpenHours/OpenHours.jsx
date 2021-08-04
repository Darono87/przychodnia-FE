import { Descriptions, Space, Typography } from 'antd';
import React from 'react';

const OpenHours = () => {
  return (
    <Descriptions
      title="Godziny otwarcia"
      bordered
      column={1}
      style={{ padding: '0 1rem' }}>
      <Descriptions.Item label="Poniedziałek">09:00-20:00</Descriptions.Item>
      <Descriptions.Item label="Wtorek">09:00-20:00</Descriptions.Item>
      <Descriptions.Item label="Środa">09:00-20:00</Descriptions.Item>
      <Descriptions.Item label="Czwartek">08:00-18:00</Descriptions.Item>
      <Descriptions.Item label="Piątek">08:00-18:00</Descriptions.Item>
      <Descriptions.Item label="Sobota">10:00-16:00</Descriptions.Item>
      <Descriptions.Item label="Niedziela">zamknięte</Descriptions.Item>
    </Descriptions>
  );
};

export default OpenHours;
