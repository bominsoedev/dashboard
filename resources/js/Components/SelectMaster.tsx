import React, { FC } from 'react';
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react';
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/16/solid";

interface Provider {
    id: string;
    name: string;
    slug: string;
}

interface SelectMasterProps {
    providers: Provider[];
    selectedProviderId: string;
    onChange: (id: string) => void;
}

const ProviderImage: FC<{ slug: string }> = ({ slug }) => {
    const getImageSrc = () => {
        switch (slug) {
            case 'kbz_pay':
                return '/assets/provider/Kpay.webp';
            case 'wave_pay':
                return '/assets/provider/wave.jpeg';
            case 'aya_pay':
                return '/assets/provider/download.jpeg';
            default:
                return '';
        }
    };

    return (
        <img
            alt={slug}
            src={getImageSrc()}
            className="h-5 w-5 flex-shrink-0 rounded-full"
        />
    );
};

const SelectMaster: FC<SelectMasterProps> = ({ providers, selectedProviderId, onChange }) => {
    const selectedProvider = providers.find(provider => provider.id === selectedProviderId);

    return (
        <Listbox value={selectedProviderId} onChange={onChange}>
            <div className="relative">
                <ListboxButton className="relative block w-full appearance-none outline-none rounded border-none bg-gray-100 dark:bg-white/5 py-1.5 px-3 text-sm/6 text-gray-900 dark:text-white">
          <span className="flex items-center">
            {/*{selectedProvider && <ProviderImage slug={selectedProvider.slug} />}*/}
              <span className="ml-3 block truncate">
              {selectedProvider?.name} <span className="text-gray-400 dark:text-gray-500">@{selectedProvider?.slug}</span>
            </span>
          </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </span>
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {providers.map((provider) => (
                        <ListboxOption
                            key={provider.id}
                            value={provider.id}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900 dark:text-gray-200'
                                }`
                            }
                        >
                            {({ selected }) => (
                                <>
                                    <div className="flex items-center">
                                        <span className={`ml-3 block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                      {provider.name} <span className="text-gray-400 dark:text-gray-500">@{provider.slug}</span>
                    </span>
                                    </div>
                                    {selected && (
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-teal-600 dark:text-teal-400">
                      <CheckIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                                    )}
                                </>
                            )}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
};

export default SelectMaster;
