import React from 'react';

function Card(props) {
    console.log('Card');
    console.log(props.card.card);
    const { name, main, weather, wind } = props.card.card;

    // Функция, возвращающая ту же строку с Заглавной буквы:
    function capitalize(str) {
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    }

    return (
        <div className="place-card">

            <div className="place-card__description-temperature">
                <h3 className="place-card__name">{name}</h3>
                <p className="place-card__current-tempetature">{`${Math.round(main.temp)}°`}</p>
                <p className="place-card__text">{capitalize(weather[0].description)}</p>
                <p className="place-card__text">{`Ощущается как: ${Math.round(main.feels_like)}°`}</p>
            </div>

            <div className="place-card__description-wind">
                <p className="place-card__text">{`Ветер:  ${Math.round(wind.speed)}м/с`}</p>
                <p className="place-card__text">{`Влажность: ${main.humidity}%`}</p>
            </div>
            <button className="place-card__delete-icon"></button>

        </div >
    );
}

export default Card;