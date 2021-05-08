import {
  UsergroupAddOutlined,
  UserAddOutlined,
  ScheduleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import React from 'react';
import { ROLES, MODES } from 'strings';

export const modes = [
  {
    name: MODES.AddEmployee,
    roles: [ROLES.Admin],
    icon: <UsergroupAddOutlined />,
  },
  {
    name: MODES.AddPatient,
    roles: [ROLES.Registrator, ROLES.Admin],
    icon: <UserAddOutlined />,
  },
  {
    name: MODES.ScheduleAppointment,
    roles: [ROLES.Registrator],
    icon: <ScheduleOutlined />,
  },
  {
    name: MODES.CancelAppointment,
    roles: [ROLES.Registrator, ROLES.Doctor],
    icon: <CloseOutlined />,
  },
];
