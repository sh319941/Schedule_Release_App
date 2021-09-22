import axios from 'axios';

export const serverUrl = process.env.REACT_APP_SERVER_URL;

export default class InternalApi {
  static get(urlPath, token, params = {}) {
    console.log('Hel12222222222')
    console.log(`${serverUrl}/api${urlPath}`)
    console.log( `Bearer ${token}`)
    console.log(params);
    return axios
      .get(`${serverUrl}/api${urlPath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
      .then((resp) => {
        if (resp.status >= 400) {
          return this.onError(resp);
        }
        return resp.data;
      })
      .catch((error) => {
        throw error;
      });
  }

  static getStatus(urlPath, token, params = {}) {
    return axios
      .get(`${serverUrl}/api${urlPath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      })
      .then((resp) => resp)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('internalApi.get Error:', error.message);
        throw error;
      });
  }

  static put(urlPath, token, params) {
    const urls = `${serverUrl}/api${urlPath}`;
    return axios({
      method: 'PUT',
      url: urls,
      data: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp)
      .catch((error) => {
        throw error;
      });
  }

  static post(urlPath, token, params) {
    const urls = `${serverUrl}/api${urlPath}`;
    return axios({
      method: 'post',
      url: urls,
      data: params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        if (resp.status >= 400) {
          return this.onError(resp);
        }
        return resp;
      })
      .catch((error) => {
        throw error;
      });
  }
}
