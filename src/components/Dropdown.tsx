import React, { useState, CSSProperties } from 'react';

export const Dropdown = ({ label, value, options, onChange }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div>
            <label>
                {label}
                <select value={value} onChange={onChange}>
                    {options.map((option, index) => (
                        <option value={option.value} key={index}>{option.label}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};