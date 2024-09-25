import { Link } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/Components/ProductList";

function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
        </div>
     );
}

export default Home;