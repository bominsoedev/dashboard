//@ts-nocheck
import React from 'react'
import clsx from 'clsx'
import {Link} from "@inertiajs/react";

interface AvatarProps extends React.HTMLProps<HTMLAnchorElement> {
    large?: boolean
    className?: string
}

const avatarImage = '/Profile/profile1.jpg'

const Avatar: React.FC<AvatarProps> = ({ large = false, className, ...props }) => {
    return (
        <Link
            href="/"
            aria-label="Home"
            className={clsx(className, 'pointer-events-auto')}
            {...props}
        >
            <img
                src={avatarImage}
                alt="Avatar"
                className={clsx(
                    'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
                    large ? 'h-16 w-16' : 'h-9 w-9'
                )}
            />
        </Link>
    )
}

export default Avatar
