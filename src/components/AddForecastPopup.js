import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddForecastPopup(props) {
    const inputNameRef = React.useRef();

    function handleAddForecastSubmit(e) {
        e.preventDefault();
        props.onAddForecastSubmit({
            name: inputNameRef.current.value,
        });
        inputNameRef.current.value = '';
    }
    return (
        /* popup Новое место */
        <PopupWithForm
            title="Новый прогноз"
            name="add-place"
            isOpen={props.isOpen}
            close={props.onClose}
            children={
                <form className="popup__form" name="new_place">
                    <div className="input-container">
                        <input
                            required
                            type="text"
                            name="name"
                            className="popup__input popup__input_type_name"
                            placeholder="Введите название города"
                            minLength="2"
                            maxLength="30"
                            ref={inputNameRef}
                        />
                        <span className="input__error"></span>
                    </div>

                    <button className="button popup__button button_disabled" onClick={handleAddForecastSubmit}>+</button>
                </form>
            } />

    );
}
export default AddForecastPopup;