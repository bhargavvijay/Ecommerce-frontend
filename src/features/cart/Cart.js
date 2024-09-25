import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);

  function totalPrice() {
    let totalPrice = 0;
    items.map((item) => {
      totalPrice = totalPrice + discountedPrice(item.product) * item.quantity;
    });
    return totalPrice;
  }
  function totalItems() {
    let totalItems = 0;
    items.map((item) => {
      totalItems = totalItems + item.quantity;
    });
    return totalItems;
  }

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleDelete = (e, item) => {
    dispatch(deleteItemFromCartAsync(item.id));
  };

    const handleMinus = (e, item) => {
      e.preventDefault();
      if (item.quantity === 1) {
        dispatch(deleteItemFromCartAsync(item.id));
      } else
        dispatch(updateCartAsync({ id: item.id, quantity: item.quantity - 1 }));
    };
    const handlePlus = (e, item) => {
      e.preventDefault();
      if (item.quantity < item.product.stock)
        dispatch(updateCartAsync({ id: item.id, quantity: item.quantity + 1 }));
    };

  return (
    <>
      {cartLoaded && items.length <= 0 && (
        <Navigate to="/" replace={true}></Navigate>
      )}
      <div className="mx-auto max-w-4xl mt-12 bg-white px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">
                          <span className="line-through block text-gray-400">
                            {item.product.price}
                          </span>
                          {Math.round(item.product.discountPrice)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <label
                        htmlFor="quantity"
                        className="inline text-sm font-medium leading-6 text-gray-900"
                        style={{ marginRight: "0.5rem" }}
                      >
                        Qty
                      </label>
                      {/* <select 
                      onChange={(e)=>{handleQuantity(e,item)}}
                      value={item.quantity}

                      className="inline mr-2">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="3">4</option>
                        <option value="4">5</option>

                      </select> */}
                      <div className="flex items-center mt-10">
                        <button
                          onClick={(e) => handleMinus(e, item)}
                          className="bg-indigo-500 text-white rounded py-2 px-4"
                        >
                          {item.quantity == 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          ) : (
                            <>-</>
                          )}
                        </button>
                        <p className="mx-4">{item.quantity}</p>
                        <button
                          onClick={(e) => handlePlus(e, item)}
                          className="bg-indigo-500 text-white rounded py-2 px-4"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={(e) => handleDelete(e, item)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrice()}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items in cart</p>
            <p>{totalItems()} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>

          <div className="mt-6">
            <Link to="/checkout">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
