import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";
import SimpleMap from "./Map";
import axios from "axios";

const sortOptions = [
    { name: "Amusement Parks", href: "#", current: false },
    { name: "Bars", href: "#", current: false },
    { name: "Beauty Salons", href: "#", current: false },
    { name: "Cafe", href: "#", current: false },
    { name: "Cinemas", href: "#", current: false },
    { name: "Clubs", href: "#", current: false },
    { name: "Galleries", href: "#", current: false },
    { name: "Museums", href: "#", current: false },
    { name: "Parks", href: "#", current: false },
    { name: "Restaurants", href: "#", current: true },
    { name: "Shopping Centres", href: "#", current: false },
    { name: "Sports Club", href: "#", current: false },
    { name: "Swimming pools", href: "#", current: false },
    { name: "Theatres", href: "#", current: false },
];
const subCategories = [
    { name: "Beauty Salon", href: "#" },
    { name: "Spa", href: "#" },
    { name: "Hair Care", href: "#" },
    { name: "Point Of Interest", href: "#" },
    { name: "Establishment", href: "#" },
];
const filters = [
    {
        id: "rating",
        name: "Rating",
        options: [
            { value: "1", label: "Above 1 star", checked: false },
            { value: "2", label: "Above 2 star", checked: false },
            { value: "3", label: "Above 3 star", checked: true },
            { value: "4", label: "Above 4 star", checked: false },
            { value: "5", label: "Only 5 star", checked: false },
            { value: "6", label: "All", checked: false },
        ],
    },
    {
        id: "distance",
        name: "Distance",
        options: [
            { value: "1", label: "Upto 5 km", checked: false },
            { value: "2", label: "Upto 10 km", checked: false },
            { value: "3", label: "Upto 15 km", checked: true },
            { value: "4", label: "Upto 20 km", checked: false },
            { value: "5", label: "No restriction", checked: false },
        ],
    },
    {
        id: "open",
        name: "Open",
        options: [
            { value: "1", label: "Open now", checked: true },
        ],
    },
    // {
    //   id: "size",
    //   name: "Size",
    //   options: [
    //     { value: "2l", label: "2L", checked: false },
    //     { value: "6l", label: "6L", checked: false },
    //     { value: "12l", label: "12L", checked: false },
    //     { value: "18l", label: "18L", checked: false },
    //     { value: "20l", label: "20L", checked: false },
    //     { value: "40l", label: "40L", checked: true },
    //   ],
    // },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Filter() {
    const [result, setResult] = useState(null)
    async function getData() {
        let dataObject = {
            "latitude": 13.067439,
            "longitude": 80.237617,
            "radius": 1500,
            "activity": "beauty_salon",
            "opennow": true
        }
        let response = await axios.post('http://127.0.0.1:8000/test', dataObject)
        // console.log('response', response.data)
        setResult(response.data.data.results)
    }
    useEffect(() => {
        getData()
    }, [])

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    console.log(result)

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-40 lg:hidden"
                        onClose={setMobileFiltersOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Filters
                                        </h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <form className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>

                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-t border-gray-200 px-4 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">
                                                                    {section.name}
                                                                </span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <PlusIcon
                                                                            className="h-5 w-5"
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}
                                                                </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-6">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={option.value}
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            defaultChecked={option.checked}
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            Activities
                        </h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Activity
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <Menu.Item key={option.name}>
                                                    {({ active }) => (
                                                        <a
                                                            href={option.href}
                                                            className={classNames(
                                                                option.current
                                                                    ? "font-medium text-gray-900"
                                                                    : "text-gray-500",
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm"
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button> */}
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <div>
                                    <SimpleMap />
                                </div>
                                {filters.map((section) => (
                                    <Disclosure
                                        as="div"
                                        key={section.id}
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-4">
                                                        {section.options.map((option, optionIdx) => (
                                                            <div
                                                                key={option.value}
                                                                className="flex items-center"
                                                            >
                                                                <input
                                                                    id={`filter-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    defaultValue={option.value}
                                                                    type="checkbox"
                                                                    defaultChecked={option.checked}
                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                />
                                                                <label
                                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                    className="ml-3 text-sm text-gray-600"
                                                                >
                                                                    {option.label}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">{/* Your content */}</div>
                        </div>
                    </section>
                </main>
            </div>
            <>
                {result?.map((item) => {
                    return (
                        <>
                            <p>{item.name} - {item.rating}</p>
                        </>
                    )
                })}
            </>
        </div>
    );
}
