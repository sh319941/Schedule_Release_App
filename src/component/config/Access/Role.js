export const roleAccess = {
  'Business Owner': [{ landingPage: '/User' }, '/User', '/Site', '/Report', '/Airports', '/Country'],
  Administrator: [{ landingPage: '/User' }, '/User', '/Site', '/Airports', '/Country'],
  Supervisor: [{ landingPage: '/ScheduleCheck' }, '/ScheduleCheck', '/Report', '/BulkCheck'],
};
