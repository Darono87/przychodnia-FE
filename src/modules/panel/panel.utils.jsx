import {
  UsergroupAddOutlined,
  UserAddOutlined,
  ScheduleOutlined,
  CalendarOutlined,
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
    roles: [ROLES.Registrar],
    icon: <UserAddOutlined />,
  },
  {
    name: MODES.ScheduleAppointment,
    roles: [ROLES.Registrar],
    icon: <ScheduleOutlined />,
  },
  {
    name: MODES.ListAppointments,
    roles: [ROLES.Registrar, ROLES.Doctor],
    icon: <CalendarOutlined />,
  },
];
