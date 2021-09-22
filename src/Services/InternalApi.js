import BaseApi from './BaseApi';
import constants from '../constants';

class InternalApi extends BaseApi {
  static getAirports = (token, params) => InternalApi.get('/Airport', token, params);

  static getairportTypeList = (token, params) => InternalApi.get(constants.AircraftApi, token, params);

  static getAircraftTypes = (token, params) => InternalApi.get(constants.AircraftApi, token, params);

  static getUserDetails = (token, params) => InternalApi.get(`/UserDetails/email`, token, params);

  static getUsers = (token) => InternalApi.get(`/UserDetails`, token);

  static getRoles = (token) => InternalApi.get(`/Roles`, token);

  static getSites = (token, params) => InternalApi.get(`/Sites`, token, params);

  static getCountries = (token) => InternalApi.get(`/Country`, token);

  static getTnc = (token) => InternalApi.get(`/Tnc`, token);

  static getFlightCheck = (token, params) => InternalApi.post(`/FlightCheck`, token, params);

  static getReports = (token, params) => InternalApi.getStatus(`/Reports`, token, params);

  static getReportsExcel = (token) => InternalApi.get(`/GetReportsExcel`, token);

  static getBulkFlightCheck = (token, params) => InternalApi.post(`/FlightCheck/BulkFlightCheck`, token, params);

  static getShellList = (token) => InternalApi.get(`/AircraftRegistration`, token);

  static getPrefixList = (token) => InternalApi.get(`/AircraftRegistrationPrefix`, token);

  static updateAirports = (token, params) => InternalApi.put(`/Airport/${params.id}`, token, params);

  static updateAircraftTypes = (token, params) => InternalApi.put(constants.AircraftApi, token, params);

  static updateUser = (token, params) => InternalApi.put(`/UserDetails`, token, params);

  static updateCountries = (token, params) => InternalApi.put(`/Country`, token, params);

  static updateShellList = (token, params) => InternalApi.put(`/AircraftRegistration`, token, params);

  static upadtePrefixList = (token, params) =>
    InternalApi.put(`/AircraftRegistrationPrefix/${params.id}`, token, params);

  static insertAirports = (token, params) => InternalApi.post('/Airport', token, params);

  static insertAircraftTypes = (token, params) => InternalApi.post(constants.AircraftApi, token, params);

  static insertUser = (token, params) => InternalApi.post(`/UserDetails`, token, params);

  static insertSites = (token, params) => InternalApi.post(`/Sites`, token, params);

  static insertCountries = (token, params) => InternalApi.post(`/Country`, token, params);

  static insertShellList = (token, params) => InternalApi.post(`/AircraftRegistration`, token, params);

  static insertPrefixList = (token, params) => InternalApi.post(`/AircraftRegistrationPrefix`, token, params);

  static updateLastLoggedIn = (token, params) =>
    InternalApi.put(`/UserDetails/${params.userId}/${params.lastLoggedInTime}`, token);

  static updateSites = (token, data) => InternalApi.put(`/Sites/${data.siteId}`, token, data);
}

export default InternalApi;
