import { useState, useEffect } from "react";
import { StarIcon, DeviceTabletIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
  updateProductAsync,
} from "../productSlice";
import { useParams } from "react-router-dom";
import {
  addToCartAsync,
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { discountedPrice } from "../../../app/constants";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();

  let nr;
  let n1 = 0;
  let n2 = 0;
  let n3 = 0;
  let n4 = 0;
  let n5 = 0;
  if (product) {
    nr = product.reviewDetails.length;
    product.reviewDetails.map((entry) => {
      if (entry.rating == 1) {
        n1 = n1 + 1;
      } else if (entry.rating == 2) {
        n2 = n2 + 1;
      } else if (entry.rating == 3) {
        n3 = n3 + 1;
      } else if (entry.rating == 4) {
        n4 = n4 + 1;
      } else if (entry.rating == 5) {
        n5 = n5 + 1;
      }
    });
  }
  
  let pn1 = (n1 / nr) * 100;
  let pn2 = (n2 / nr) * 100;
  let pn3 = (n3 / nr) * 100;
  let pn4 = (n4 / nr) * 100;
  let pn5 = (n5 / nr) * 100;
  
  // Rounding to two decimal places
  pn1 = pn1.toFixed(2);
  pn2 = pn2.toFixed(2);
  pn3 = pn3.toFixed(2);
  pn4 = pn4.toFixed(2);
  pn5 = pn5.toFixed(2);

  let item = null;
  items.map((i) => {
    if (i.product.id == product.id) {
      item = i;
    }
  });
  const handleCart = (e) => {
    e.preventDefault();
    const newItem = {
      product: product.id,
      quantity: 1,
    };
    if (product.colors && product.colors.length > 0 && selectedColor === null) {
      alert("select color ");
      return;
    }

    if (product.sizes && product.sizes.length > 0 && selectedSize === null) {
      alert("select size");
      return;
    }

    if (selectedColor) {
      newItem.color = selectedColor;
    }
    if (selectedSize) {
      newItem.size = selectedSize;
    }

    dispatch(addToCartAsync(newItem));
    // TODO: it will be based on server response of backend
  };
  let count = 0;
  const handleMinus = (e) => {
    e.preventDefault();
    if (item.quantity === 1) {
      dispatch(deleteItemFromCartAsync(item.id));
    } else {
      dispatch(updateCartAsync({ id: item.id, quantity: item.quantity - 1 }));
    }
  };
  let pr;
  if(product){
    pr=product.rating
  pr=Math.round(pr*100)/100;
  }
  const handlePlus = (e) => {
    e.preventDefault();
    if (item.quantity == item.product.stock) {
      alert(`only ${item.quantity} are availabe in stock`);
    } else {
      dispatch(updateCartAsync({ id: item.id, quantity: item.quantity + 1 }));
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[1]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                <img
                  src={product.images[2]}
                  alt={product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                src={product.images[3]}
                alt={product.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl line-through tracking-tight text-gray-900">
                ${product.price}
              </p>
              <p className="text-3xl tracking-tight text-gray-900">
                {Math.round(product.discountPrice)}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{pr} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedClass,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                "h-8 w-8 rounded-full border border-black border-opacity-10"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            disabled={!size.inStock}
                            className={({ active }) =>
                              classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
                                {size.inStock ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-indigo-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
                {item == null ? (<>
                  {product.stock!=0?
                  <button
                    onClick={handleCart}
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                  :<p className="text-red-500 underline">Product Out of Stock</p>}</>) : (
                  <div className="flex flex-col items-center mt-10">
                    <div className="flex items-center">
                      <button
                        onClick={(e) => handleMinus(e)}
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
                        onClick={(e) => handlePlus(e)}
                        className="bg-indigo-500 text-white rounded py-2 px-4"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              {product.highlights && product.highlights.length != 0 && (
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights.map((highlight) =>
                        highlight != null ? (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
                <>
                  <h2 className="text-sm mt-10 font-medium text-gray-900">
                    Rating Summary
                  </h2>
                  {product && product.reviewDetails.length > 0 ? (
                    <>
                      <div className="flex items-center mb-2">
                        <svg
                          className={
                            product.rating >= 1
                              ? "w-4 h-4 text-yellow-300 me-1"
                              : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          }
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={
                            product.rating >= 2
                              ? "w-4 h-4 text-yellow-300 me-1"
                              : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          }
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={
                            product.rating >= 3
                              ? "w-4 h-4 text-yellow-300 me-1"
                              : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          }
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={
                            product.rating >= 4
                              ? "w-4 h-4 text-yellow-300 me-1"
                              : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          }
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className={
                            product.rating >= 5
                              ? "w-4 h-4 text-yellow-300 me-1"
                              : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                          }
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          {pr}
                        </p>
                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          out of
                        </p>
                        <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          5
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {nr} global ratings
                      </p>
                      <div className="flex items-center mt-4">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          5 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                          <div
                            className="h-5 bg-yellow-300 rounded"
                            style={{ width: `${Math.round(pn5)}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {pn5}%
                        </span>
                      </div>
                      <div className="flex items-center mt-4">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          4 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                          <div
                            className="h-5 bg-yellow-300 rounded"
                            style={{ width: `${Math.round(pn4)}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {pn4}%
                        </span>
                      </div>
                      <div className="flex items-center mt-4">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          3 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                          <div
                            className="h-5 bg-yellow-300 rounded"
                            style={{ width: `${Math.round(pn3)}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {pn3}%
                        </span>
                      </div>
                      <div className="flex items-center mt-4">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          2 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                          <div
                            className="h-5 bg-yellow-300 rounded"
                            style={{ width: `${Math.round(pn2)}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {pn2}%
                        </span>
                      </div>
                      <div className="flex items-center mt-4">
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          1 star
                        </a>
                        <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                          <div
                            className="h-5 bg-yellow-300 rounded"
                            style={{ width: `${Math.round(pn1 )}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {pn1}%
                        </span>
                      </div>

                      <div className="mt-10 md:w-5/5 w-4/4 flex flex-col gap-2 bg-white-800 text-white">
                        <h1 className="py-5 text-black">Reviews</h1>
                        {/* Tags */}
                        {/* Item Container */}
                        <div className="flex flex-col gap-3 mt-0">
                          {product && product.reviewDetails.length > 0 ? (
                            product.reviewDetails.map((reviewDetail) => (
                              <div
                                key={reviewDetail.id}
                                className="flex flex-col gap-4 bg-gray-700 p-4"
                              >
                                <div className="flex">
                                  <div className="h-10 w-10 flex-shrink-0 inline-block overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={reviewDetail.user.profileImage}
                                      alt={reviewDetail.user.email}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <span className="mx-5 text-white-700">
                                    {reviewDetail.user.email}
                                  </span>
                                  <div className="flex items-center mb-2">
                                    <svg
                                      className={
                                        reviewDetail.rating >= 1
                                          ? "w-4 h-4 text-yellow-300 me-1"
                                          : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                                      }
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                      className={
                                        reviewDetail.rating >= 2
                                          ? "w-4 h-4 text-yellow-300 me-1"
                                          : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                                      }
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                      className={
                                        reviewDetail.rating >= 3
                                          ? "w-4 h-4 text-yellow-300 me-1"
                                          : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                                      }
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                      className={
                                        reviewDetail.rating >= 4
                                          ? "w-4 h-4 text-yellow-300 me-1"
                                          : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                                      }
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg
                                      className={
                                        reviewDetail.rating >= 5
                                          ? "w-4 h-4 text-yellow-300 me-1"
                                          : "w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                                      }
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    
                                  </div>
                                </div>
                                <div>
                                  {reviewDetail.review}
                                </div>
                                <div className="flex justify-between">
                                  <span>{reviewDetail.time}</span>
                                  
                                </div>
                              </div>
                            ))
                          ) : (
                            
<p className="text-grey-100">No reviews Yet</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
<p className="text-gray-10">No reviews Yet</p>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
