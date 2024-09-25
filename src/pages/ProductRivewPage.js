import React from "react";
import NavBar from "../features/navbar/Navbar";
import ProductReview from "../features/product/Components/ProductReview";
export default function UserOrdersPage() {
  return (
    <div>
      <NavBar>
        <ProductReview></ProductReview>
      </NavBar>
    </div>
  );
}
