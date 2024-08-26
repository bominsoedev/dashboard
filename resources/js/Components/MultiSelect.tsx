//@ts-nocheck
import React, {FC} from 'react';
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react';
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/16/solid";

interface Option {
    id: string;
    name: string;
    slug: string;
}

interface MultiSelectProps {
    options: Option[];
    selectedValues: string[];
    onChange: (selected: string[]) => void;
}

const MultiSelect: FC<MultiSelectProps> = ({
                                               options,
                                               selectedValues,
                                               onChange,
                                           }) => {
    const handleSelect = (value: string) => {
        const newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        onChange(newSelectedValues);
    };

    return (
        <div className="relative">
            <Listbox
                value={selectedValues}
                onChange={(value: string) => handleSelect(value)}
                multiple
            >
                <ListboxButton
                    className="relative block w-full appearance-none outline-none rounded border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 dark:text-white"
                >
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">
                            {selectedValues.length > 0
                                ? options
                                    .filter(option => selectedValues.includes(option.id))
                                    .map(option => option.name)
                                    .join(', ')
                                : 'Select categories'}
                        </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400 dark:text-gray-500"/>
                    </span>
                </ListboxButton>
                <ListboxOptions
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                    {options.map((option) => (
                        <ListboxOption
                            key={option.id}
                            value={option.id}
                            className={({active}) =>
                                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900 dark:text-gray-200'
                                }`
                            }
                        >
                            {({selected}) => {
                                return (
                                    <>
                                        <div className="flex items-center">
                                        <span
                                            className={`ml-3 block truncate ${selected ? 'font-semibold' : 'font-normal'}`}
                                        >
                                            {option.name}
                                        </span>
                                        </div>
                                        {selected && (
                                            <span
                                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-teal-600 dark:text-teal-400"
                                            >
                                            <CheckIcon aria-hidden="true" className="h-5 w-5"/>
                                        </span>
                                        )}
                                    </>
                                )
                            }}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
};

export default MultiSelect;
