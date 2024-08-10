import {forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef} from 'react';
import clsx from "clsx";
import {Description, Field, Input, Label} from "@headlessui/react";

export default forwardRef(function TextInput(
    {type = 'text', className = '', isFocused = false, ...props}: InputHTMLAttributes<HTMLInputElement> & {
        isFocused?: boolean
    },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <div className="w-full">
            <Field>
                <Input
                    {...props}
                    type={type}
                    className={clsx(
                        'mt-3 block w-full appearance-none outline-none rounded-lg border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 dark:text-white focus:border-primary focus:ring-transparent dark:border-[#17263c] dark:focus:border-primary '
                    ) + className}
                    ref={localRef}
                />
            </Field>
        </div>
        // <input
        //     {...props}
        //     type={type}
        //     className={clsx(
        //         'block w-full rounded-lg border dark:border-white/5 font-extrabold text-black dark:bg-white/5 py-1.5 px-3 text-sm/6 dark:text-white duration-300',
        //         'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 focus:border-teal-400 focus:dark:border-teal-400 hover:dark:border-teal-400 hover:border-teal-400 placeholder:border-gray-500 '
        //     ) + className}
        //     ref={localRef}
        // />
    );
});
