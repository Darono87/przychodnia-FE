import React, { useContext, useEffect } from 'react';
import { PhysicalExaminationContext } from 'store';
import { Spinner } from 'components';
import { calculateIsLoading, usePagination, useSorting } from 'utils';
import { Table } from 'antd';

const PhyExaminationTable = ({ selectedAppointments }) => {
  const {
    getPhysicalExaminations,
    physicalExaminations,
    physicalExaminationsStatus,
    physicalExaminationsCount,
  } = useContext(PhysicalExaminationContext);
  const { sortKey, isAscending, sortFunction } = useSorting(
    'examinationCode',
    true,
  );

  const appointments = selectedAppointments;

  const { pagination, refresh, perPage, page } = usePagination(
    props =>
      getPhysicalExaminations({
        ...props,
        appointments,
        sortKey,
        isAscending,
      }),
    physicalExaminationsCount,
  );

  useEffect(
    () =>
      getPhysicalExaminations({
        appointments,
        sortKey,
        isAscending,
        perPage,
        page,
      }),
    [appointments, sortKey, isAscending, perPage, page],
  );

  const columns = [
    {
      title: 'Examination Code',
      dataIndex: 'examinationCode',
      key: 'examinationCode',
      sorter: true,
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      sorter: true,
    },
    {
      title: 'Appointment',
      dataIndex: 'appointment',
      key: 'appointment',
      sorter: true,
    },
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
      sorter: true,
    },
  ];

  return (
    <>
      {calculateIsLoading(physicalExaminationsStatus) && <Spinner />}
      <Table
        columns={columns}
        rowKey={'id'}
        onChange={sortFunction}
        dataSource={physicalExaminations}
        pagination={pagination}
      />
    </>
  );
};

export default PhyExaminationTable;
