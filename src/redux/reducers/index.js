import { combineReducers } from 'redux';
import currentForecasts from './forecasts';

const rootReducer = combineReducers({ currentForecasts });

export default rootReducer;
