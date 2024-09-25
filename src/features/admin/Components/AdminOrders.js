import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
  EyeIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { discountedPrice } from "../../../app/constants";
import { Pagination } from "../../common/Pagination";
import { updateOrderAsync } from "../../order/orderSlice";
export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [showOrder, setShowOrder] = useState(null);
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});
  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = (order) => {
    setShowOrder((prevOrder) => (prevOrder === order ? null : order));
  };
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handlePage = (pageNo) => {
    setPage(pageNo);
  };

  const handleSort = (sortDetails) => {
    let newSort = {};
    if (sortDetails.order === "asc") {
      newSort["_sort"] = sortDetails.sort;
      newSort["order"] = "asc";
    } else {
      newSort["_sort"] = `-${sortDetails.sort}`;
      newSort["order"] = "desc";
    }
    setSort(newSort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;

  return (
    <>
      {/* component */}

      <div style={{ overflowX: "auto" }}>
        {!showOrder && (
          <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full ">
              <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Order id</th>
                      <th className="py-3 px-6 text-left">Items</th>
                      <th
                        className="py-3 px-6 text-center cursor-pointer"
                        onClick={(e) => {
                          handleSort({
                            sort: "totalAmount",
                            order: sort.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      >
                        Amount
                        {sort["_sort"] === "totalAmount" && (
                          <>
                            {sort.order === "asc" ? (
                              <ArrowDownIcon className="w-4 h-4 inline-block ml-1" />
                            ) : (
                              <ArrowUpIcon className="w-4 h-4 inline-block ml-1" />
                            )}
                          </>
                        )}
                      </th>
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Payment</th>
                      <th
                        className="py-3 px-6 text-center"
                        onClick={(e) => {
                          handleSort({
                            sort: "createdAt",
                            order: sort.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      >
                        Order Time
                        {sort["_sort"] === "createdAt" && (
                          <>
                            {sort.order === "asc" ? (
                              <ArrowDownIcon className="w-4 h-4 inline-block ml-1" />
                            ) : (
                              <ArrowUpIcon className="w-4 h-4 inline-block ml-1" />
                            )}
                          </>
                        )}
                      </th>
                      <th
                        className="py-3 px-6 text-center"
                        onClick={(e) => {
                          handleSort({
                            sort: "updatedAt",
                            order: sort.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      >
                        Last Updated
                        {sort["_sort"] === "updatedAt" && (
                          <>
                            {sort.order === "asc" ? (
                              <ArrowDownIcon className="w-4 h-4 inline-block ml-1" />
                            ) : (
                              <ArrowUpIcon className="w-4 h-4 inline-block ml-1" />
                            )}
                          </>
                        )}
                      </th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders.slice(startIndex, endIndex).map((order) => (
                      <tr
                        onClick={() => {}}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-size: 0.75rem;">
                              {order.id}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          {order.items.map((item) => (
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={item.product.thumbnail}
                                />
                              </div>
                              <span>
                                {item.product.title} - #{item.quantity} -
                                {discountedPrice(item.product)}
                              </span>
                            </div>
                          ))}
                        </td>
                        {/*order address */}

                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            ${order.totalAmount}
                          </div>
                        </td>
                        {/*order address */}
                        <td className="py-3 px-6 text-center">
                          <div className="">
                            <div>
                              <strong>{order.address["full-name"]}</strong>,
                            </div>
                            <div>{order.address.street},</div>
                            <div>{order.address.city}, </div>
                            <div>{order.address.state}, </div>
                            <div>{order.address["postal-code"]}, </div>
                            <div>{order.address.phone}, </div>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          {order.id === editableOrderId ? (
                            <select onChange={(e) => handleUpdate(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2"></div>
                            <span className="font-medium">
                              {order.paymentMethod}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleString()
                              : null}
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            {order.updatedAt
                              ? new Date(order.updatedAt).toLocaleString()
                              : null}
                          </div>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-6 ml-2 mr-4 transform hover:text-purple-500 hover:scale-120">
                              <EyeIcon
                                className="w-4 h-4"
                                onClick={(e) => handleShow(order)}
                              ></EyeIcon>
                            </div>
                            <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                              <PencilIcon
                                className="w-4 h-4"
                                onClick={(e) => handleEdit(order)}
                              ></PencilIcon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                handlePage={handlePage}
                page={page}
                setPage={setPage}
                totalItems={orders.length}
              ></Pagination>
            </div>
          </div>
        )}
        {showOrder && (
          <div>
            <div className="mt-8 flex ">
              <button
                onClick={() => setShowOrder(null)}
                className="inline-flex  px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <ArrowLeftIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Go back to Orders
              </button>
            </div>{" "}
            <div>
              <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                    Order # {showOrder.id}
                  </h1>
                  <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    Order Status : {showOrder.status}
                  </h3>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {showOrder.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.href}>{item.title}</a>
                                </h3>
                                <p className="ml-4">${discountedPrice(item)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>

                              <div className="flex"></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {showOrder.totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p>{showOrder.totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping Address :
                  </p>
                  <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {showOrder.address["full-name"]}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {showOrder.address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {showOrder.address["postal-code"]}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {showOrder.address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {showOrder.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
