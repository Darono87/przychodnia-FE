import { notification } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { REQUEST_STATUS } from 'strings';

export const displaySnackbar = (type, message) => {
  notification[type]({
    message,
  });
};

export const calculateIsLoading = flag =>
  flag === REQUEST_STATUS.IDLE || flag === REQUEST_STATUS.LOADING;

export const formatDatetime = datetime =>
  moment(datetime).format('DD.MM.YYYY HH:MM');

export const putEmptyValues = datesheet =>
  Object.entries(datesheet).reduce(
    (conv, [key, value]) => ({ ...conv, [key]: value === null ? '--' : value }),
    {},
  );

export const usePagination = (updaterFunction, count) => {
  const perPage = 6;
  const [page, setPage] = useState(1);

  return {
    perPage,
    page,
    refresh: async () => updaterFunction({ page, perPage }),
    pagination: {
      onChange: newPage => {
        setPage(newPage);
      },
      pageSize: perPage,
      current: page,
      total: count,
      showTotal: total => (
        <div style={{ marginRight: 10 }}>{`Num. items: ${total}`}</div>
      ),
    },
  };
};

export const useSorting = (initSortKey, initAscending) => {
  const [sortKey, setSortKey] = useState(initSortKey);
  const [isAscending, setAscending] = useState(initAscending);

  return {
    sortKey,
    isAscending,
    sortFunction: (_, __, { columnKey, order }) => {
      console.log(order);
      setAscending(order === 'ascend');
      setSortKey(columnKey);
    },
  };
};
