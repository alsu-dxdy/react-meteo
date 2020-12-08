import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import { addForecast, removeForecast } from './actions/actionCreator';
import Header from '../components/Header';
import Main from '../components/Main';
import AddForecastPopup from '../components/AddForecastPopup';
import PopupDailyForecast from '../components/PopupDailyForecast';
import Footer from '../components/Footer';

import {
  apiCurrentWeather,
  apiForecast5days,
} from '../utils/API';

import '../index.css';

function App(props) {
  const [isAddForecastPopupOpen, setisAddForecastPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    array: [],
  });

  function handleAddForecastClick() {
    setisAddForecastPopupOpen(!isAddForecastPopupOpen);
  }

  function handleCardClick(arr) {
    setSelectedCard({ isImageOpen: true, array: arr });
  }

  function closeAllPopups() {
    setisAddForecastPopupOpen(false);
    setSelectedCard({
      isImageOpen: false,
      array: [],
    });
  }

  // Закрытие попапа с прогнозами на последующие дни: клик вне контента
  function closePopupDailyForecastClickOutContent(e) {
    if (e.target.closest('.popup__content_minicards') == null) {
      closeAllPopups();
    }
  }

  function handleAddPForecastApi(data) {
    Promise.all([
      // Два запроса: текущий прогноз и прогноз на 5 дней
      apiCurrentWeather.getCurrentWeather(data.name),
      apiForecast5days.getCurrentWeather(data.name)])
      .then((currentForecastData) => {
        // Сейчас currentForecastData - это массив с 2 объектами: теущий прогноз и прогнозы на 5 дней
        // Далее необходимо сформировать один объект для экшена addForecast, а именно:
        //  в объект с текущим прогнозом добавить массив объектов с прогнозами на 5 дней вперед
        const startMs = Date.now(); // сегодня в мс
        let dateToday = new Date(startMs); //создать из мс объект даты
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
  // currentForecasts - это массив объ со св-ми id, card
  const { currentForecasts, removeForecast } = props;
  return (
    <Fragment>
      <Header onAddForecast={handleAddForecastClick} />
      <Main
        currentForecasts={currentForecasts}
        removeForecast={removeForecast}
        onCardClick={handleCardClick} />

      {      /* popup Новый прогноз */}
      <AddForecastPopup
        isOpen={isAddForecastPopupOpen}
        onClose={closeAllPopups}
        onAddForecastSubmit={handleAddPForecastApi} />
      <PopupDailyForecast
        array={selectedCard.array}
        onClose={closeAllPopups}
        isOpen={selectedCard.isImageOpen}
        closePopupDailyForecastClickOutContent={closePopupDailyForecastClickOutContent}
      />
      <Footer />
    </Fragment>

  );
}

export default connect(state => ({
  currentForecasts: state.currentForecasts,
}), { addForecast, removeForecast })(App);


