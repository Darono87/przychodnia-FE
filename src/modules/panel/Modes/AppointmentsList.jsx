import { BookOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Space, Spin, Table, Tag, Tooltip } from 'antd';
import { Spinner } from 'components';
import React, { useContext, useEffect } from 'react';
import { AuthContext, AppointmentContext } from 'store';
import { MODES, ROLES } from 'strings';
import {
  calculateIsLoading,
  displaySnackbar,
  usePagination,
  useSorting,
} from 'utils';

// Date, Doctor Name, Patient Name, Shortcut of Description

const AppointmentsList = ({ setMode, setModeId }) => {
  const {
    getAppointments,
    appointments,
    appointmentsStatus,
    appointmentsCount,
    cancelAppointment,
  } = useContext(AppointmentContext);

  const { role } = useContext(AuthContext);
  const { sortKey, isAscending, sortFunction } = useSorting('doctor', true);
  const { pagination, refresh, perPage, page } = usePagination(
    props => getAppointments({ ...props, sortKey, isAscending }),
    appointmentsCount,
  );
  useEffect(() => {
    getAppointments({ sortKey, isAscending, perPage, page });
  }, [sortKey, isAscending, page, perPage]);

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: ({ name, color }) => (
        <Tag color={color} key={name}>
          {name}
        </Tag>
      ),
    },
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
      sorter: true,
      render: ({ user }) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      sorter: true,
      render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      sorter: true,
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      sorter: true,
    },
    {
      title: 'Finish Date',
      dataIndex: 'finishDate',
      key: 'finishDate',
      sorter: true,
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            shape="circle"
            icon={<CloseOutlined />}
            onClick={async () => {
              try {
                await cancelAppointment(record.id);
                await refresh();
              } catch (e) {
                displaySnackbar(
                  'error',
                  'Sorry, Could not fetch the appointments.',
                );
              }
            }}
          />
          {role === ROLES.Doctor && (
            <Tooltip title="Add Physical Examination">
              <Button
                shape="round"
                icon={<BookOutlined />}
                onClick={() => {
                  setMode(MODES.AddPhysicalExamination);
                  setModeId(record.id);
                }}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {calculateIsLoading(appointmentsStatus) && <Spinner />}
      <Table
        columns={columns}
        rowKey={'id'}
        onChange={sortFunction}
        dataSource={appointments}
        pagination={pagination}
      />
    </>
  );
};

export default AppointmentsList;
