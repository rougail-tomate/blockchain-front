import { JSX, useState } from "react";

interface InputProps {
    isPassword?: boolean;
    placeholder: string;
    className?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 };

const Input = ({ isPassword, placeholder, className, onChange, value }: InputProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center space-y-2">
            <input
                type={ isPassword ? "password": "text" }
                value={ value }
                onChange={ onChange }
                placeholder={ placeholder }
                className= { `border border-light_green p-2 rounded-2xl
                    focus:outline-none focus:ring-2 focus:ring-light_green bg-transparent ${className}` }
            />
        </div>
    );
}

export default Input;