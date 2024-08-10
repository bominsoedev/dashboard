import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `px-4 py-2 font-semibold text-sm bg-white text-slate-700 hover:bg-slate-800 dark:hover:bg-slate-800 duration-300 dark:bg-slate-700 dark:text-white rounded-md shadow-sm ring-1 ring-slate-900/5 dark:ring-white/10 dark:ring-inset border-indigo-500 border-2 border-none ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
