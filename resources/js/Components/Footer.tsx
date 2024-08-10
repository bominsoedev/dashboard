//@ts-nocheck
import {Container} from "./Container";
import NavLink from "@/Components/FooterNav";

export function Footer() {
    return (
        <footer className="mt-32">
            <Container.Outer>
                <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
                    <Container.Inner>
                        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                            <div className="flex gap-3 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                <NavLink href={route('welcome')} active={route().current('welcome')}>Home</NavLink>
                                <NavLink href={route('about')} active={route().current('about')}>About</NavLink>
                                <NavLink href="" active={false}>Articles</NavLink>
                                <NavLink href={route('uses')} active={route().current('uses')}>Uses</NavLink>
                            </div>
                            <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                © {new Date().getFullYear()} KZY Photography . All rights
                                reserved.
                            </p>
                        </div>
                    </Container.Inner>
                </div>
            </Container.Outer>
        </footer>
)
}
