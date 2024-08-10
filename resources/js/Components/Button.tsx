//@ts-nocheck
import clsx from 'clsx';
import {Link} from "@inertiajs/react";

const variantStyles = {
    primary:
        'bg-teal-500 font-semibold text-zinc-100 hover:bg-teal-600 active:bg-teal-500 active:text-zinc-100/70 dark:bg-teal-500 dark:hover:bg-teal-600 dark:active:bg-teal-700 dark:active:text-zinc-100/70',
    secondary:
        'bg-teal-50 font-medium text-zinc-900 hover:bg-teal-500 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-teal-500 dark:text-zinc-300 dark:hover:bg-teal-500 dark:hover:text-zinc-50 dark:active:bg-teal-500 dark:active:text-zinc-50/70',
};

type ButtonProps = {
    variant?: 'primary' | 'secondary';
    className?: string;
    href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({
                           variant = 'primary',
                           className,
                           href,
                           ...props
                       }: ButtonProps) {
    const combinedClassName = clsx(
        'inline-flex items-center text-xs uppercase gap-2 justify-center rounded p-1.5 text-sm outline-offset-2 transition active:transition-none',
        variantStyles[variant],
        className
    );

    if (href) {
        return (
            <Link href={href} className={combinedClassName} {...props} />
        );
    }

    return (
        <button className={combinedClassName} {...props} />
    );
}
