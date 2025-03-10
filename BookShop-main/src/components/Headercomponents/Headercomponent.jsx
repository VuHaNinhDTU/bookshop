import React, { useEffect, useState } from "react";
import {
    WrapperContentPopup,
    WrapperHeader,
    HeaderContainer,
    WrapperTextHeader,
    SearchContainer,
    RightContainer,
    WrapperTextHeaderAccout,
    WrappertextheaderSmall,
    CartContainer
} from "./style";
import { ShoppingCartOutlined, CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import ButtomInputSearch from "../ButtomInputSearch/ButtomInputSearch";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import { Popover } from "antd";
import Loading from "../isLoading";
import { message } from "antd";

const Headercomponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [useAvatar, setUseAvatar] = useState("");

    const isAdminPage = location.pathname.startsWith('/admin');
    const shouldHideSearch = isAdminPage;
    const shouldHideCart = isAdminPage;

    console.log("User state:", user);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedAvatar = localStorage.getItem("avatar");
        if (storedUser) {
            setDisplayName(storedUser.name || storedUser.email || "User");
        }
        if (storedAvatar) {
            setUseAvatar(storedAvatar);
        }
    }, []);

    useEffect(() => {
        if (user?.name) {
            setDisplayName(user.name);
            localStorage.setItem("user", JSON.stringify(user));
        }
        if (user?.avatar) {
            setUseAvatar(user.avatar);
            localStorage.setItem("avatar", user.avatar);
        }
    }, [user, user?.avatar]);

    const handleNavigateLogin = () => {
        navigate('/sign-in');
    };

    const handleNavigateProfile = () => {
        navigate('/profile');
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await UserService.logoutUser();
            dispatch(resetUser());
            localStorage.removeItem("user");
            localStorage.removeItem("avatar");
            localStorage.removeItem("access_token");
            setDisplayName("User");
            setUseAvatar("");
            navigate('/');
        } catch (error) {
            console.error("Logout error:", error);
            message.error("Có lỗi xảy ra khi đăng xuất");
        } finally {
            setLoading(false);
        }
    };

    const content = (
        <div>
            <WrapperContentPopup onClick={handleNavigateProfile}>Thông tin người dùng</WrapperContentPopup>
            <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    return (
        <WrapperHeader style={{ justifyContent: shouldHideSearch && shouldHideCart ? 'space-between' : 'unset' }}>
            <HeaderContainer>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <WrapperTextHeader>BookStore24/7</WrapperTextHeader>
                </Link>

                {!shouldHideSearch && (
                    <SearchContainer>
                        <ButtomInputSearch
                            size="large"
                            bordered={false}
                            placeholder="Nhập từ khóa tìm kiếm"
                            textbotton="Tìm kiếm"
                            style={{ width: '100%' }}
                        />
                    </SearchContainer>
                )}
                <RightContainer>
                    <WrapperTextHeaderAccout>
                        <UserOutlined className="user-icon" />
                        {user?.access_token ? (
                            <Popover content={content} trigger="click">
                                <WrappertextheaderSmall>
                                    <div className="login-text">
                                        {displayName}
                                    </div>
                                </WrappertextheaderSmall>
                            </Popover>
                        ) : (
                            <WrappertextheaderSmall>
                                <div className="login-text" onClick={handleNavigateLogin}>
                                    Đăng nhập/Đăng ký
                                </div>
                                <div className="account-text" style={{ fontSize: '16px' }}>
                                    Tài khoản
                                </div>
                            </WrappertextheaderSmall>
                        )}
                    </WrapperTextHeaderAccout>
                    {!shouldHideCart && (
                        <CartContainer>
                            <Link to="/cart" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                                <ShoppingCartOutlined className="cart-icon" />
                                <span className="cart-text">Giỏ hàng</span>
                                <span className="cart-count">0</span>
                            </Link>
                        </CartContainer>
                    )}
                </RightContainer>
            </HeaderContainer>
        </WrapperHeader>
    );
};

export default Headercomponent;
