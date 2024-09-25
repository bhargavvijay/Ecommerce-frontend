import NavBar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/Components/AdminProductList";
import AdminOrders from "../features/admin/Components/AdminOrders";
function AdminOrdersPage() {
    return ( 
        <div>
            <NavBar>
                <AdminOrders></AdminOrders>
            </NavBar>
        </div>
     );
}

export default AdminOrdersPage;