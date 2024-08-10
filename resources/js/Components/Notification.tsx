// @ts-nocheck
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

export default function Notification() {
    const notifiaction = usePage<PageProps>().props.flash;
    return (
        <>
            {
                notifiaction.message ?
                    <div
                        className="fixed text-center bottom-5 p-4 rounded-md right-3 bg-sky-700 text-sm text-white bg-no-repeat bg-center bg-cover"
                        x-data="{show: true}"
                        x-init="setTimeout(() => show = false, 4000 )"
                        x-show="show"
                        style={{backgroundImage: `url("/assets/images/menu-heade.jpg")`}}>
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Success!</strong>
                                {notifiaction.message}
                            </span>
                    </div>
                    :
                    notifiaction.error ?
                        <div
                            x-data="{show: true}"
                            x-init="setTimeout(() => show = false, 4000 )"
                            x-show="show"
                            className="fixed text-center bottom-5 p-4 right-3 bg-sky-700 text-sm p-3.5 rounded text-white bg-gradient-to-r from-[#BD194D] to-[#004fe6]">
                            <span className="ltr:pr-2 rtl:pl-2">
                                <strong className="ltr:mr-1 rtl:ml-1">Error!</strong>
                                {notifiaction.error}
                            </span>
                        </div>
                        :
                        notifiaction.info ?
                            <div
                                x-data="{show: true}"
                                x-init="setTimeout(() => show = false, 4000 )"
                                x-show="show"
                                className="fixed text-center bottom-5 p-4 rounded right-3 text-sm text-white bg-info">
                            <span className="text-white w-6 h-6 ltr:mr-4 rtl:ml-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path opacity="0.5"
                                          d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19"
                                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </span>
                                <span>
                                <strong className="ltr:mr-1 rtl:ml-1">Info!</strong>
                                    {notifiaction.info}
                            </span>
                            </div>
                            : ''

            }
        </>
    )
}
