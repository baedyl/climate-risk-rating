import React, { useState, CSSProperties } from 'react';

interface dropdownProps {
    label: string;
    value: string;
    options: any;
    onChange: any;
}

export const Dropdown = ({ label, value, options, onChange }: dropdownProps) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="md:flex md:items-center">
            <label className="mx-2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0">
                {label}
            </label>
            <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-16 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={value} onChange={onChange}>
                    {options.map((option: {label: string, value:string}, index:number) => (
                        <option value={option.value} key={index}>{option.label}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
    );
};