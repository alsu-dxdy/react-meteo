import React from 'react';

function Minicard(props) {
    console.log('Minicard');
    const { dt, dt_txt, main, wind } = props.minicard;

    const days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    const d = new Date(dt * 1000);
    const n = d.getDay();
    const weekDay = days[n];

    const numberDay = +(new Date(dt * 1000)).getDate();

    const months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
    const numberMohth = dt_txt.slice(5, 7);
    const monthRus = months[numberMohth - 1];

    return (
        <div className="place-card place-card_mini">
            <div className="place-card__date-block">
                <p className="place-card__text">{`${numberDay} ${monthRus}`}</p>
                <p className="place-card__text">{weekDay}</p>
            </div>

            <div className="place-card__weather-block">
                <p className="place-card__current-tempetature">{`${Math.round(main.temp)}°`}</p>
                <p className="place-card__text">{`${Math.round(wind.speed)}м/с`}</p>
            </div>
        </div >
    );
}

export default Minicard;