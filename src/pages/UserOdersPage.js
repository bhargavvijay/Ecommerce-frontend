import React from "react";
import ProductDetail from "../features/product/Components/ProductDetail";
import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/Components/UserOrders";
export default function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <h1 className="mx-auto text-2xl">My Orders</h1>
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  );
}
