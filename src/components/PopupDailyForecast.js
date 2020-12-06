import React from 'react';
import close from '../images/close.svg';
import Minicard from './Minicard';

function PopupDailyForecast(props) {
    const { isOpen, onClose, array } = props;

    return (
        <div className={`popup popup_image ${isOpen && 'popup_is-opened'} `} >
            <div className="popup__content popup__content_minicards">
                <img onClick={onClose}
                    src={close}
                    alt="Закрыть"
                    className="popup__close"
                />
                <div className="places-list">
                    {array.map(item =>
                        <Minicard
                            key={item.dt}
                            minicard={item} />
                    )
                    }
                </div>
            </div>

        </div>
    );
}

export default PopupDailyForecast;