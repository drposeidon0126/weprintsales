
import Input from '@/components/common/Input';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useRef } from 'react';
import DefaultImage from '../../../../public/img/default.png';
import OrderService from "@/services/order-service"
import { SelectNoSearch } from '@/components/common/Select';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from "@heroicons/react/20/solid";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context";
import Constant from '@/utils/constant';
import userService from '@/services/user-service';

const userTypeList = [
    { id: 0, name: "normal" },
    { id: 1, name: "admin" }
];
const statusList = [
    { id: 0, name: "request" },
    { id: 0, name: "permit" }
]
const serviceTypeList = [
    { id: 0, name: "", value: "" },
    { id: 1, name: "We Print DTF", value: "we_print_dtf" },
    { id: 2, name: "Embroidery", value: "embroidery" },
    { id: 3, name: "Screen Printing", value: "screen_printing" },
    { id: 4, name: "Vinyl Transfer", value: "vinly_transfer" },
    { id: 5, name: "Signs & Banners", value: "signs_banners" },
];

export function OrderEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const authContext = useContext(AuthContext);
    console.log(authContext.role);
    const isAdmin = authContext.role === Constant.Admin ? true : false;
    const order = location.state;
    const [title, setTitle] = useState('');
    const [titleFlag, setTitleFlag] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const avatarFileRef = useRef([]);
    const [avatarPhoto, setAvatarPhoto] = useState('');
    const [avatarPhotoFlag, setAvatarPhotoFlag] = useState(false);
    const [orders, setOrders] = useState([]);
    const API_URL = process.env.API_URL;
    const [customer, setCustomer] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [customerFlag, setCustomerFlag] = useState(false);
    const [isView, setIsView] = useState(false);
    const addOrder = (title, id) => {
        let order = {
            quantity: 0,
            comment: '',
            client_art_up: null,
            service_type: 0,
            serviceTypeFlag: false,
            quantityFlag: false,
            idFlag: false,
            imgFlag: false,
        };
        let temp = [...orders, order];

        setOrders(temp);
    };

    const onChangeImagePhoto = (event, index) => {
        if (event.target.files && event.target.files[0]) {
            let tempFilie = [...imageFiles]
            tempFilie[index] = event.target.files[0];
            setImageFiles(tempFilie);
            let reader = new FileReader();
            reader.onload = event => {
                const temp = orders.map((obj, subindex) => {
                    if (subindex === index) {
                        return {
                            ...obj,
                            client_art_up: event.target.result,
                            imgFlag: false,
                        };
                    }
                    return obj;
                });
                console.log(orders, "this is on1")

                console.log('1-temp', temp)
                setOrders(temp);
                console.log(orders, "this is on2")
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const avatarImageClick = (index) => {
        if (order) {
            return;
        }
        avatarFileRef.current[index].click();
    };

    const onChangeQuantity = (value, index) => {
        const temp = orders.map((obj, subindex) => {
            if (subindex === index) {
                return {
                    ...obj,
                    quantity: value,
                    quantityFlag: false,
                };
            }
            return obj;
        });
        setOrders(temp);
    };

    const onChangeAbout = (value, index) => {
        const temp = orders.map((obj, subindex) => {
            if (subindex === index) {
                return {
                    ...obj,
                    comment: value,
                };
            }
            return obj;
        });
        setOrders(temp);
    };

    const onChangeButtonType = (item, index) => {
        const temp = orders.map((obj, subindex) => {
            if (subindex === index) {
                return {
                    ...obj,
                    serviceTypeFlag: false,
                    service_type: item.id,
                };
            }
            return obj;
        });
        setOrders(temp);
    };

    const onDeleteButton = (index) => {
        let temp = orders;
        temp = temp.filter((button, subIndex) => {
            return index !== subIndex;
        });
        setOrders(temp);
        let tempFile = [...imageFiles]
        tempFile = tempFile.filter((obj, subIndex) => {
            return index !== subIndex;
        });
        setImageFiles(tempFile);
    };

    const saveOrder = async () => {
        let flag = true;

        if (title === "") {
            flag = false;
            setTitleFlag(true);
        }
        if (isAdmin && !customer._id) {
            flag = false;
            setCustomerFlag(true);
        }
        const temp = orders.map((obj, subindex) => {
            if (obj.service_type === 0) {
                flag = false;
                return {
                    ...obj,
                    serviceTypeFlag: true,
                };
            }
            if (obj.quantity === 0) {
                flag = false;
                return {
                    ...obj,
                    quantityFlag: true,
                };
            }
            if (obj.client_art_up === "") {
                flag = false;
                return {
                    ...obj,
                    imgFlag: true,
                };
            } else {
                return {
                    ...obj
                }
            }
        });
        setOrders(temp);
        if (!flag) {
            return;
        }

        let newOrder = {
            title: title,
            files: imageFiles,
            orders: orders,
        };
        if (isAdmin) {
            newOrder['customerId'] = customer.id
        }
        const response = await OrderService.saveOrder(newOrder);
        if (response.success) {
            navigate("/dashboard/orders");
        }
    }

    const onChangeCustomer = (item) => {
        setCustomer(item);
    }
    useEffect(() => {
        async function fetchData() {
            const response = await OrderService.getOrderDetailList(order._id);
            setOrders(response.entities);
        }
        async function fetchCustomerList() {
            const response = await userService.getCustomerList();
            setCustomerList(response.entities);
        }
        if (order && order._id) {
            fetchData();
            setIsView(true)
        }
        if (authContext.role === Constant.Admin)
            fetchCustomerList();
    }, [])

    return (
        <div>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Order</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This is your order title.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Input
                                labelName={'Title'}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    if (e.target.value != '')
                                        setTitleFlag(false)
                                }}
                                value={title}
                                error={titleFlag}
                                maxLength={50}
                            />
                        </div>
                        {isAdmin ?
                            <div className="sm:col-span-3 mt-3">
                                <SelectNoSearch
                                    labelName={'Service Type'}
                                    onChange={(item) =>
                                        onChangeCustomer(item)
                                    }
                                    value={customer}
                                    items={customerList}
                                    error={customerFlag}
                                    disabled={isView}
                                />
                            </div> : null
                        }
                        {isAdmin ?
                            <div className="sm:col-span-3 mt-3 flex items-end">
                                <NavLink
                                    className=" flex rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    to={'/dashboard/user/edit'} state={null} >
                                    <div className="text-sm font-medium text-white">
                                        Add customer
                                    </div>
                                </NavLink>
                            </div> : null
                        }
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Order Detail</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Select artwork and service_type Type</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6 ">

                            <button
                                onClick={() => addOrder("", "")}
                                className=" flex rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                <PlusCircleIcon
                                    className=" text-white block mr-[5px]"
                                    width={20} height={20}
                                />
                                <div className="text-sm font-medium text-white">
                                    Add order detail
                                </div>
                            </button>

                            {orders.map((order, index) => (
                                <div key={index} className='mt-10 block items-end sm:flex'>
                                    <div className="w-full justify-end mt-10">
                                        <div>
                                            <SelectNoSearch
                                                labelName={'Service Type'}
                                                onChange={(item) =>
                                                    onChangeButtonType(item, index)
                                                }
                                                value={order.service_type}
                                                items={serviceTypeList}
                                                error={order.serviceTypeFlag}
                                                disabled={isView}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Input
                                                type='number'
                                                labelName={'Quantity'}
                                                onChange={(e) =>
                                                    onChangeQuantity(e.target.value, index)
                                                }
                                                value={order.quantity}
                                                error={order.quantityFlag}
                                                maxLength={50}
                                                disabled={isView}
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <label className='block text-sm font-medium text-gray-700'>
                                                Comment
                                            </label>
                                            <div className="mt-1">
                                                <textarea
                                                    id="comment"
                                                    name="comment"
                                                    onChange={(e) =>
                                                        onChangeAbout(e.target.value, index)
                                                    }
                                                    disabled={isView}
                                                    value={order.comment}
                                                    rows={3}
                                                    className={`rounded-md shadow-sm sm:text-sm focus:bg-transparent border-[1px] 
                                                    h-auto border-gray-300 text-black focus-visible:border-[1px] focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none block p-2 pl-[7px] w-full ${false ? 'border-red-400' : 'border-gray-300'} `}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full justify-start  mt-8 sm:ml-10 ">
                                        <div className="flex items-center ">
                                            <input type='file' onChange={(event) => onChangeImagePhoto(event, index)} hidden ref={(el) => (avatarFileRef.current[index] = el)} />
                                            <img
                                                src={order.client_art_up ? isView ? API_URL + '/' + order.client_art_up : order.client_art_up : DefaultImage}
                                                alt='avatarImage'
                                                onClick={() => avatarImageClick(index)}
                                                width={250}
                                                height={250}
                                                className=''
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="items-end h-full w-[50px] mt-2">
                                        <TrashIcon
                                            className=" rounded-l-full text-red-400 w-[30px]  border-white border border-r-0 z-10"
                                            onClick={() => onDeleteButton(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* <div className="sm:col-span-3 sm:col-start-1">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Is Tax Exempt</legend>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                        Everything
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Same as email
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    onClick={saveOrder}
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default OrderEdit;