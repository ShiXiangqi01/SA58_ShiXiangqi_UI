import React, {useState} from 'react';
import CheckboxComponent from "./CheckBoxComponent";
import './ListStyle.css'

export default function ListCoins({ coins, selectedCoins, handleCheckboxChange }) {

    return (
        <div>
            <div className="coins-container">
                {coins.map((coin, index) => (
                    <CheckboxComponent
                        key={index}
                        label={coin}
                        checked={selectedCoins[index]}
                        onChange={() => handleCheckboxChange(index)}
                    />
                ))}
            </div>
        </div>
    );
}


