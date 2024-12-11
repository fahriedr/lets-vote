import React from 'react';

interface CheckboxCardProps {
    key: number;
    title: string;
    value: string;
    isChecked?: boolean;
    onChange: (value: string) => void;
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({ title, value, isChecked, onChange }) => {

    return (
        <label className='flex cursor-pointer items-center justify-center rounded-md border border-[##7F7F7F] bg-[##7F7F7F] px-3 py-2 text-white hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white'>
            <div className="flex items-center">
                &#8203;
                <input
                    type="checkbox"
                    className="hidden"
                    value={value}
                    checked={isChecked}
                    onChange={() => onChange(value)}
                />
            </div>

            <div>
                <strong className="font-medium text-white"> {title} </strong>
            </div>
        </label>
    );
};

export default CheckboxCard;
