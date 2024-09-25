import React from "react";
import NavBar from "../features/navbar/Navbar";
import ProductForm from "../features/admin/Components/ProductForm";
export default function ProductFormPage() {
  return (
    <div>
      <NavBar>
        <ProductForm></ProductForm>
      </NavBar>
    </div>
  );
}
