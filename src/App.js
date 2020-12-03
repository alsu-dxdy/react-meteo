import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import AddForecastPopup from './components/AddForecastPopup';
import Footer from './components/Footer';

import {
  apiCurrentWeather,
  apiForecast5days
} from './utils/API';

import './index.css';

function App() {
  // Хук, управляющий внутренним состоянием.
  const [isAddForecastPopupOpen, setisAddForecastPopupOpen] = React.useState(false);
  const [currentForecasts, setCurrentWeather] = React.useState([]);

  function handleAddForecastClick() {
    setisAddForecastPopupOpen(!isAddForecastPopupOpen);
  }

  function closeAllPopups() {
    setisAddForecastPopupOpen(false);
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

  function handleAddPForecastApi(data) {
    apiCurrentWeather.getCurrentWeather(data.name)
      .then((newForecastData) => {
        setCurrentWeather([...currentForecasts, newForecastData]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  console.log(22);
  console.log(currentForecasts);
  return (
    <div className="root">
      <Header onAddForecast={handleAddForecastClick} />
      <Main currentForecasts={currentForecasts} />

      {      /* popup Новый прогноз */}
      <AddForecastPopup isOpen={isAddForecastPopupOpen} onClose={closeAllPopups}
        onAddForecastSubmit={handleAddPForecastApi} />

      <Footer />
    </div>

  );
}

export default App;
