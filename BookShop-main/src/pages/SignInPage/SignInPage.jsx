import React, { useEffect, useState } from "react";
import {
    Wrapper,
    FormContainer,
    InputField,
    Button,
    CheckboxContainer,
    RegisterText,
} from "../../pages/SignInPage/Style";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hook/useMutationHooks";
import Loading from "../../components/isLoading";
import { Spin } from "antd";
import * as message from "../../components/MessageComponent/Message";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    );

    const { data, isLoading, isSuccess, isError } = mutation;

 // Sửa đoạn code lưu token trong useEffect
useEffect(() => {
    if (data?.status === 'ERR') {
        // Hiển thị thông báo lỗi từ API
        message.error(data?.message || "Email hoặc mật khẩu không chính xác");
        return;
    }

    if (isSuccess && data?.access_token) {
        try {
            const decoded = jwtDecode(data?.access_token);
            if (decoded?.id) {
                // Lưu token dưới dạng string thông thường, không phải JSON string
                localStorage.setItem('access_token', data?.access_token);
                handleGetDetailUser(decoded?.id, data?.access_token);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            message.error("Có lỗi xảy ra khi xử lý thông tin đăng nhập");
        }
    }
}, [isSuccess, data]);

    const handleGetDetailUser = async (id, token) => {
        try {
            const res = await UserService.getDetailUser(id, token);
            if (res?.data) {
                dispatch(updateUser({ ...res?.data, access_token: token }));
                message.success("Đăng nhập thành công"); // Di chuyển thông báo thành công đến đây
                // Chuyển hướng dựa vào vai trò người dùng
                if (res?.data?.isAdmin) {
                    navigate('/system/admin');
                } else {
                    navigate('/');
                }
            } else {
                throw new Error("Không thể lấy thông tin người dùng");
            }
        } catch (error) {
            console.error("Error getting user details:", error);
            message.error("Có lỗi xảy ra khi lấy thông tin người dùng");
        }
    };

    const validateForm = () => {
        if (!formData.email?.trim()) {
            message.warning("Vui lòng nhập email");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            message.warning("Email không hợp lệ");
            return false;
        }
        if (!formData.password?.trim()) {
            message.warning("Vui lòng nhập mật khẩu");
            return false;
        }
        if (formData.password.length < 6) {
            message.warning("Mật khẩu phải có ít nhất 6 ký tự");
            return false;
        }
        return true;
    };

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value || "",
        }));
        setErrorMessage("");
    };

    const handleSignin = (e) => {
        e.preventDefault();
        if (validateForm()) {
            mutation.mutate({
                email: formData.email,
                password: formData.password,
            });
        }
    };

    return (
        <Wrapper>
            <FormContainer>
                <h2>Đăng nhập</h2>

                <InputField
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleOnChange}
                />

                <div style={{ position: "relative", width: "100%" }}>
                    <InputField
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleOnChange}
                        style={{ width: "100%" }}
                    />
                    <span
                        onClick={() => setPasswordVisible(!isPasswordVisible)}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#888",
                        }}
                    >
                        {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </span>
                </div>

                <form onSubmit={handleSignin}>
                    <Button
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Spin size="small" /> : "Đăng nhập"}
                    </Button>
                </form>

                <CheckboxContainer>
                    <div>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Ghi nhớ</label>
                    </div>
                    <div style={{ cursor: "pointer" }}>Quên mật khẩu</div>
                </CheckboxContainer>

                <p style={{ fontSize: "16px" }}>
                    Bạn chưa có tài khoản?
                    <RegisterText onClick={() => navigate("/sign-up")}>
                        Đăng ký tài khoản
                    </RegisterText>
                </p>
            </FormContainer>
        </Wrapper>
    );
};

export default SignInPage;
