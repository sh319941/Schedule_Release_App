import axios from 'axios';
import {
  UserDetails,
  siteList,
  countryDetails,
  airportDetails,
  tnc,
  shellList,
  airportType,
  prefixList,
} from '../../urls/common';

export const insertuser = async (data, token) => {
  const reponsedata = {};
  await axios({
    method: 'post',
    url: UserDetails,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      Object.assign(reponsedata, response);
    })
    .catch(function (response) {
      Object.assign(reponsedata, response.response);
    });
  return reponsedata;
};

export const insertSites = async (data, token) => {
  const reponsedata = {};
  await axios({
    method: 'post',
    url: siteList,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      Object.assign(reponsedata, response);
    })
    .catch(function (response) {
      Object.assign(reponsedata, response.response);
    });
  return reponsedata;
};

export const insertCountry = async (data, token) => {
  const reponsedata = {};
  await axios({
    method: 'post',
    url: countryDetails,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      Object.assign(reponsedata, response);
    })
    .catch(function (response) {
      Object.assign(reponsedata, response.response);
    });
  return reponsedata;
};

export const insertAirport = async (data, token) => {
  const reponsedata = {};
  await axios({
    method: 'post',
    url: airportDetails,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      Object.assign(reponsedata, response);
    })
    .catch(function (response) {
      Object.assign(reponsedata, response.response);
    });
  return reponsedata;
};

export const insertShellList = async (data, token) => {
  const reponsedata = {};
  await axios({
    method: 'post',
    url: shellList,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      Object.assign(reponsedata, response);
    })
    .catch(function (response) {
      Object.assign(reponsedata, response.response);
    });
  return reponsedata;
};

export const insertPrefixList = async (data, token) => {
  const reponsedata = {};
  await axios({
    method: 'post',
    url: prefixList,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      Object.assign(reponsedata, response);
    })
    .catch(function (response) {
      Object.assign(reponsedata, response.response);
    });
  return reponsedata;
};

export const insertTnc = async (token, data) =>
  await axios({
    method: 'post',
    url: tnc,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });

export const insertAircraftType = async (data, token) =>
  await axios({
    method: 'post',
    url: airportType,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response.response;
    });
