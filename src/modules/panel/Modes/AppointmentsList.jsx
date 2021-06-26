import { CloseOutlined } from '@ant-design/icons';
import { Button, Spin, Table, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppointmentContext } from 'store';
import { calculateIsLoading, displaySnackbar } from 'utils';

// Date, Doctor Name, Patient Name, Shortcut of Description

const AppointmentsList = () => {
  const [page, setPage] = useState(1);
  const perPage = 3;
  const {
    getAppointments,
    appointments,
    appointmentsStatus,
    appointmentsCount,
    cancelAppointment,
  } = useContext(AppointmentContext);

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
      title: 'Cancel',
      key: 'cancel',
      fixed: 'right',
      render: (_, record) => (
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          onClick={async () => {
            try {
              await cancelAppointment(record.id);
              await getAppointments(page, perPage);
            } catch (e) {
              displaySnackbar('error', 'Sorry, unexpected error appeared');
            }
          }}
        />
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
