import React, { useEffect, useState } from "react";
import {
    Wrapper,
    FormContainer,
    InputField,
    Button,
    Label,
    Required,
    RegisterText,
} from "./style";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import { useMutation } from "@tanstack/react-query";
import * as message from "../../components/MessageComponent/Message"

const SignUpPage = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data) => UserService.signupUser(data),
        onSuccess: (data) => {
            if (data?.status === 'OK') {
                message.success(data?.message || "Đăng ký tài khoản thành công");
                setTimeout(() => {
                    navigate("/sign-in");
                }, 1000);
            } else {
                message.error(data?.message || "Đăng ký thất bại");
            }
        },
        onError: (error) => {
            console.error("Signup error:", error);
            message.error(error?.response?.data?.message || "Có lỗi xảy ra khi đăng ký");
        }
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: ""
    });
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value || "",
        }));
    };

    const handleNavigateSignin = () => {
        navigate("/sign-in");
    };

    const validateForm = () => {
        if (!formData.name?.trim()) {
            message.warning("Vui lòng nhập họ và tên");
            return false;
        }
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
        if (!formData.confirmPassword?.trim()) {
            message.warning("Vui lòng nhập lại mật khẩu");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            message.warning("Mật khẩu nhập lại không khớp");
            return false;
        }
        if (!formData.address?.trim()) {
            message.warning("Vui lòng nhập địa chỉ");
            return false;
        }
        return true;
    };

    const handleSignup = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        if (validateForm()) {
            console.log('Form validated successfully');
            const signupData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
                address: formData.address,
                phone: formData.phone || undefined
            };
            console.log('Sending signup data:', signupData);
            mutation.mutate(signupData);
        } else {
            console.log('Form validation failed');
        }
    };

    return (
        <Wrapper>
            <FormContainer>
                <h2>Đăng ký tài khoản</h2>
                <form onSubmit={handleSignup}>
                    <Label>Họ và tên <Required>(*)</Required></Label>
                    <InputField
                        type="text"
                        name="name"
                        placeholder="Nhập họ và tên"
                        value={formData.name}
                        onChange={handleOnChange}
                    />

                    <Label>Email (Tên đăng nhập) <Required>(*)</Required></Label>
                    <InputField
                        type="text"
                        name="email"
                        placeholder="Nhập Email"
                        value={formData.email}
                        onChange={handleOnChange}
                    />

                    <Label>Mật khẩu <Required>(*)</Required></Label>
                    <div style={{ position: "relative", width: "100%" }}>
                        <InputField
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={formData.password}
                            onChange={handleOnChange}
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

                    <Label>Nhập lại mật khẩu <Required>(*)</Required></Label>
                    <div style={{ position: "relative", width: "100%" }}>
                        <InputField
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                        />
                        <span
                            onClick={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
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
                            {isConfirmPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>
                    </div>

                    <Label>Địa chỉ <Required>(*)</Required></Label>
                    <InputField
                        type="text"
                        name="address"
                        placeholder="Nhập địa chỉ của bạn"
                        value={formData.address}
                        onChange={handleOnChange}
                    />

                    <Label>Số điện thoại</Label>
                    <InputField
                        type="text"
                        name="phone"
                        placeholder="Nhập số điện thoại (không bắt buộc)"
                        value={formData.phone}
                        onChange={handleOnChange}
                    />

                    {mutation.error?.response?.data?.message && (
                        <p style={{ color: "red", fontSize: "14px", margin: "4px 0" }}>
                            {mutation.error.response.data.message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Đang xử lý..." : "Đăng ký tài khoản"}
                    </Button>
                </form>

                <p style={{ fontSize: "16px", marginTop: "16px" }}>
                    Bạn đã có tài khoản?
                    <RegisterText onClick={handleNavigateSignin}>
                        Đăng nhập
                    </RegisterText>
                </p>
            </FormContainer>
        </Wrapper>
    );
};

export default SignUpPage;
