//@ts-nocheck
import React from "react";

export default function Toggle({key, name, checked, onChange }) {

    return (
        <>
            <label
                className="w-10 h-5 relative">
                <input type="checkbox"
                       name={name}
                       checked={checked == 1}
                       onChange={(e) => onChange(e.target.checked)}
                       className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer"
                       id={key}/>
                <span
                    className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:rounded-full peer-checked:bg-primary before:transition-all before:left-1 before:bottom-1 before:w-3 before:h-3 peer-checked:before:left-6 before:duration-300 duration-300"></span>
            </label>
        </>
    )
}
