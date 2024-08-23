//@ts-nocheck
import React, { forwardRef, ForwardedRef } from 'react'
import clsx from 'clsx'

// Define prop types for the containers
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const OuterContainer = forwardRef<HTMLDivElement, ContainerProps>(function OuterContainer(
    { className, children, ...props },
    ref: ForwardedRef<HTMLDivElement>
) {
    return (
        <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
            <div className="mx-auto max-w-8xl lg:px-8">{children}</div>
        </div>
    )
})

const InnerContainer = forwardRef<HTMLDivElement, ContainerProps>(function InnerContainer(
    { className, children, ...props },
    ref: ForwardedRef<HTMLDivElement>
) {
    return (
        <div
            ref={ref}
            className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
            {...props}
        >
            <div className="mx-auto max-w-5xl lg:max-w-8xl">{children}</div>
        </div>
    )
})

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
    { children, ...props },
    ref: ForwardedRef<HTMLDivElement>
) {
    return (
        <OuterContainer ref={ref} {...props}>
            <InnerContainer>{children}</InnerContainer>
        </OuterContainer>
    )
})

Container.Outer = OuterContainer
Container.Inner = InnerContainer
