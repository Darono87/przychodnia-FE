import { Empty } from 'antd';
import React from 'react';
import { MODES } from 'strings';
import AddEmployeeForm from './AddEmployeeForm.jsx';

const Modes = ({ mode }) => {
  switch (mode) {
    case MODES.AddEmployee:
      return <AddEmployeeForm />;
    case MODES.AddPatient:
      return <div>HO</div>;
    default:
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="You've picked an unknown option"
        />
      );
  }
};

export default Modes;
