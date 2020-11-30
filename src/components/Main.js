import React from 'react';
import Card from './Card';

function Main(props) {
    console.log(33);
    console.log(props.currentForecasts);
    // const cardId = new Date().getTime(); // для уникального id
    return (
        <div>
            <div className="places-list root__section">
                {
                    props.currentForecasts.map(item =>
                        <Card key={item.id} card={item} />
                    )
                }
            </div>
        </div>
    );
}

export default Main;