import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { StarFilled } from "@ant-design/icons";
import { StyleNameProduct, WrapperPrice, WrapperReporttext } from "./style";
import image4 from '../../assets/images/image4.png';

const CardComponent = (props) => {
    const { name, description, image, price, rating, type, author, id } = props
    const navigate = useNavigate(); // Hook để chuyển trang

    const handleClick = () => {
        console.log('Navigating to product detail with ID:', id);
        navigate(`/product-detail/${id}`);
    };

    const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);

    return (
        <Card
            hoverable
            onClick={handleClick} // Thêm sự kiện click
            style={{
                width: 200, // 4 cards per row with gap
                height: 360,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                margin: '12px',
                borderRadius: '8px',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
            }}
            bodyStyle={{
                padding: '12px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            cover={
                <div style={{
                    height: 220,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f5f5f5',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px',
                    border: '1px solid #02bbff',
                }}>
                    <img
                        alt={name}
                        src={image}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            padding: '8px',
                        }}
                    />
                </div>
            }
        >
            <div>
                <StyleNameProduct>{name}</StyleNameProduct>
                <WrapperReporttext>
                    <span>{author}</span>
                    <span>
                        {rating} <StarFilled style={{ fontSize: '14px', color: '#FFD700' }} />
                    </span>
                </WrapperReporttext>
            </div>
            <WrapperPrice>{formattedPrice}đ</WrapperPrice>
        </Card>
    );
};

export default CardComponent;
