import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import * as message from '../MessageComponent/Message';
import { useNavigate } from 'react-router-dom';
import {
    WrapperStyleHeader,
    WrapperLeft,
    WrapperListProduct,
    WrapperItemProduct,
    WrapperPriceProduct,
    WrapperCountProduct,
    WrapperRight,
    WrapperInfo,
    WrapperTotal,
    CustomButton
} from './style';

const ShoppingCartComponent = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(cart);
            calculateTotals(cart);
        } catch (error) {
            console.error('Error loading cart:', error);
            message.error('Không thể tải giỏ hàng');
        }
    };

    const calculateTotals = (items) => {
        const totals = items.reduce((acc, item) => ({
            price: acc.price + (item.price * item.quantity),
            quantity: acc.quantity + item.quantity
        }), { price: 0, quantity: 0 });

        setTotalPrice(totals.price);
        setTotalQuantity(totals.quantity);
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        try {
            const updatedCart = cartItems.map(item => {
                if (item.id === productId) {
                    // Kiểm tra số lượng tồn kho
                    if (newQuantity > item.countInStock) {
                        message.warning(`Chỉ còn ${item.countInStock} sản phẩm trong kho`);
                        return { ...item, quantity: item.countInStock };
                    }
                    if (newQuantity < 1) {
                        message.warning('Số lượng tối thiểu là 1');
                        return { ...item, quantity: 1 };
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });

            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            calculateTotals(updatedCart);
        } catch (error) {
            console.error('Error updating quantity:', error);
            message.error('Không thể cập nhật số lượng');
        }
    };

    const handleRemoveItem = (productId) => {
        try {
            const updatedCart = cartItems.filter(item => item.id !== productId);
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            calculateTotals(updatedCart);
            message.success('Đã xóa sản phẩm khỏi giỏ hàng');
        } catch (error) {
            console.error('Error removing item:', error);
            message.error('Không thể xóa sản phẩm');
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product-detail/${productId}`);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            message.warning('Giỏ hàng trống');
            return;
        }
        // Thay thế message.info bằng message.warning
        message.warning('Tính năng thanh toán đang được phát triển');
    };

    return (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', margin: '20px auto', maxWidth: '1200px' }}>
            <WrapperStyleHeader>
                <h2>Giỏ hàng của bạn ({totalQuantity} sản phẩm)</h2>
            </WrapperStyleHeader>

            <Row gutter={[16, 16]}>
                <Col span={16}>
                    <WrapperLeft>
                        <WrapperListProduct>
                            {cartItems.map((item) => (
                                <WrapperItemProduct key={item.id}>
                                    <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            preview={false}
                                            style={{ width: '120px', height: '120px', objectFit: 'contain', cursor: 'pointer' }}
                                            onClick={() => handleProductClick(item.id)}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{
                                                fontSize: '16px',
                                                marginBottom: '8px',
                                                cursor: 'pointer'
                                            }} onClick={() => handleProductClick(item.id)}>
                                                {item.name}
                                            </h3>
                                            <p style={{ color: '#666', marginBottom: '4px' }}>Tác giả: {item.author}</p>
                                            <p style={{ color: '#666', marginBottom: '4px' }}>Loại: {item.type}</p>
                                            <WrapperPriceProduct>{item.price?.toLocaleString()} đ</WrapperPriceProduct>
                                        </div>
                                    </div>

                                    <WrapperCountProduct>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                border: '1px solid #ccc',
                                                backgroundColor: '#fff',
                                                cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                                                opacity: item.quantity <= 1 ? 0.5 : 1
                                            }}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span style={{
                                            width: '40px',
                                            textAlign: 'center',
                                            userSelect: 'none'
                                        }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                border: '1px solid #ccc',
                                                backgroundColor: '#fff',
                                                cursor: item.quantity >= item.countInStock ? 'not-allowed' : 'pointer',
                                                opacity: item.quantity >= item.countInStock ? 0.5 : 1
                                            }}
                                            disabled={item.quantity >= item.countInStock}
                                        >
                                            +
                                        </button>
                                        <DeleteOutlined
                                            style={{
                                                fontSize: '20px',
                                                color: '#ff4d4f',
                                                cursor: 'pointer',
                                                marginLeft: '15px'
                                            }}
                                            onClick={() => handleRemoveItem(item.id)}
                                        />
                                    </WrapperCountProduct>
                                </WrapperItemProduct>
                            ))}

                            {cartItems.length === 0 && (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px 20px',
                                    color: '#666'
                                }}>
                                    Giỏ hàng trống
                                </div>
                            )}
                        </WrapperListProduct>
                    </WrapperLeft>
                </Col>

                <Col span={8}>
                    <WrapperRight>
                        <WrapperInfo>
                            <div style={{ marginBottom: '20px' }}>
                                <h3>Thông tin đơn hàng</h3>
                            </div>
                            <WrapperTotal>
                                <span>Tạm tính ({totalQuantity} sản phẩm):</span>
                                <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                                    {totalPrice.toLocaleString()} đ
                                </span>
                            </WrapperTotal>
                            <WrapperTotal>
                                <span>Phí vận chuyển:</span>
                                <span style={{ color: '#52c41a' }}>Miễn phí</span>
                            </WrapperTotal>
                            <div style={{ margin: '15px 0', border: '1px solid #f0f0f0' }} />
                            <WrapperTotal>
                                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Tổng tiền:</span>
                                <span style={{
                                    color: '#ff4d4f',
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>
                                    {totalPrice.toLocaleString()} đ
                                </span>
                            </WrapperTotal>
                            <CustomButton
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    background: cartItems.length === 0 ? '#ccc' : '#ff4d4f',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    marginTop: '20px',
                                    cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Thanh toán
                            </CustomButton>
                        </WrapperInfo>
                    </WrapperRight>
                </Col>
            </Row>
        </div>
    );
};

export default ShoppingCartComponent;
