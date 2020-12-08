import React from 'react';

function Minicard(props) {
    console.log('Minicard');
    const { dt, dt_txt, main, wind } = props.minicard;

    const days = [
        'Вс',
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб'
    ];
    const d = new Date(dt * 1000);
    const n = d.getDay();
    const weekDay = days[n];

    const numberDay = +(new Date(dt * 1000)).getDate();

    const months = 'янв,фев,мар,апр,мая,июня,июля,авг,сен,окт,ноя,дек'.split(',');
    const numberMohth = dt_txt.slice(5, 7);
    const monthRus = months[numberMohth - 1];

    return (
        <div className="place-card place-card_mini">
            <p className="place-card__text place-card__text_weekday">{weekDay}</p>
            <p className="place-card__text place-card__text_popup">{`${numberDay} ${monthRus}`}</p>
            <p className="place-card__current-tempetature place-card__current-tempetature_popup">{`${Math.round(main.temp)}°`}</p>
            <p className="place-card__text">{`${Math.round(wind.speed)}м/с`}</p>
        </div >
    );
}

export default Minicard;