import React from "react";
import AdminProductDetail from "../features/admin/Components/AdminProductDetail";
import NavBar from "../features/navbar/Navbar";
export default function AdminProductDetailPage() {
  return (
    <div>
      <NavBar>
        <AdminProductDetail></AdminProductDetail>
      </NavBar>
    </div>
  );
}
