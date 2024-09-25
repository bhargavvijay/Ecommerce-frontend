import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOdersPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import Logout from './features/auth/components/Logout';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import ProductFormPage from './pages/ProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import StripeCheckout from './pages/StripeCheckout';
import PaymentFailed from './pages/PaymentFailed';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProductReviewPage from './pages/ProductRivewPage';
import EmailVerification from './pages/EmailVerification';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <Protected>
        <AdminOrdersPage></AdminOrdersPage>
      </Protected>
    ),
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage></ResetPasswordPage>,
  },
  {
    path: '/email-verification',
    element: <EmailVerification></EmailVerification>,
  },
  {
    path: '/stripe-checkout/',
    element: (
      <Protected>
        <StripeCheckout></StripeCheckout>
      </Protected>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <ProductFormPage></ProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <ProductFormPage></ProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/product-review/:id',
    element: (
      <Protected>
        <ProductReviewPage></ProductReviewPage>
      </Protected>
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path:'/order-success/:id',
    element:(
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path:'/orders',
    element:(
      <Protected>
              <UserOrdersPage></UserOrdersPage>
      </Protected>
    ),
  },
  {
    path:'/profile',
    element:(
      <Protected>
              <UserProfilePage></UserProfilePage>
      </Protected>
    ),
  },
  {
    path:'/logout',
    element:(
      <Logout></Logout>
    ),
  },
  {
    path:'/forgot-password',
    element:(
      <ForgotPasswordPage></ForgotPasswordPage>
    ),
  },
  
  {
    path:'/payment-failed',
    element:(
      <PaymentFailed></PaymentFailed>

    ),
  },
  {
    path:'*',
    element:(
      <PageNotFound></PageNotFound>
    ),
  },
  
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked=useSelector(selectUserChecked);
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])


  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch, user])

  return (
    <div className="App">
    {userChecked &&
      <RouterProvider router={router} />
    }
    </div>
  );
}

export default App;