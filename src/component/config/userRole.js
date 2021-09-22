import { logout } from '../common/Utilities/Logout';
import { roleAccess } from '../config/Access/Role';

export const landing = (user) => {
  
  var path = window.location.pathname;
  var token = localStorage.getItem("access_token");
  if (token === null) {
    logout();
  }
  if (user !== null ) {
    if (!roleAccess[user.role.roleName].includes(path)) {
      return roleAccess[user.role.roleName][0]["landingPage"];
    } else {
      return path;
    }
  }
  return path;
}