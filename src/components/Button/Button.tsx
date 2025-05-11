import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    color: string;
    size: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    ariaLabel?: string;
}

export default function Button({children, color, size, onClick, ariaLabel, ...props}: ButtonProps) {
    return (
        <button
            className={`button button--${color} button--${size}`}
            onClick={onClick}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    );
}