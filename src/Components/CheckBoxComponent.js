import React from 'react';

export default function CheckboxComponent({ label, checked, onChange }) {
    return (
        <div>
            <label>
                {label}
                <input type="checkbox" checked={checked} onChange={onChange} />
            </label>
        </div>
    );
}


