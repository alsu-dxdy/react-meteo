import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { addForecast, removeForecast } from './actions/actionCreator';
import Header from '../components/Header';
import Main from '../components/Main';
import AddForecastPopup from '../components/AddForecastPopup';
import Footer from '../components/Footer';

import {
  apiCurrentWeather,
  apiForecast5days,
} from '../utils/API';

import '../index.css';

function App(props) {
  const [isAddForecastPopupOpen, setisAddForecastPopupOpen] = React.useState(false);

  function handleAddForecastClick() {
    setisAddForecastPopupOpen(!isAddForecastPopupOpen);
  }

  function closeAllPopups() {
    setisAddForecastPopupOpen(false);
  }

  function handleAddPForecastApi(data) {
    Promise.all([
      apiCurrentWeather.getCurrentWeather(data.name),
      apiForecast5days.getCurrentWeather(data.name)])
      .then((currentForecastData) => {
        const startMs = Date.now(); // сегодня в мс
        let dateToday = new Date(startMs); //создать из мс объект
        // В next5Forecasts оставляем прогнозы только на следующие 5 дней
        const next5Forecasts = currentForecastData[1].list.filter(item => +item.dt_txt.slice(8, 10) !== +dateToday.getDate());

        // В next5Forecasts12olock оставляем прогнозы только на 12:00
        let next5Forecasts12olock = next5Forecasts.filter(item => +item.dt_txt.slice(11, 13) == 12);

        // В объект с текущим прогнозом добавляем св-во futureForecasts с прогнозами на 5 дней
        currentForecastData[0].futureForecasts = next5Forecasts12olock;
        // Очищение от использованных данных: от объекта с 40 прогнозами на 5 дней:
        currentForecastData.pop();
        const newForecastData = currentForecastData[0];

        const { addForecast } = props;
        // вызываем action addForecast
        addForecast((new Date()).getTime(), newForecastData);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

  }
  const { currentForecasts } = props;
  console.log(currentForecasts);
  return (
    <Fragment>
      <Header onAddForecast={handleAddForecastClick} />
      <Main currentForecasts={currentForecasts} />

      {      /* popup Новый прогноз */}
      <AddForecastPopup isOpen={isAddForecastPopupOpen} onClose={closeAllPopups}
        onAddForecastSubmit={handleAddPForecastApi} />

      <Footer />
    </Fragment>

  );
}

export default connect(state => ({
  currentForecasts: state.currentForecasts,
}), { addForecast, removeForecast })(App);


