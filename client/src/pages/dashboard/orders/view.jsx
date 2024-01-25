import { saveAs } from "file-saver";
import Input from '@/components/common/Input';
import { useEffect, useState, useRef } from 'react';
import OrderService from "@/services/order-service"
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context";
import Constant from '@/utils/constant';
import userService from '@/services/user-service';
import OrderStep from './components/orderStep';
import DefaultImage from '../../../../public/img/default.png';



const userTypeList = [
  { id: 0, name: "normal" },
  { id: 1, name: "admin" },
  { id: 2, name: "artworker" },
  { id: 3, name: "projectstuff" },
];
const statusList = [
  { id: 1, name: "request" },
  { id: 2, name: "accepted" },
  { id: 3, name: "processing" },
  { id: 4, name: "complete" },
  { id: 5, name: "pick-up" },
  { id: 6, name: "delivered" }
]
const serviceTypeList = [
  { id: 0, name: "", value: "" },
  { id: 1, name: "We Print DTF", value: "we_print_dtf" },
  { id: 2, name: "Embroidery", value: "embroidery" },
  { id: 3, name: "Screen Printing", value: "screen_printing" },
  { id: 4, name: "Vinyl Transfer", value: "vinly_transfer" },
  { id: 5, name: "Signs & Banners", value: "signs_banners" },
];
const controlList = [
  { id: 0, name: "Send Invoice Email", role: "admin" },
  // { id: 1, name: "Order cancel", role: "admin" },
  // { id: 2, name: "", role: "" },
  // { id: 3, name: "", role: "" },
];
export function OrderEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const isAdmin = authContext.role === Constant.Admin ? true : false;
  const [order, setOrder] = useState(location.state);
  const [imageFiles, setImageFiles] = useState([]);
  const avatarFileRef = useRef([]);
  const [orders, setOrders] = useState([]);
  const API_URL = process.env.API_URL;
  const [totalPrice, setTotalPrice] = useState(0);
  const [isView, setIsView] = useState(false);
  const [user, setUser] = useState([]);


  const getUserbyOder = async () => {
    const response = await userService.getUserById(order.user_id);

    // if(response.success) {
    setUser(response);
    console.log(user, "user on view")
    // }

  }

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
        setOrders(temp);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    if (order && order._id) {
      // fetchData();
      setIsView(false)
    }

  };

  const avatarImageClick = (index) => {
    avatarFileRef.current[index].click();
  };

  const onChangePrice = (value, index) => {
    const temp = orders.map((obj, subindex) => {
      if (subindex === index) {
        return {
          ...obj,
          price: value,
          priceFlag: false,
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

  const downloadHandle = (imageUrl) => {
    let url = imageUrl;
    console.log(url, "this is image url")
    saveAs(url, "work_image");
  };

  const saveOrder = async () => {
    let flag = true;
    const temp = orders.map((obj, subindex) => {
      if (obj.price <= 0) {
        flag = false;
        return {
          ...obj,
          priceFlag: true,
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
    if (localStorage.getItem('role') === "artworker" && order.status === "3") {
      let newOrder = {
        title: order.title,
        files: imageFiles,
        orders: orders,
      };
      const response = await OrderService.saveOrder(newOrder);
      console.log(response, "tello")
      if (response.success) {
        await changeStaus(parseInt(order.status) + 1);
        // const payload ={
        //   order_id: order._id,
        //   comment: 
        // }
        navigate("/dashboard/orders");
      }
    } else {
      const response = await OrderService.saveOrderPrice({ orders: orders });
      if (response.success) {
        await changeStaus(parseInt(order.status) + 1);
        // const payload ={
        //   order_id: order._id,
        //   comment: 
        // }
        navigate("/dashboard/orders");
      }
    }
    // const response = await OrderService.saveOrderPrice({ orders: orders });
    // if (response.success) {
    //   await changeStaus(parseInt(order.status) + 1);
    //   // const payload ={
    //   //   order_id: order._id,
    //   //   comment: 
    //   // }
    //   navigate("/dashboard/orders");
    // }


  }

  const changeStaus = async (step) => {
    if (step < order.status) {
      return;
    }
    const payload = {
      order_id: order._id,
      status: step
    }
    const response = await OrderService.updateStatus(payload);
    if (response.state) {
      let temp = { ...order };
      temp.status = step;
      setOrder(temp);
    }
  };

  const controlHandle = async (id) => {
    if (id === 0) {
    //   if (totalPrice === 0) {
    //     alert("Please set price!");
    //     return
    //   } else {
        const messageData = {
          from: 'calvin168943@gmail.com',
          // to: user.user.email,
          to: 'calvin168943@gmail.com',
          subject: 'Hello ' + user.user.name + '.',
          text: 'You received invoice emai: https://invoicehome.com/'
        };
        const email_response = await userService.sendEmail(messageData);
        alert("email is sent succesfully!");

      }
    // }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await OrderService.getOrderDetailList(order._id);
      setOrders(response.entities);
      getUserbyOder();

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

  // useEffect(() => {
  //   getUserbyOder();
  //   async function fetchData() {
  //     const orderResponse = await OrderService.getOrderById(order._id);
  //     setOrder(orderResponse.order);
  //     const response = await OrderService.getOrderDetailList(order._id);
  //     setOrders(response.entities);
  //     let tempTotal = 0
  //     response.entities.map(item => {
  //       tempTotal = tempTotal + item.price;
  //     })
  //     setTotalPrice(tempTotal);
  //   }
  //   // if (order && order._id) {
  //     fetchData();
  //     setIsView(true)
  // // }
  // }, [])

  return (
    <div>
      <div className="space-y-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Order {order.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            ID - {order._id}
          </p>
        </div>
        <div className="border-b border-gray-900/10 pb-2 mb-4">
          {order.status === "5" && (
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Order was shipped successfully!
            </h1>
          )}

          {order.status === "6" && (
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Order was delivered successfully!
            </h1>
          )}
        </div>


        <div className="border-b border-gray-900/10 pb-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Order Detail
          </h2>
          <div className="mt-2 block justify-between sm:flex md:flex">
            <OrderStep
              changeStaus={() => { }}
              currentStatus={order.status}
              className="w-1/2"
            />
            <dl className="w-1/2 flex-wrap">

              {controlList.map((item) => (
                localStorage.getItem("role") === 'admin' && (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => controlHandle(item.id)}
                    className=" mt-2 flex  h-[40px] w-[130px] items-center justify-center  gap-x-4 rounded bg-blue-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {item.name}
                  </button>
                )

              ))}

              {/* <div className="flex pl-6 pt-2">
                  <dt className="text-sm font-semibold leading-6 text-gray-900">
                    Total Price
                  </dt>
                  <dd className="ml-2 text-base font-semibold leading-6 text-gray-900">
                    ${totalPrice}
                  </dd>
                </div>
               
                <div className="mt-2 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Client</span>
                    <UserCircleIcon
                      className="h-6 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm font-medium leading-6 text-gray-900">
                    {order && order.user_id.name}
                  </dd>
                </div>
                <div className="mt-2 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Due date</span>
                    <CalendarDaysIcon
                      className="h-6 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm leading-6 text-gray-500">
                    <time dateTime="2023-01-31">{order && order.date}</time>
                  </dd>
                </div>
                <div className="mt-2 flex w-full flex-none gap-x-4 px-6">
                  <dt className="flex-none">
                    <span className="sr-only">Status</span>
                    <CreditCardIcon
                      className="h-6 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-sm leading-6 text-gray-500">
                    {order && order.payment_req}
                  </dd>
                </div> */}
            </dl>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        {/* Order list */}
        <div className="-mx-4 px-4 py-2 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-4 sm:pb-10  xl:px-8 xl:pb-2 xl:pt-2">
          <table className=" w-full whitespace-nowrap text-left text-sm leading-6">
            <colgroup>
              <col className="" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead className="border-b border-gray-200 text-gray-900">
              <tr>
                <th scope="col" className="px-0 py-3 font-semibold">
                  Service Type
                </th>
                <th
                  scope="col"
                  className="hidden py-3 pl-10 pr-0 text-right font-semibold sm:table-cell"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="hidden py-3 pl-10 pr-0 text-right font-semibold sm:table-cell"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="py-3 pl-10 pr-0 text-right font-semibold"
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="max-w-0 px-0 py-5 align-top">
                    <div className="truncate font-medium text-gray-900">
                      {serviceTypeList[item.service_type].name}
                    </div>
                    <div className="truncate text-gray-500">
                      {item.comment}
                      
                    </div>
                  </td>
                  <td className="hidden py-5 pl-10 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                    {item.quantity}
                  </td>
                  <td className="hidden py-5 pl-10 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                    <div className="flex justify-end">
                      <div className="flex items-center mr-3">
                        {(localStorage.getItem('role') === 'artworker' && order.status !== "3") || (localStorage.getItem('role') === 'admin') || (localStorage.getItem('role') === "normal" || (localStorage.getItem('role') === "projectstuff" && order.status === "4")) ? (
                          <img
                            src={item.client_art_up ? API_URL + "/" + item.client_art_up : DefaultImage}
                            alt="Image"
                            width={100}
                            height={100}
                            className=" "
                            style={{ objectFit: "contain" }}
                          />
                        ) : null}
                        {(localStorage.getItem('role') === 'artworker' && order.status === "3") ? (
                          <>
                            <input type='file' onChange={(event) => onChangeImagePhoto(event, index)} hidden ref={(el) => (avatarFileRef.current[index] = el)} />
                            <img
                              src={item.client_art_up ? isView ? API_URL + '/' + item.client_art_up : item.client_art_up : DefaultImage}
                              alt='Image'
                              onClick={() => avatarImageClick(index)}
                              width={250}
                              height={250}
                              className=''
                              style={{ objectFit: 'contain' }}
                            />
                          </>
                        ) : null}
                      </div>
                    </div>
                    {(localStorage.getItem('role') === 'artworker' && order.status === "2") || (localStorage.getItem('role') === 'admin') || (localStorage.getItem('role') === "projectstuff" && order.status === "4") ? (
                      <button
                        type="submit"
                        onClick={() => downloadHandle(API_URL + "/" + item.client_art_up)}
                        className="mt-4 mr-5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Download
                      </button>
                    ) : null}
                  </td>
                  {localStorage.getItem('role') === 'admin' ? (
                    <td className="py-2 pl-10 pr-0 text-right align-top tabular-nums text-gray-700">
                      <Input
                        type="number"
                        onChange={(e) => onChangePrice(e.target.value, index)}
                        value={item.price}
                        error={item.priceFlag}
                        maxLength={50}
                        className="w-[20px]"
                      />
                    </td>
                  ) : (
                    <td className="py-2 pl-10 pr-0 text-right align-top tabular-nums text-gray-700">
                      {item.price}
                    </td>
                  )}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {(localStorage.getItem("role") === "admin" && order.status === '1') ? (
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={saveOrder}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Approve
          </button>
        </div>
      ) : null}


      {localStorage.getItem("role") === 'artworker' && (
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {order.status === '2' || order.status === '3' ? (
            <div className="mt-4 " style={{ width: "60%" }}>
              {orders.map((item, index) => (
                <>
                  <label className='block text-sm font-medium text-gray-700'>
                    Comment {index+1}
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="comment"
                      name="comment"
                      onChange={(e) =>
                        onChangeAbout(e.target.value, index)
                      }
                      // disabled={isView}
                      value={item.comment}
                      rows={3}
                      className={`rounded-md shadow-sm sm:text-sm focus:bg-transparent border-[1px] h-auto border-gray-300 text-black focus-visible:border-[1px] focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:outline-none block p-2 pl-[7px] w-full ${false ? 'border-red-400' : 'border-gray-300'} `}
                    />
                  </div>
                </>
              ))}

            </div>
          ) : null}

          {order.status === '2' && (
            <>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={saveOrder}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >

                Start Work
              </button>
            </>
          )}
          {order.status === "3" && (
            <>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={saveOrder}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Complete
              </button>
            </>
          )}

        </div>
      )
      }
      {localStorage.getItem("role") === "projectstuff" && (
        <div className="mt-6 flex items-center justify-end gap-x-6">

          {order.status === "4" && (
            <>
              <button
                type="submit"
                onClick={saveOrder}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Pick-Up
              </button>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            </>

          )}
          {order.status === "5" && (
            <>
              <button
                type="submit"
                onClick={saveOrder}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Delvered
              </button>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            </>

          )}
        </div>
      )}


    </div >
  );
}

export default OrderEdit;