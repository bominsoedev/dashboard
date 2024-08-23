//@ts-nocheck
import './bootstrap';
import '../css/app.css';

import {createRoot, hydrateRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {Suspense} from "react";
import store from "@/store";
import {Provider} from "react-redux";
import '@/i18n';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import Alpine from 'alpinejs'


Alpine.start()

const appName = import.meta.env.VITE_APP_NAME || 'Photography';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({el, App, props}) {
        if (import.meta.env.DEV) {
            createRoot(el).render(
                <React.StrictMode>
                    <Suspense>
                        <Provider store={store}>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="*" element={<App {...props} />}/>
                                </Routes>
                            </BrowserRouter>
                        </Provider>
                    </Suspense>
                </React.StrictMode>)
            return
        }

        hydrateRoot(el, <React.StrictMode>
            <Suspense>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="*" element={<App {...props} />}/>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </Suspense>
        </React.StrictMode>);
    },
    progress: {
        color: '#4B5563',
    },
});
