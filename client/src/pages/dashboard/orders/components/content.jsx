import { useState } from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, ChevronLeftIcon, ChevronRightIcon, EyeIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import ReactTimeAgo from 'react-time-ago';
import DropDown from '@/components/dashboard/users/Dropdown';
import { SelectMenu, SelectNoSearch } from '@/components/common/Select';

import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useNavigate, Router, NavLink } from 'react-router-dom';
import CustomPagination from "../../../../components/common/CustomPagination";
const statusList = [
  { id: 0, name: "request" },
  { id: 1, name: "test" },
  { id: 2, name: "test" },
  { id: 3, name: "test" },
]
export default function Content({
  orders,
  editFunction,
  deleteFunction,
  searchTxt,
  setSearchTxt,
  isAdmin,
  currentPage,
  totalPages,
  total,
  perPage,
  loadingData,
  onPageChange,
}) {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();

  const editItem = (id) => {
    editFunction(id);
  };

  const deleteComfirm = (order) => {
    console.log(order.id);
    deleteFunction(order);
  };

  const onSetPage = (page) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages)
      onPageChange(page);
  };
  return (
    <div className="lg:px-2">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base text-xl font-semibold leading-6 text-gray-900">
            Orders
          </h1>
        </div>
        <div className="mt-3 w-full sm:mt-0 sm:ml-4 sm:w-[366.484px]">
          <label htmlFor="desktop-search-candidate" className="sr-only">
            Search
          </label>
          <div className="flex rounded-md shadow-sm">
            <div className="relative grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
                placeholder={"Search"}
                name="mobile-search-candidate"
                id="mobile-search-candidate"
                className="search-bar block h-[38px] w-full rounded-md border-[1px] border-gray-300 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:hidden"
              />
              <input
                type="text"
                value={searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
                placeholder={"Search"}
                name="desktop-search-candidate"
                id="desktop-search-candidate"
                className="search-bar hidden h-[38px] w-full rounded-md border-[1px] border-gray-300 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:block sm:text-sm"
              />
            </div>
          </div>
        </div>
        {localStorage.getItem('role') === 'normal' && (
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <NavLink
              className="block flex items-center rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              to={"/dashboard/orders/edit"}
              state={null}
            >
              <PlusCircleIcon width={20} className="mr-1 text-white" />
              {"New Order"}
            </NavLink>
          </div>
        )}

      </div>
      <div className="mt-4  rounded-md sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300 rounded-md border-t  sm:border">
          <thead className={`bg-blue-400 text-white`}>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 text-left text-sm font-semibold  sm:pl-4"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-left text-sm font-semibold "
              >
                Status
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-left text-sm font-semibold "
              >
                Value
              </th>
              <th
                scope="col"
                className="px-2 py-3.5 text-left text-sm font-semibold "
              >
                Order Date
              </th>
              <th
                scope="col"
                className="hidden px-2 py-3.5 text-left text-sm  font-semibold sm:block"
              >
                Due Date
              </th>
              <th
                scope="col"
                className="relative py-3.5 pl-0 pr-3 sm:pr-6"
              >
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 !border-b  !border-gray-200 bg-white">
            {orders &&
              orders.map((order, index) => (
                <tr key={index}>
                  <td className="w-full max-w-0 px-1 py-4 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                    <dl className="font-medium">
                      <dt className="sr-only">Order</dt>
                      <dd className="mt-1 truncate text-[15px] text-gray-700">
                        {order.title}
                      </dd>
                    </dl>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                    {parseInt(order.status) === 1 ? (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                        <svg
                          className="h-1.5 w-1.5 fill-red-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                        Pending Review
                      </span>
                    ) : parseInt(order.status) === 2 ? (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                        <svg
                          className="h-1.5 w-1.5 fill-yellow-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                        Pre-Production
                      </span>
                    ) : parseInt(order.status) === 3 ? (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                        <svg
                          className="h-1.5 w-1.5 fill-green-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                        Processing
                      </span>
                    ) : parseInt(order.status) === 4 ? (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                        <svg
                          className="h-1.5 w-1.5 fill-blue-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                        Completed Design
                      </span>
                    ) : parseInt(order.status) === 5 ? (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                        <svg
                          className="h-1.5 w-1.5 fill-blue-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                        Pick-Up
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                        <svg
                          className="h-1.5 w-1.5 fill-indigo-500"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                        Delivered
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                    {order.total_value}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">
                    {order.date && (
                      <ReactTimeAgo
                        date={Date.parse(order.date)}
                        locale="en-US"
                        className="mr-2 font-bold"
                      />
                    )}
                  </td>
                  <td className="hidden whitespace-nowrap py-4 px-3 text-sm font-medium sm:block">
                    {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' }).replaceAll('/', '.')}

                  </td>


                  <td className="whitespace-nowrap px-3  py-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex">

                      <DropDown
                        onDelete={() =>
                          deleteComfirm({
                            id: order._id,
                            name: order.title,
                          })
                        }

                        onEdit={() => {
                          navigate("/dashboard/orders/edit");
                        }}
                      />
                      <NavLink to={"/dashboard/orders/view"} state={order}>
                        <EyeIcon
                          width={20}
                          height={20}
                          className="ml-2 text-gray-700"
                        />
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end bg-white px-1 py-3 sm:px-4">
        <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-gray-700">
              showing
              <span className="font-medium">
                {total ? (currentPage - 1) * perPage + 1 : 0}
              </span>{" "}
              to
              <span className="font-medium">
                {currentPage === totalPages
                  ? total
                  : total
                    ? currentPage * perPage
                    : 0}
              </span>{" "}
              of <span className="font-medium">{total}</span> results
            </p>
          </div>
          <div>
            <CustomPagination
              totalPage={totalPages}
              currentPage={currentPage}
              onSetPage={onSetPage}
              loadingData={loadingData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
