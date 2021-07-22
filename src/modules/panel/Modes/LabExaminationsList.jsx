import { AuditOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Spin, Table, Tag, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Spinner } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import { LabExaminationContext, AuthContext } from 'store';
import { LAB_EXAMINATION_TYPE, ROLES } from 'strings';
import { calculateIsLoading, usePagination, useSorting } from 'utils';

const LabExaminationsList = ({ setMode, setModeId }) => {
  const {
    getLabExaminations,
    labExaminations,
    labExaminationsStatus,
    labExaminationsCount,
  } = useContext(LabExaminationContext);
  const { role } = useContext(AuthContext);
  const [isFillVisible, setFillVisible] = useState(false);
  const [isApproveVisible, setApproveVisible] = useState(false);
  const [result, setResult] = useState('');
  const [managerRemarks, setManagerRemarks] = useState('');

  const { sortKey, isAscending, sortFunction } = useSorting('issueDate', true);
  const { pagination, perPage, page } = usePagination(
    props => getLabExaminations({ ...props, sortKey, isAscending }),
    labExaminationsCount,
  );
  useEffect(() => {
    getLabExaminations({
      sortKey,
      isAscending,
      perPage,
      page,
      statuses:
        role === ROLES.LabTechnician
          ? [
              LAB_EXAMINATION_TYPE.Scheduled,
              LAB_EXAMINATION_TYPE.Finished,
              LAB_EXAMINATION_TYPE.Accepted,
              LAB_EXAMINATION_TYPE.Cancelled,
            ]
          : [
              LAB_EXAMINATION_TYPE.Finished,
              LAB_EXAMINATION_TYPE.CancelledByManager,
              LAB_EXAMINATION_TYPE.Accepted,
            ],
    });
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
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          {role === ROLES.LabTechnician && (
            <Tooltip title="Fill the results">
              <Button
                shape="circle"
                icon={<AuditOutlined />}
                onClick={() => {
                  setFillVisible(true);
                }}
              />
            </Tooltip>
          )}
          {role === ROLES.LabManager && (
            <Tooltip title="Approve the examination">
              <Button
                shape="circle"
                icon={<CheckOutlined />}
                onClick={() => {
                  setApproveVisible(true);
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
      <Modal
        title="Fill the lab examination"
        visible={isFillVisible}
        onOk={() => {}}
        okText="Complete the examination"
        onCancel={() => {
          setFillVisible(false);
          setResult('');
        }}>
        <TextArea
          value={result}
          onChange={e => setResult(e.target.value)}
          rows={6}
          name="result"
          placeholder="The result"
        />
      </Modal>
      <Modal
        title="Approve the examination"
        visible={isApproveVisible}
        okText="Approve the examination"
        onOk={() => {}}
        onCancel={() => {
          setApproveVisible(false);
          setManagerRemarks('');
        }}>
        <TextArea
          value={managerRemarks}
          onChange={e => setManagerRemarks(e.target.value)}
          rows={6}
          name="managerRemarks"
          placeholder="Manager Remarks"
        />
      </Modal>
      {calculateIsLoading(labExaminationsStatus) && <Spinner />}
      <Table
        columns={columns}
        rowKey={'id'}
        dataSource={labExaminations}
        pagination={pagination}
        onChange={sortFunction}
      />
    </>
  );
};

export default LabExaminationsList;
