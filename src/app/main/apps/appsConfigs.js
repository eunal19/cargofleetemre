import CalendarAppConfig from './calendar/CalendarAppConfig';
import ChatAppConfig from './chat/ChatAppConfig';
// import ContactsAppConfig from './contacts/ContactsAppConfig';
import ProjectDashboardAppConfig from './dashboard/ProjectDashboardAppConfig';
import DriversAppConfig from './drivers/DriversAppConfig';
import IssuesAppConfig from './issues/IssuesAppConfig';
import MailAppConfig from './mail/MailAppConfig';
import VehiclesAppConfig from './vehicles/VehiclesAppConfig';

const appsConfigs = [
  ProjectDashboardAppConfig,
  MailAppConfig,
  VehiclesAppConfig,
  CalendarAppConfig,
  ChatAppConfig,
  DriversAppConfig,
  IssuesAppConfig
];

export default appsConfigs;
