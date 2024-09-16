
// Address actions
import { deleteUserAddress } from './address/delete-user-address';
import { getUserAddress } from './address/get-user-address';
import { setUserAddress } from './address/set-user-address';
export { deleteUserAddress, getUserAddress, setUserAddress };

// Auth actions
import { login, authenticate} from './auth/login';
import { logout } from './auth/logout';
import { registerUser} from './auth/register';
export { login, logout, registerUser, authenticate };

// Categories actions
import { getCategories } from './categories/get-categories';
export { getCategories };

// Country actions
import { getCountries} from './country/get-country';
export {getCountries };

// Order actions
import { getOrderById } from './order/get-order-by-id';
import { getOrdersByUser } from './order/get-orders-by-user';
import { getPaginatedOrders } from './order/get-paginated-orders';
import { placeOrder } from './order/place-order';
export { getOrderById, getOrdersByUser, getPaginatedOrders, placeOrder };

// Payments actions
import { paypalCheckPayment } from './payments/paypal-check-payment';
import { setTransactionId } from './payments/set-transaction-id';
export { paypalCheckPayment, setTransactionId };

// Product actions
import { deleteProductImage } from './product/delete-product-image';
import { getProductBySlug } from './product/get-product-by-slug';
import { getStockBySlug } from './product/get-stock-by-slug';
import { getpaginatedProducstWithImages } from './product/product-pagination';
import { createUpdateProduct } from './product/create-update-product';
export { deleteProductImage, getProductBySlug, getStockBySlug, getpaginatedProducstWithImages, createUpdateProduct };

// User actions
import { getPaginatedUsers } from './user/get-paginated-users';
import { changeUserRole } from './user/change-user-role';
export { getPaginatedUsers, changeUserRole };
