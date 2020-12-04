import React from 'react';

function Header(props) {
    return (
        <header className="header root__section">
            <h1 className="header__text">Weather </h1>
            <button className="header__button" onClick={props.onAddForecast}>Новый прогноз</button>
        </header>
    );
}

export default Header;