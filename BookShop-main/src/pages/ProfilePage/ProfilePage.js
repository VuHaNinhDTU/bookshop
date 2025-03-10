import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { WrapperProfile, AvatarUpload, FormItemWrapper, WrapperContentProfile, WrapperHeader, WrapperUploadFile } from "./style";
import * as UserService from "../../services/UserService";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [form] = Form.useForm(); // Thêm hook Form

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(user.avatar || "");

    // Khi user thay đổi, cập nhật form và avatar
    useEffect(() => {
        form.setFieldsValue({
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
        });
        setAvatar(user.avatar || "");
    }, [user, form]);

    // Xử lý upload avatar
    const handleUpload = async ({ file }) => {
        if (!file.originFileObj) return; // Nếu không có file, thoát luôn

        // Tạo ảnh preview ngay khi tải lên
        const preview = await getBase64(file.originFileObj);
        setAvatar(preview);
    };

    // Xử lý cập nhật thông tin người dùng
    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const updatedUser = {
                ...user, // Giữ lại tất cả thông tin user hiện tại
                ...values, // Cập nhật các giá trị mới
                avatar: avatar || user.avatar, // Giữ lại avatar cũ nếu không có avatar mới
            };

            console.log("Dữ liệu gửi API:", updatedUser);

            const response = await UserService.updateUser(user.id, updatedUser);
            if (response?.status === 'OK') {
                // Cập nhật Redux store với dữ liệu từ response
                dispatch(updateUser({ ...user, ...response.data }));
                message.success("Cập nhật thông tin thành công!");
            } else {
                message.error(response?.message || "Lỗi cập nhật thông tin!");
            }
        } catch (error) {
            console.error("Update error:", error);
            message.error("Lỗi cập nhật, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '1270px', padding: "100px", margin: '0 auto' }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <WrapperContentProfile>
                <WrapperProfile>
                    <h2>Chỉnh sửa thông tin</h2>

                    {/* Upload Avatar */}
                    <AvatarUpload>
                        <WrapperUploadFile onChange={handleUpload} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Tải lên Avatar</Button>
                        </WrapperUploadFile>
                        {avatar && (<img src={avatar} style={{ height: '60px', width: '60px', borderRadius: "50%", objectFit: "cover", marginTop: "10px" }} alt="avatar" />)}
                    </AvatarUpload>

                    {/* Form cập nhật thông tin */}
                    <Form form={form} layout="vertical" onFinish={handleUpdate}>
                        <FormItemWrapper>
                            <Form.Item label="Email" name="email">
                                <Input />
                            </Form.Item>
                        </FormItemWrapper>
                        <FormItemWrapper>
                            <Form.Item label="Số điện thoại" name="phone">
                                <Input />
                            </Form.Item>
                        </FormItemWrapper>
                        <FormItemWrapper>
                            <Form.Item label="Địa chỉ" name="address">
                                <Input />
                            </Form.Item>
                        </FormItemWrapper>
                        <FormItemWrapper>
                            <Form.Item label="Mật khẩu" name="password">
                                <Input.Password
                                    style={{ width: "500px", height: "40px" }}
                                    iconRender={(visible) => visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                />
                            </Form.Item>
                        </FormItemWrapper>

                        <Button style={{ width: "100px", height: "50px", marginTop: "20px" }} type="primary" htmlType="submit" loading={loading}>Lưu</Button>
                    </Form>
                </WrapperProfile>
            </WrapperContentProfile>
        </div>
    );
};

export default ProfilePage;
