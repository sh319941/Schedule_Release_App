import Constants from '../constants';

export default (userRole) => {
  const { supervisor, administrator, businessOwner } = Constants;

  if (userRole === supervisor) {
    const { scheduleCheck, report, bulkCheck } = Constants;
    const supervisorRoles = [scheduleCheck, report, bulkCheck];
    return {
      [scheduleCheck]: [...supervisorRoles],
      [report]: [...supervisorRoles],
      [bulkCheck]: [...supervisorRoles],
    };
  }

  if (userRole === administrator) {
    const { user, site, report, airports, country, ShellList, PrefixList, AircraftTypes } = Constants;
    const administratorRoles = [user, site, report, airports, country, ShellList, PrefixList, AircraftTypes];
    return {
      [user]: [...administratorRoles],
      [site]: [...administratorRoles],
      [report]: [...administratorRoles],
      [airports]: [...administratorRoles],
      [country]: [...administratorRoles],
      [ShellList]: [...administratorRoles],
      [PrefixList]: [...administratorRoles],
      [AircraftTypes]: [...administratorRoles],
    };
  }

  if (userRole === businessOwner) {
    const { user, site, report, airports, country, ShellList, PrefixList, AircraftTypes } = Constants;
    const administratorRoles = [user, site, report, airports, country, ShellList, PrefixList, AircraftTypes];
    return {
      [user]: [...administratorRoles],
      [site]: [...administratorRoles],
      [airports]: [...administratorRoles],
      [report]: [...administratorRoles],
      [country]: [...administratorRoles],
      [ShellList]: [...administratorRoles],
      [PrefixList]: [...administratorRoles],
      [AircraftTypes]: [...administratorRoles],
    };
  }
};
