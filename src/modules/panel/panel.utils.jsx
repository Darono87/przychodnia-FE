import {
  UsergroupAddOutlined,
  UserAddOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  BookOutlined,
  HeartOutlined,
  DatabaseOutlined,
  LineChartOutlined,
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
  {
    name: MODES.AddPhysicalExamination,
    roles: [ROLES.Doctor],
    icon: <BookOutlined />,
  },
  {
    name: MODES.ListPatients,
    roles: [ROLES.Doctor, ROLES.Admin, ROLES.Registrar],
    icon: <HeartOutlined />,
  },
  {
    name: MODES.AddLabExamination,
    roles: [ROLES.Doctor],
    icon: <DatabaseOutlined />,
  },
  {
    name: MODES.GetLabExaminations,
    roles: [ROLES.LabTechnician, ROLES.LabManager],
    icon: <LineChartOutlined />,
  },
];
