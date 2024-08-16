//@ts-nocheck
import {Fragment, useEffect, useRef} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {Container} from "@/Components/Container";
import {Link} from "@inertiajs/react";
import AvatarContainer from "@/Components/AvatarContainer";
import Avatar from "@/Components/Avatar";
import ModeToggle from "@/Components/ModeToggle";
import NavLink from "@/Components/NavLink";
interface IconProps {
    className?: string;
}

const CloseIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path
            d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const ChevronDownIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
        <path
            d="M1.75 1.75 4 4.25l2.25-2.5"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

interface MobileNavItemProps {
    href: string;
    children: React.ReactNode;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({href, children}) => (
    <li>
        <Popover.Button as={Link} href={href} className="block py-2">
            {children}
        </Popover.Button>
    </li>
)

const MobileNavigation: React.FC = (props) => (
    <Popover {...props}>
        <Popover.Button
            className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-gray-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
            Menu
            <ChevronDownIcon
                className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"/>
        </Popover.Button>
        <Transition.Root>
            <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80"/>
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel
                    focus
                    className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-gray-900 dark:ring-zinc-800"
                >
                    <div className="flex flex-row-reverse items-center justify-between">
                        <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                            <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400"/>
                        </Popover.Button>
                        <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            KZY Photography
                        </h2>
                    </div>
                    <nav className="mt-6">
                        <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                            <MobileNavItem href="/about">About</MobileNavItem>
                            <MobileNavItem href="/article_list">Articles</MobileNavItem>
                            <MobileNavItem href="/uses">Uses</MobileNavItem>
                        </ul>
                    </nav>
                </Popover.Panel>
            </Transition.Child>
        </Transition.Root>
    </Popover>
)

interface NavItemProps {
    href: string;
    children: React.ReactNode;
}


const DesktopNavigation: React.FC = (props) => (
    <nav {...props}>
        <ul className="flex rounded bg-white/90 px-3 text-sm font-medium text-zinc-800 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
            <NavLink href={route('welcome')} active={route().current('welcome')}>Home</NavLink>
            <NavLink href={route('about')} active={route().current('about')}>About</NavLink>
            <NavLink href={route('articles.article_list')} active={route().current('articles.article_list')}>Article</NavLink>
            <NavLink href={route('uses')} active={route().current('uses')}>Uses</NavLink>
        </ul>
    </nav>
)
function clamp(number: number, a: number, b: number) {
    let min = Math.min(a, b)
    let max = Math.max(a, b)
    return Math.min(Math.max(number, min), max)
}
const Header: React.FC = () => {
    let isHomePage = route().current('welcome')
    const headerRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const isInitial = useRef(true);

    useEffect(() => {
        const downDelay = avatarRef.current?.offsetTop ?? 0;
        const upDelay = 64;

        function setProperty(property: string, value: string) {
            document.documentElement.style.setProperty(property, value);
        }

        function removeProperty(property: string) {
            document.documentElement.style.removeProperty(property);
        }

        function updateHeaderStyles() {
            const header = headerRef.current;
            if (!header) return;

            const { top, height } = header.getBoundingClientRect();
            const scrollY = clamp(window.scrollY, 0, document.body.scrollHeight - window.innerHeight);

            if (isInitial.current) {
                setProperty('--header-position', 'sticky');
            }

            setProperty('--content-offset', `${downDelay}px`);

            if (isInitial.current || scrollY < downDelay) {
                setProperty('--header-height', `${downDelay + height}px`);
                setProperty('--header-mb', `${-downDelay}px`);
            } else if (top + height < -upDelay) {
                const offset = Math.max(height, scrollY - upDelay);
                setProperty('--header-height', `${offset}px`);
                setProperty('--header-mb', `${height - offset}px`);
            } else if (top === 0) {
                setProperty('--header-height', `${scrollY + height}px`);
                setProperty('--header-mb', `${-scrollY}px`);
            }

            if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
                setProperty('--header-inner-position', 'fixed');
                removeProperty('--header-top');
                removeProperty('--avatar-top');
            } else {
                removeProperty('--header-inner-position');
                setProperty('--header-top', '0px');
                setProperty('--avatar-top', '0px');
            }
        }

        function updateAvatarStyles() {
            if (!isHomePage) {
                return;
            }

            const fromScale = 1;
            const toScale = 36 / 64;
            const fromX = 0;
            const toX = 2 / 16;

            const scrollY = downDelay - window.scrollY;

            let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
            scale = clamp(scale, fromScale, toScale);

            let x = (scrollY * (fromX - toX)) / downDelay + toX;
            x = clamp(x, fromX, toX);

            setProperty('--avatar-image-transform', `translate3d(${x}rem, 0, 0) scale(${scale})`);

            const borderScale = 1 / (toScale / scale);
            const borderX = (-toX + x) * borderScale;
            const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

            setProperty('--avatar-border-transform', borderTransform);
            setProperty('--avatar-border-opacity', scale === toScale ? '1' : '0');
        }

        function updateStyles() {
            updateHeaderStyles();
            updateAvatarStyles();
            isInitial.current = false;
        }

        updateStyles();
        window.addEventListener('scroll', updateStyles, { passive: true });
        window.addEventListener('resize', updateStyles);

        return () => {
            window.removeEventListener('scroll', updateStyles);
            window.removeEventListener('resize', updateStyles);
        };
    }, [isHomePage]);

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-none flex-col"
                style={{
                    height: 'var(--header-height)',
                    marginBottom: 'var(--header-mb)',
                }}
            >
                {isHomePage && (
                    <>
                        <div
                            ref={avatarRef}
                            className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
                        />
                        <Container
                            className="top-0 order-last -mb-3 pt-3"
                            style={{ position: 'var(--header-position)' }}
                        >
                            <div
                                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                                style={{ position: 'var(--header-inner-position)' }}
                            >
                                <div className="relative">
                                    <AvatarContainer
                                        className="absolute left-0 top-3 origin-left transition-opacity"
                                        style={{
                                            opacity: 'var(--avatar-border-opacity, 0)',
                                            transform: 'var(--avatar-border-transform)',
                                        }}
                                    />
                                    <Avatar
                                        large
                                        className="block h-16 w-16 origin-left"
                                        style={{ transform: 'var(--avatar-image-transform)' }}
                                    />
                                </div>
                            </div>
                        </Container>
                    </>
                )}
                <div
                    ref={headerRef}
                    className="top-0 z-10 h-16 pt-6"
                    style={{ position: 'var(--header-position)' }}
                >
                    <Container
                        className="top-[var(--header-top,theme(spacing.6))] w-full"
                        style={{ position: 'var(--header-inner-position)' }}
                    >
                        <div className="relative flex gap-4">
                            <div className="flex flex-1">
                                {!isHomePage && (
                                    <AvatarContainer>
                                        <Avatar />
                                    </AvatarContainer>
                                )}
                            </div>
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation className="pointer-events-auto md:hidden" />
                                <DesktopNavigation className="pointer-events-auto hidden md:block" />
                            </div>
                            <div className="flex justify-end md:flex-1">
                                <div className="pointer-events-auto">
                                    {/*<ModeToggle />*/}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
        </>
    )
}

export default Header
