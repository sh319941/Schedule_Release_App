import axios from 'axios';
import { tnc, userInfo } from '../../urls/common';
import { service } from '../../Services/InternalApi';

export const getUserData = async (Token, Email) =>
  await axios
    .get(userInfo, {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Access-Control-Allow-Origin': '*',
      },
      params: {
        email: Email,
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

export const getTnc = async (newToken, userId) =>
  await axios
    .get(`${tnc}/${userId}`, {
      headers: {
        Authorization: `Bearer ${newToken}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
