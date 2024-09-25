import React from "react";
import ProductDetail from "../features/product/Components/ProductDetail";
import NavBar from "../features/navbar/Navbar";
export default function ProductDetailPage() {
  return (
    <div>
      <NavBar>
        <ProductDetail></ProductDetail>
      </NavBar>
    </div>
  );
}
