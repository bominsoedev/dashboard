import {Link, InertiaLinkProps} from '@inertiajs/react';
import clsx from "clsx";

export default function NavLink({active = false, className = '', children, ...props}: InertiaLinkProps & {
    active: boolean
}) {
    return (
        <Link
            {...props}
            className={clsx(
                'relative block px-3 py-2 transition uppercase',
                active
                    ? 'text-teal-500 dark:text-teal-400'
                    : 'hover:text-teal-500 dark:hover:text-teal-400'
            )}
        >
            {children}
        </Link>
    );
}
