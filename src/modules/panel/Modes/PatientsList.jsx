import { EditOutlined } from '@ant-design/icons';
import { Button, Space, Spin, Table } from 'antd';
import { Spinner } from 'components';
import React, { useContext, useEffect } from 'react';
import { PatientContext, AuthContext } from 'store';
import { MODES, ROLES } from 'strings';
import { calculateIsLoading, usePagination, useSorting } from 'utils';

const PatientsList = ({ setMode, setModeId }) => {
  const { getPatients, patients, patientsStatus, patientsCount } = useContext(
    PatientContext,
  );
  const { role } = useContext(AuthContext);

  const { sortKey, isAscending, sortFunction } = useSorting(
    'peselNumber',
    true,
  );
  const { pagination, perPage, page } = usePagination(
    props => getPatients({ ...props, sortKey, isAscending }),
    patientsCount,
  );
  useEffect(() => {
    getPatients({ sortKey, isAscending, perPage, page });
  }, [sortKey, isAscending, page, perPage]);

  const columns = [
    {
      title: 'Pesel',
      dataIndex: 'peselNumber',
      key: 'peselNumber',
      sorter: true,
    },
    {
      title: 'Name',
      key: 'name',
      render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      sorter: true,
    },
    {
      title: 'Country',
      key: 'country',
      render: ({ address }) => address.country,
      sorter: true,
    },
    {
      title: 'Address',
      key: 'address',
      render: ({ address }) =>
        `${address.city} (${address.postalCode}) / ${address.street} ${address.buildingNumber}`,
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) =>
        role === ROLES.Registrar ? (
          <Space>
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                setMode(MODES.AddPatient);
                setModeId(record.id);
              }}
            />
          </Space>
        ) : (
          <></>
        ),
    },
  ];

  return (
    <>
      {calculateIsLoading(patientsStatus) && <Spinner />}
      <Table
        columns={columns}
        rowKey={'id'}
        dataSource={patients}
        pagination={pagination}
        onChange={sortFunction}
      />
    </>
  );
};

export default PatientsList;
