import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100,
      }}>
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
