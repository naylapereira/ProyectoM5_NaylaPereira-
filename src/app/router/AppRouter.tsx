import { Route, Routes } from "react-router-dom";
import AdminRoute from "../../features/auth/components/AdminRoute";
import ProtectedRoute from "../../features/auth/components/ProtectedRoute";
import AdminLayout from "../../layouts/AdminLayout";
import CustomerLayout from "../../layouts/CustomerLayout";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import NotFoundPage from "../../pages/NotFoundPage";
import RegisterPage from "../../pages/RegisterPage";
import AdminPage from "../../pages/AdminPage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import CartPage from "../../pages/CartPage";
import CheckoutPage from "../../pages/CheckoutPage";
import OrderDetailPage from "../../pages/OrderDetailPage";
import OrdersPage from "../../pages/OrdersPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<CustomerLayout />}>
          <Route
            path="/"
            element={<HomePage />}
          />
          
          <Route
            path="/products/:productId"
            element={<ProductDetailPage />}
          />

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/orders/:orderId"
            element={<OrderDetailPage />}
          />

          <Route
            path="/orders"
            element={<OrdersPage />}
          />
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;