import { Fragment, useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Input from "@/components/common/Input";
import { ModalConfirmButton } from "@/components/common/Button";
import { Dialog, Transition } from "@headlessui/react";
import UserService from "@/services/user-service";

export default function userPermitModal(props) {
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [message, setMessage] = useState('');
    const [messageFlag, setMessageFlag] = useState(false);
    const [user, setUser] = useState({
        ...props.user,
    });

    const handleClose = () => {
        props.handleClose();
    };

    const saveData = async () => {
        setBtnDisabled(true);
        let flag = true;
        if (props.type === "") {
            flag = false;
        }

        if (message === "") {
            flag = false;
            setMessageFlag(true);
        }

        if (!flag) {
            setBtnDisabled(false);
            return;
        }

        const permitUser = {
            type: props.type,
            to_user_id: props.user._id,
            message: message,
        };
        try {
            const response = await UserService.permitUser(permitUser);
            setMessageFlag(false)
            setMessage('')
        } catch (err) {
        }
    };

    return (
        <div>
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex justify-center p-4 text-center items-top sm:items-center sm:p-0 ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative w-full px-4 pt-5 pb-4 text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="absolute top-0 right-0 pt-2 pr-4 sm:block">
                                        <button
                                            type="button"
                                            className="mt-2 text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={() => handleClose(false)}
                                        >
                                            <span className="sr-only">close</span>
                                            <XMarkIcon
                                                className="w-6 h-6 text-black"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div>
                                        <div className="mt-3 sm:mt-5">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Permit User
                                            </Dialog.Title>
                                            <div className="flex mt-2 ">
                                                <form className="w-full space-y-8 divide-y divide-gray-200">
                                                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                                        <div className="pt-2">
                                                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                                                                <div className="sm:col-span-6">
                                                                    <Input
                                                                        labelName={'Type'}
                                                                        value={props.type}
                                                                        disabled={true}
                                                                        maxLength={50}
                                                                    />
                                                                </div>

                                                                <div className="sm:col-span-6">
                                                                    <label
                                                                        htmlFor="about"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Reason
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <textarea
                                                                            id="about"
                                                                            onChange={(event) => {
                                                                                setMessage(event.target.value)
                                                                            }}
                                                                            value={message}
                                                                            error={messageFlag ? "this field is required" : ""}
                                                                            name="about"
                                                                            rows={3}
                                                                            maxLength={250}
                                                                            className={`${messageFlag ? "border-red-400" : "border-gray-300"
                                                                                } rounded-md shadow-sm sm:text-sm focus:bg-transparent border-[1px] text-black focus-visible:border-[3px] focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none block p-2 pl-[3px] w-full`}
                                                                        />
                                                                        {messageFlag ? (
                                                                            <span className="text-sm text-red-400">
                                                                                This field is required
                                                                            </span>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <ModalConfirmButton
                                        onCancel={handleClose}
                                        onConfirm={saveData}
                                        isAdd={true}
                                        disabled={btnDisabled}
                                    />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
