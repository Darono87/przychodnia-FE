import {
  BookOutlined,
  CheckOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Modal,
  Popconfirm,
} from 'antd';
import { Spinner } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import {
  AuthContext,
  AppointmentContext,
  LabExaminationContext,
  PhysicalExaminationContext,
} from 'store';
import { MODES, ROLES } from 'strings';
import {
  calculateIsLoading,
  displaySnackbar,
  usePagination,
  useSorting,
} from 'utils';
import LabExaminationTable from './ModalTables/LabExaminationTable.jsx';
import PhyExaminationTable from './ModalTables/PhyExaminationTable.jsx';

// Date, Doctor Name, Patient Name, Shortcut of Description

const AppointmentsList = ({ setMode, setModeId }) => {
  const {
    getAppointments,
    appointments,
    appointmentsStatus,
    appointmentsCount,
    cancelAppointment,
    finishAppointment,
  } = useContext(AppointmentContext);

  const { role } = useContext(AuthContext);
  const { sortKey, isAscending, sortFunction } = useSorting('doctor', true);
  const { pagination, refresh, perPage, page } = usePagination(
    props => getAppointments({ ...props, sortKey, isAscending }),
    appointmentsCount,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isAnySelected, setAnySelected] = useState(false);

  const [isPhysicalModalVisible, setPhysicalModalVisibility] = useState(false);
  const [isLabModalVisible, setLabModalVisibility] = useState(false);

  useEffect(() => {
    getAppointments({ sortKey, isAscending, perPage, page });
  }, [sortKey, isAscending, page, perPage]);

  const rowSelection = {
    selectedRowKeys,
    onChange: selectedKeys => {
      if (selectedKeys.length > 0) setAnySelected(true);
      else setAnySelected(false);
      setSelectedRowKeys(selectedKeys);
    },
  };

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
          <Popconfirm
            title="Are you sure you want to cancel appointment?"
            placement="left"
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
            onCancel={() => null}
            onConfirm={async () => {
              try {
                await cancelAppointment(record.id);
                await refresh();
              } catch (e) {
                displaySnackbar(
                  'error',
                  'Sorry, Could not fetch the appointments.',
                );
              }
            }}>
            <Tooltip title="Cancel appointment">
              <Button
                disabled={
                  record.status.name === 'Cancelled' ||
                  record.status.name === 'Finished'
                }
                shape="circle"
                icon={<CloseOutlined />}
              />
            </Tooltip>
          </Popconfirm>
          {role === ROLES.Doctor && (
            <Tooltip title="Add Physical Examination">
              <Button
                disabled={
                  record.status.name === 'Cancelled' ||
                  record.status.name === 'Finished'
                }
                shape="round"
                icon={<BookOutlined />}
                onClick={() => {
                  setMode(MODES.AddPhysicalExamination);
                  setModeId(record.id);
                }}
              />
            </Tooltip>
          )}
          {role === ROLES.Doctor && (
            <Popconfirm
              title="Are you sure you want to finish appointment?"
              placement="topRight"
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'orange' }} />}
              onCancel={() => null}
              onConfirm={async () => {
                try {
                  await finishAppointment(record.id);
                  await refresh();
                } catch (e) {
                  displaySnackbar(
                    'error',
                    'Sorry, Could not fetch the appointments.',
                  );
                }
              }}>
              <Tooltip title="Finish appointment">
                <Button
                  disabled={
                    !record.isFinishable ||
                    record.status.name === 'Cancelled' ||
                    record.status.name === 'Finished'
                  }
                  shape="round"
                  icon={<CheckOutlined />}
                />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {calculateIsLoading(appointmentsStatus) && <Spinner />}
      {role === ROLES.Doctor && (
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            disabled={!isAnySelected}
            onClick={() => {
              setPhysicalModalVisibility(true);
            }}>
            List Physical Examinations
          </Button>
          <Button
            type="primary"
            disabled={!isAnySelected}
            onClick={() => setLabModalVisibility(true)}>
            List Laboratory Examinations
          </Button>
          <span>
            {isAnySelected ? `Selected: ${selectedRowKeys.length}` : ''}
          </span>
        </Space>
      )}
      <Table
        columns={columns}
        rowKey={'id'}
        onChange={sortFunction}
        dataSource={appointments}
        pagination={pagination}
        rowSelection={role === ROLES.Doctor ? rowSelection : ''}
      />
      <Modal
        title="Physical Examinations"
        okText="Confirm"
        visible={isPhysicalModalVisible}
        cancelButtonProps={{ style: { visibility: 'hidden' } }}
        onOk={() => setPhysicalModalVisibility(false)}
        onCancel={() => setPhysicalModalVisibility(false)}
        style={{ minWidth: 800 }}>
        <PhyExaminationTable selectedAppointments={selectedRowKeys} />
      </Modal>
      <Modal
        title="Lab Examinations"
        okText="Confirm"
        visible={isLabModalVisible}
        cancelButtonProps={{ style: { visibility: 'hidden' } }}
        onOk={() => setLabModalVisibility(false)}
        onCancel={() => setLabModalVisibility(false)}
        style={{ minWidth: 800 }}>
        <LabExaminationTable selectedAppointments={selectedRowKeys} />
      </Modal>
    </>
  );
};

export default AppointmentsList;
