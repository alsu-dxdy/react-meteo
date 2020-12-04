import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { addForecast, removeForecast } from './actions/actionCreator';
import Header from '../components/Header';
import Main from '../components/Main';
import AddForecastPopup from '../components/AddForecastPopup';
import Footer from '../components/Footer';

import {
  apiCurrentWeather,
  apiForecast5days
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
    apiCurrentWeather.getCurrentWeather(data.name)
      .then((newForecastData) => {
        const { addForecast } = props;
        // вызываем action addForecast
        addForecast((new Date()).getTime(), newForecastData);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
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


