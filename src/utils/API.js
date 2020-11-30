import { serverCurrentWeather, serverForecact5days } from '../config';

class Api {
  constructor(options) {
    this.options = options;
  }
  // _getResponseData(res) {
  //   if (res.ok) {
  //     return res.json();
  //   } else {
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   }
  // }

  getCurrentWeather(text) {
    return (
      fetch(`${this.options.baseUrl}q=${text}`, {
        method: 'GET',
      })
    )
      // .then(res => this._getResponseData(res));
      .then(res => res.json());

  }

  // getForecact5days(text) {
  //   return (
  //     fetch(`${this.options.baseUrl}q=${text}`, {
  //       method: 'GET',
  //     })
  //   )
  //     .then(res => this._getResponseData(res));
  // }
}


const apiCurrentWeather = new Api({
  baseUrl: `${serverCurrentWeather}`,
  headers: {
    authorization: "",
    "Content-Type": "application/json"
  }
});


const apiForecast5days = new Api({
  baseUrl: `${serverForecact5days}`,
  headers: {
    authorization: "",
    "Content-Type": "application/json"
  }
});

export {
  apiCurrentWeather,
  apiForecast5days
};
