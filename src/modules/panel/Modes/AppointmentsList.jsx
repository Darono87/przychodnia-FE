import { BookOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Space, Spin, Table, Tag, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext, AppointmentContext } from 'store';
import { MODES, ROLES } from 'strings';
import { calculateIsLoading, displaySnackbar } from 'utils';

// Date, Doctor Name, Patient Name, Shortcut of Description

const AppointmentsList = ({ setMode, setModeId }) => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const {
    getAppointments,
    appointments,
    appointmentsStatus,
    appointmentsCount,
    cancelAppointment,
  } = useContext(AppointmentContext);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    getAppointments({ page, perPage });
  }, [page, perPage]);

  if (calculateIsLoading(appointmentsStatus)) return <Spin size="large" />;

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      render: ({ user }) => `${user.firstName} ${user.lastName}`,
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
    },
    {
      title: 'Scheduled Date',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
    },
    {
      title: 'Finish Date',
      dataIndex: 'finishDate',
      key: 'finishDate',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
                await getAppointments(page, perPage);
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
    <Table
      columns={columns}
      rowKey={'id'}
      dataSource={appointments}
      pagination={{
        onChange: newPage => {
          setPage(newPage);
        },
        pageSize: perPage,
        current: page,
        total: appointmentsCount,
        showTotal: total => (
          <div style={{ marginRight: 10 }}>{`Num. items: ${total}`}</div>
        ),
      }}
    />
  );
};

export default AppointmentsList;
