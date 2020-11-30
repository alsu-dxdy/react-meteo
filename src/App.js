import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import PopupWithForm from './components/PopupWithForm';
import Footer from './components/Footer';

import {
  apiCurrentWeather,
  apiForecast5days
} from './utils/API';

import './index.css';

function App() {
  // Хук, управляющий внутренним состоянием.
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  // const [places, setPlaces] = React.useState([]);
  const [currentForecasts, setCurrentWeather] = React.useState([]);

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setisAddPlacePopupOpen(false);
  }

  React.useEffect(() => {
    Promise.all([
      apiCurrentWeather.getCurrentWeather('Уфа'),
      apiCurrentWeather.getCurrentWeather('Пермь'),
      apiForecast5days.getCurrentWeather('Уфа')])
      .then(
        ([currentTempUfa, currentTempPerm, forecast5daysData]) => {
          console.log(currentTempUfa);
          console.log(currentTempPerm);
          // добавление текущих прогнозов в массив:
          setCurrentWeather([...currentForecasts, currentTempUfa, currentTempPerm]);
          console.log(22);
          console.log(currentForecasts);

        }
      )
  }, []);
  console.log(22);
  console.log(currentForecasts);
  return (
    <div className="root">
      <Header onAddPlace={handleAddPlaceClick} />
      <Main currentForecasts={currentForecasts} />

      {      /* popup Новый прогноз */}
      <PopupWithForm
        title="Новый прогноз"
        name="add-place"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <form className="popup__form" name="new_place">
            <div className="input-container">
              <input
                required
                type="text"
                name="name"
                className="popup__input popup__input_type_name"
                placeholder="Введите название города"
                minLength="2"
                maxLength="30"
              />
              <span className="input__error"></span>
            </div>

            <button className="button popup__button button_disabled">+</button>
          </form>
        } />
      <Footer />
    </div>

  );
}

export default App;
