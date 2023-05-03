import React from 'react';

interface TagProps {
    label: string;
    value: number;
}

export const Tag = ({ label, value }: TagProps) => {
    return (
        <div
            className={Number(value) > 0.75 ? "bg-red-200 ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 my-2 text-red-700 rounded-full"
                : value < 0.25 ? "bg-green-200 ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 my-2 text-green-700 rounded-full"
                    : "bg-orange-200 ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 my-2 text-orange-700 rounded-full"}
        >
            {label}
        </div>
    );
};