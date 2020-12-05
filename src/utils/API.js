import { serverCurrentWeather, serverForecact5days } from '../config';

class Api {
  constructor(options) {
    this.options = options;
  }

  getCurrentWeather(text) {
    return (
      fetch(`${this.options.baseUrl}q=${text}`, {
        method: 'GET',
      })
    )
      .then(res => res.json());
  }
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
