import { ADD_FORECAST, REMOVE_FORECAST } from '../../constants';

const CURRENTFORECASTS = [
];

const currentForecasts = (state = CURRENTFORECASTS, { id, card, type }) => {
    switch (type) {
        case ADD_FORECAST:
            return [
                ...state, {
                    id,
                    card
                }
            ];
        case REMOVE_FORECAST:
            // возвращаем только несовпадения с полученным id
            return [...state].filter(forecast => forecast.id !== id);

        default:
            return state;
    }
}

export default currentForecasts;
