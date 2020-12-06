import React from 'react';
import Card from './Card';

function Main(props) {
    const { currentForecasts, removeForecast, onCardClick } = props;
    return (
        <div>
            <div className="places-list root__section">
                {
                    currentForecasts.map(item =>
                        <Card
                            key={item.id}
                            id={item.id}
                            card={item}
                            removeForecast={removeForecast}
                            onCardClick={onCardClick} />
                    )
                }
            </div>
        </div>
    );
}

export default Main;