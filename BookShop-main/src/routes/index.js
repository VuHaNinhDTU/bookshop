import AdminPage from '../pages/AdminPage/AdminPage'
import CartPage from '../pages/CartPage/CartPage'
import ForgotPassPage from '../pages/ForgotPassPage/ForgotPassPage'
import Homepage from '../pages/Homepage/Homepage'
import Notfoundspage from '../pages/NotFoundspage/NotFoundspage'
import Orderpage from '../pages/Orderpage/orderpage'
import ProducDetailPage from '../pages/ProductDetailPage/ProductDetailPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import SignInPage from '../pages/SignInPage/SignInPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import TypeProductpage from '../pages/TypeProductpage/TypeProductpage'

export const routes = [
    {
        path: '/',
        page: Homepage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: Orderpage,
        isShowHeader: true
    },
    {
        path: '/typeproduct/:type',
        page: TypeProductpage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/forgot-password',
        page: ForgotPassPage,
        isShowHeader: false
    },
    {
        path: '/product-detail/:id',
        page: ProducDetailPage,
        isShowHeader: true
    },
    {
        path: '/Cart',
        page: CartPage,
        isShowHeader: true
    },
    {
        path: '/profile',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: Notfoundspage
    }
]
