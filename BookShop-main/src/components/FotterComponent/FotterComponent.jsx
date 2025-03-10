import React from "react";
import {
    FooterContainer, FooterTop, FooterBottom, Column, Title, List, ListItem, SocialLinks, SocialLink,
} from "./style";

const FotterComponent = () => {
    return (
        <>
            <div>

                <div style={{
                    height: "70px",
                    lineHeight: "70px",
                    backgroundColor: "#38bbff",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#fff"
                }}>
                    <a href="/" style={{ textDecoration: "none", color: "white" }}>BookStore24/7</a> - Tri thức muôn nơi
                </div>
                <FooterContainer>
                    <FooterTop>
                        <Column>
                            <Title>SÀN SÁCH TRỰC TUYẾN QUỐC GIA BookStore42/7.vn</Title>
                        </Column>

                        <Column>
                            <Title>Quản lý tài khoản</Title>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <a href="/sign-in" style={{ textDecoration: "none", fontSize: "18px", color: "#333" }}>
                                    Tạo tài khoản
                                </a>
                                <a href="/sign-up" style={{ textDecoration: "none", fontSize: "18px", color: "#333" }}>
                                    Đăng nhập
                                </a>
                            </div>
                        </Column>

                        <Column>
                            <Title>Hỗ trợ</Title>
                            <List>
                                <ListItem>Quy định mua hàng</ListItem>
                                <ListItem>Hướng dẫn thanh toán</ListItem>
                                <ListItem>Phương thức vận chuyển</ListItem>
                                <ListItem>Câu hỏi thường gặp</ListItem>
                                <ListItem>Chính sách bảo mật</ListItem>
                            </List>
                        </Column>

                        <Column>
                            <Title>Giới thiệu</Title>
                            <List>
                                <ListItem>Sơ đồ site</ListItem>
                                <ListItem>Liên hệ</ListItem>
                            </List>
                            <p>📞 Hotline: 0.999.999.999</p>
                            <p>👁️ Lượt truy cập: 6.892.340</p>
                        </Column>
                    </FooterTop>

                    <FooterBottom>
                        <Title>ĐỊA CHỈ CỦA SÀN TẠI CÁC MẠNG XÃ HỘI</Title>
                        <SocialLinks>
                            <SocialLink href="#">Facebook</SocialLink>
                            <SocialLink href="#">Twitter</SocialLink>
                            <SocialLink href="#">Youtube</SocialLink>
                        </SocialLinks>
                    </FooterBottom>
                </FooterContainer>
            </div>

        </>
    );
};

export default FotterComponent;
