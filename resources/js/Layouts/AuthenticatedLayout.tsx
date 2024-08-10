import {PropsWithChildren, Suspense, useEffect, useState} from 'react';
import {IRootState} from '@/store';
import {useDispatch, useSelector} from 'react-redux';
import Sidebar from '@/Components/AppLayout/Sidebar';
import Header from '@/Components/AppLayout/Header';
import Setting from '@/Components/AppLayout/Setting';
import {
    toggleAnimation,
    toggleLayout,
    toggleLocale,
    toggleMenu,
    toggleNavbar,
    toggleRTL,
    toggleSemidark,
    toggleSidebar,
    toggleTheme
} from '@/store/themeConfigSlice';
import Footer from '@/Components/AppLayout/Footer';
import Notification from "@/Components/Notification";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function Authenticated({children}: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [showTopButton, setShowTopButton] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
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
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section antialiased relative font-nunito text-sm font-normal`}
        >
            <div className='relative'>
                {/* sidebar menu overlay */}
                <div
                    className={`${(!themeConfig.sidebar && 'hidden') || ''} fixed inset-0 bg-[black]/60 z-50 lg:hidden`}
                    onClick={() => dispatch(toggleSidebar())}></div>
                <div className='fixed bottom-6 ltr:right-6 rtl:left-6 z-50'>
                    {showTopButton && (
                        <button type='button'
                                className='btn btn-outline-primary rounded-full p-2 animate-pulse bg-[#fafafa] dark:bg-[#060818] dark:hover:bg-primary'
                                onClick={goToTop}>
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24'
                                 stroke='currentColor' strokeWidth='1.5'>
                                <path strokeLinecap='round' strokeLinejoin='round' d='M8 7l4-4m0 0l4 4m-4-4v18'/>
                            </svg>
                        </button>
                    )}
                </div>

                {/* BEGIN APP SETTING LAUNCHER */}
                <Setting/>
                {/* END APP SETTING LAUNCHER */}

                <div className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}>
                    {/* BEGIN SIDEBAR */}
                    <Sidebar/>
                    {/* END SIDEBAR */}

                    <div className='main-content flex flex-col min-h-screen'>
                        {/* BEGIN TOP NAVBAR */}
                        <Header/>
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <Suspense>
                            <PerfectScrollbar
                                className="relative max-h-[780px] chat-conversation-box">
                                <div className={`${themeConfig.animation} p-6 animate__animated`}>

                                    {children}
                                </div>
                            </PerfectScrollbar>
                        </Suspense>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER */}
                        <Footer/>
                        {/* END FOOTER */}

                        {/* BEGIN NOTIFICATION */}
                        <Notification/>
                        {/* END NOTIFICATION */}
                    </div>
                </div>
            </div>
        </div>
    );
}
