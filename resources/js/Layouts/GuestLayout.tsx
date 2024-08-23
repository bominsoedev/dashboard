//@ts-nocheck
import {PropsWithChildren, useEffect, useState} from 'react';
import {Footer} from "@/Components/Footer";
import Header from "@/Components/Header";
import {useDispatch, useSelector} from "react-redux";
import store, {IRootState} from "@/store";
import {
    toggleAnimation,
    toggleLayout, toggleLocale,
    toggleMenu,
    toggleNavbar,
    toggleRTL, toggleSemidark,
    toggleTheme
} from "@/store/themeConfigSlice";

export default function Guest({children}: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const [showTopButton, setShowTopButton] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);
    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    const onScrollHandler = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScrollHandler);

        const screenLoader = document.getElementsByClassName('screen_loader');
        if (screenLoader?.length) {
            screenLoader[0].classList.add('animate__fadeOut');
            setTimeout(() => {
                setShowLoader(false);
            }, 200);
        }

        return () => {
            window.removeEventListener('onscroll', onScrollHandler);
        };
    }, []);
    return (
        <div className={'w-full'}>
            <div className="fixed inset-0 flex justify-center sm:px-8 bg-white text-slate-500 dark:text-slate-400 dark:bg-slate-900">
                <div className="flex w-full max-w-7xl lg:px-8">
                    <div className="w-full bg-white ring-1 dark:ring-slate-800 ring-zinc-100 text-slate-500 dark:text-slate-400 dark:bg-slate-900 "/>
                </div>
            </div>
            <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
                <div className="w-[108rem] flex-none flex justify-end">
                    <picture>
                        <source srcSet="/Images/bg_small.avif" type="image/avif"/>
                        <img src="/Images/small.avif" alt=""
                             className="w-[71.75rem] flex-none max-w-none dark:hidden" decoding="async"/></picture>
                    <picture>
                        <source srcSet="/Images/bg_large.avif" type="image/avif"/>
                        <img src="/Images/large.avif" alt=""
                             className="w-[90rem] flex-none max-w-none hidden dark:block" decoding="async"/></picture>
                </div>
            </div>
            <div className={'relative'}>
                <Header/>
                <main>
                    <div className='fixed bottom-6 right-10 z-50'>
                        {showTopButton && (
                            <button type='button'
                                    className='btn btn-outline-primary rounded-full p-2 animate-pulse bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-700'
                                    onClick={goToTop}>
                                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-white' fill='none'
                                     viewBox='0 0 24 24'
                                     stroke='currentColor' strokeWidth='1.5'>
                                    <path strokeLinecap='round' strokeLinejoin='round'
                                          d='M8 7l4-4m0 0l4 4m-4-4v18'/>
                                </svg>
                            </button>
                        )}
                    </div>
                    <div
                        className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                            themeConfig.rtlClass
                        } antialiased relative font-nunito font-normal`}
                    >
                        {children}
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    );
}
