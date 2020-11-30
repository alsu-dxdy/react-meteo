import React from 'react';
import Main from './components/Main';
import Footer from './components/Footer';

import {
  apiCurrentWeather,
  apiForecast5days
} from './utils/API';

import './index.css';

function App() {
  // const [places, setPlaces] = React.useState([]);
  const [currentForecasts, setCurrentWeather] = React.useState([]);
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
      <Main currentForecasts={currentForecasts} />
      <Footer />
    </div>

  );
}

export default App;
