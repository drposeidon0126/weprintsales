import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  SquaresPlusIcon,
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ControlButton({
  onDelete, onEdit
}) {

  return (
    // <Menu as="div" className="relative inline-block text-left">
    <Menu as="div" className="relative text-left">
      <div>
        <Menu.Button className="flex items-center justify-center text-gray-600 rounded-full hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
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
        {/* <Menu.Items className="absolute z-30 w-auto mt-2 origin-center bg-white rounded-md shadow-lg -bottom-6 right-5 ring-1 ring-black ring-opacity-5 focus:outline-none"> */}
        <Menu.Items className="absolute z-30 w-auto mt-2 bg-white rounded-md shadow-lg -bottom-6 right-5 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer whitespace-nowrap"
                  )}
                  onClick={() => {
                    onDelete();
                  }}
                >
                  Delete
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer whitespace-nowrap"
                  )}
                  onClick={() => {
                    onEdit();
                  }}
                >
                  Edit
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
