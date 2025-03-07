import { JSX } from "react";

interface SubmitButtonProps {
    onClick: (data?: any) => any;
    children: string;
}
const SubmitButton = ( { onClick, children }: SubmitButtonProps ): JSX.Element => {
    return (
        <div>
            <button className="border border-light_green
                            bg-transparent rounded-full w-32 h-10 
                            hover:bg-light_green hover:text-light_orange"
                    onClick={ onClick }>
            { children }
            </button>
        </div>
    );
}

export default SubmitButton;