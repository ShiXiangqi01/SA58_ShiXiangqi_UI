import React, { useState } from 'react';

export default function InputComponent({ value, onChange }) {
    return (
        <div>
            <label>
                Input:
                <input type="text" value={value} onChange={onChange} />
            </label>
        </div>
    );
}

