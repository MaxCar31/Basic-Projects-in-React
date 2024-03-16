import React from 'react';
import '../styleSheets/ButtonClear.css';

const ButtonClear = (props) => (
    <div className='ButtonClear' onClick={props.manejarClear} >
        {props.children}
    </div>
)

export default ButtonClear;