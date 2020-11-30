import React from 'react';

function Card(props) {
    console.log(44);
    console.log(props.card);

    // Функция, возвращающая ту же строку с Заглавной буквы:
    function capitalize(str) {
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    }

    return (
        <div className="place-card">

            <div className="place-card__description-temperature">
                <h3 className="place-card__name">{props.card.name}</h3>
                <p className="place-card__current-tempetature">{`${Math.round(props.card.main.temp)}°`}</p>
                <p className="place-card__text">{capitalize(props.card.weather[0].description)}</p>
                <p className="place-card__text">{`Ощущается как: ${Math.round(props.card.main.feels_like)}°`}</p>
            </div>

            <div className="place-card__description-wind">
                <p className="place-card__text">{`Ветер:  ${props.card.wind.speed}м/с`}</p>
                <p className="place-card__text">{`Влажность: ${props.card.main.humidity}%`}</p>
            </div>
            <button className="place-card__delete-icon"></button>

        </div >
    );
}

export default Card;