import React, { useContext, useEffect } from 'react';
import { LabExaminationContext } from 'store';
import { Spinner } from 'components';
import { calculateIsLoading, usePagination, useSorting } from 'utils';
import { Table, Tag } from 'antd';

const LabExaminationTable = ({ selectedAppointments }) => {
  const {
    getLabExaminations,
    labExaminations,
    labExaminationsCount,
    labExaminationsStatus,
  } = useContext(LabExaminationContext);
  const { sortKey, isAscending, sortFunction } = useSorting(
    'examinationCode',
    true,
  );

  const appointments = selectedAppointments;

  const { pagination, refresh, perPage, page } = usePagination(
    props =>
      getLabExaminations({
        ...props,
        appointments,
        sortKey,
        isAscending,
      }),
    labExaminationsCount,
  );

  useEffect(
    () =>
      getLabExaminations({
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
      title: 'Examination Code',
      dataIndex: 'examinationCode',
      key: 'examinationCode',
      sorter: true,
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
      sorter: true,
    },
    {
      title: 'Finish Date',
      dataIndex: 'finishDate',
      key: 'finishDate',
      sorter: true,
    },
    {
      title: 'Confirmation Date',
      dataIndex: 'confirmationDate',
      key: 'confirmationDate',
      sorter: true,
    },
    {
      title: 'Doctor Remarks',
      dataIndex: 'doctorRemarks',
      key: 'doctorRemarks',
      sorter: true,
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      sorter: true,
    },
  ];

  return (
    <>
      {calculateIsLoading(labExaminationsStatus) && <Spinner />}
      <Table
        columns={columns}
        rowKey={'id'}
        onChange={sortFunction}
        dataSource={labExaminations}
        pagination={pagination}
      />
    </>
  );
};

export default LabExaminationTable;
