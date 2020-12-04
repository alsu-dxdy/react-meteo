import { ADD_FORECAST, REMOVE_FORECAST } from '../../constants';

export const addForecast = (id, card) => ({
    type: ADD_FORECAST,
    id,
    card
});

export const removeForecast = (id) => ({
    type: REMOVE_FORECAST,
    id
});

