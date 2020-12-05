import React from 'react';
import Card from './Card';

function Main(props) {
    console.log('Main');
    const { currentForecasts, removeForecast } = props;
    return (
        <div>
            <div className="places-list root__section">
                {
                    currentForecasts.map(item =>
                        <Card key={item.id} id={item.id} card={item} removeForecast={removeForecast} />
                    )
                }
            </div>
        </div>
    );
}

export default Main;