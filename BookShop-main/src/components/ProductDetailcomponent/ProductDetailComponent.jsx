import { Col, Row } from "antd";
import {
    WrapperContainer,
    WrapperStyleBoldText,
    WrapperStyleImage,
    WrapperStyleNameAuthor,
    WrapperStyleNameProduct,
    WrapperStyleNamePublic,
    WrapperStylePrice,
    buttonStyle,
    quantityStyle,
    buyNowStyle,
    addToCartStyle
} from "./style";
import { StarFilled } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../redux/slides/cartSlide';
import * as ProductService from '../../services/ProductService';
import Loading from '../LoadingComponent/Loading';
import * as message from '../MessageComponent/Message';

const ProductDetailComponent = () => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    // Hàm lấy số lượng từ giỏ hàng
    const getCartQuantity = (productId) => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const item = cart.find(item => item.id === productId);
            return item ? item.quantity : 1;
        } catch (error) {
            console.error('Error getting cart quantity:', error);
            return 1;
        }
    };

    useEffect(() => {
        if (id) fetchProductDetail();
    }, [id]);

    const fetchProductDetail = async () => {
        setLoading(true);
        try {
            const response = await ProductService.getDetailsProduct(id);
            if (response?.status === 'ok' && response?.data) {
                setProduct(response.data);
                // Đồng bộ số lượng với giỏ hàng
                setQuantity(getCartQuantity(response.data._id));
            } else {
                message.error('Không thể tải thông tin sản phẩm.');
            }
        } catch (error) {
            message.error('Lỗi khi tải sản phẩm: ' + (error.message || 'Lỗi không xác định'));
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = () => {
        if (!product) return;
        const newQuantity = quantity + 1;
        if (newQuantity > product.countInStock) {
            message.warning(`Chỉ còn ${product.countInStock} sản phẩm trong kho`);
            return;
        }
        setQuantity(newQuantity);
        updateCartQuantity(newQuantity);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateCartQuantity(newQuantity);
        }
    };

    const updateCartQuantity = (newQuantity) => {
        if (!product) return;

        try {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItemIndex = cart.findIndex(item => item.id === product._id);

            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity = newQuantity;
            } else {
                cart.push({
                    id: product._id,
                    name: product.name,
                    author: product.author,
                    type: product.type,
                    price: product.price,
                    image: product.image,
                    quantity: newQuantity
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(updateCart(cart));
            message.success('Đã cập nhật số lượng');
        } catch (error) {
            console.error('Error updating cart quantity:', error);
            message.error('Có lỗi xảy ra khi cập nhật số lượng');
        }
    };

    const handleAddToCart = () => {
        if (!product) return;

        try {
            if (quantity > product.countInStock) {
                message.warning(`Chỉ còn ${product.countInStock} sản phẩm trong kho`);
                return;
            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const cartItem = {
                id: product._id,
                name: product.name,
                author: product.author,
                type: product.type,
                price: product.price,
                image: product.image,
                quantity: quantity,
                countInStock: product.countInStock
            };

            const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);

            if (existingItemIndex !== -1) {
                const newQuantity = quantity;
                if (newQuantity > product.countInStock) {
                    message.warning(`Chỉ còn ${product.countInStock} sản phẩm trong kho`);
                    return;
                }
                cart[existingItemIndex] = cartItem;
                message.success(`Đã cập nhật số lượng sản phẩm trong giỏ hàng!`);
            } else {
                cart.push(cartItem);
                message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch(updateCart(cart));
        } catch (error) {
            console.error('Error adding to cart:', error);
            message.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
        }
    };

    if (loading) {
        return <Loading isLoading={loading} />;
    }

    if (!product) {
        return (
            <div style={{
                padding: '20px',
                textAlign: 'center',
                fontSize: '16px',
                backgroundColor: 'white',
                borderRadius: '8px',
                margin: '8px'
            }}>
                Không tìm thấy sản phẩm
            </div>
        );
    }

    return (
        <Row style={{
            padding: '12px',
            background: 'white',
            borderRadius: '8px',
            maxWidth: '1200px',
            margin: '15px auto',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <Col span={10}>
                <WrapperStyleImage
                    src={product.image}
                    alt={product.name}
                    preview={false}
                    style={{
                        width: '100%',
                        maxHeight: '350px',
                        objectFit: 'contain',
                        padding: '10px',
                        background: '#f5f5f5',
                        borderRadius: '4px'
                    }}
                />
            </Col>
            <Col span={14}>
                <WrapperContainer style={{ padding: '0 15px' }}>
                    <WrapperStyleNameProduct style={{
                        fontSize: '28px',
                        marginBottom: '4px'
                    }}>{product.name}</WrapperStyleNameProduct>

                    <div style={{ margin: '4px 0', fontSize: '14px', display: 'flex', gap: '4px' }}>
                        <WrapperStyleNamePublic>Tác giả:</WrapperStyleNamePublic>
                        <WrapperStyleNameAuthor style={{ fontWeight: '500' }}>{product.author}</WrapperStyleNameAuthor>
                    </div>

                    <div style={{ margin: '4px 0', fontSize: '14px', display: 'flex', gap: '4px' }}>
                        <WrapperStyleNamePublic>Loại sách:</WrapperStyleNamePublic>
                        <WrapperStyleNameAuthor style={{ fontWeight: '500' }}>{product.type}</WrapperStyleNameAuthor>
                    </div>

                    <div style={{ color: '#fadb14', fontSize: '14px', margin: '4px 0', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {[...Array(Math.floor(product.rating || 0))].map((_, index) => (
                            <StarFilled key={index} />
                        ))}
                        <WrapperStyleNamePublic style={{ marginLeft: '4px', color: '#666' }}>
                            ({product.rating} sao)
                        </WrapperStyleNamePublic>
                    </div>

                    <div style={{ margin: '6px 0' }}>
                        <WrapperStylePrice style={{
                            fontSize: '24px',
                            color: '#ff4d4f'
                        }}>{product.price?.toLocaleString()} đ</WrapperStylePrice>
                    </div>

                    <div style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <i className="fas fa-truck" style={{ color: '#52c41a' }}></i>
                        <WrapperStyleNamePublic>Vận chuyển: Miễn phí vận chuyển</WrapperStyleNamePublic>
                    </div>

                    <div style={{ margin: '4px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <WrapperStyleBoldText>Tình trạng:</WrapperStyleBoldText>
                        <WrapperStyleNameAuthor style={{
                            color: product.countInStock > 0 ? '#52c41a' : '#ff4d4f',
                            fontWeight: '500'
                        }}>
                            {product.countInStock > 0 ? `Còn hàng (${product.countInStock})` : 'Hết hàng'}
                        </WrapperStyleNameAuthor>
                    </div>

                    <div style={{ margin: '6px 0' }}>
                        <WrapperStyleBoldText style={{ fontSize: '14px', marginBottom: '8px' }}>Mô tả:</WrapperStyleBoldText>
                        <div style={{
                            lineHeight: '1.4',
                            fontSize: '14px',
                            color: '#666',
                            backgroundColor: '#f5f5f5',
                            padding: '8px',
                            borderRadius: '4px'
                        }}>
                            {product.description}
                        </div>
                    </div>

                    <div style={{ margin: '6px 0' }}>
                        <WrapperStyleBoldText style={{ fontSize: '14px', marginBottom: '8px' }}>Số lượng:</WrapperStyleBoldText>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            <button
                                onClick={handleDecrease}
                                style={{
                                    ...buttonStyle,
                                    opacity: quantity <= 1 ? 0.5 : 1,
                                    width: '28px',
                                    height: '28px',
                                    cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                                    backgroundColor: '#fff',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px',
                                    color: 'black',
                                }}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span style={{
                                ...quantityStyle,
                                width: '35px',
                                textAlign: 'center',
                                userSelect: 'none'
                            }}>{quantity}</span>
                            <button
                                onClick={handleIncrease}
                                style={{
                                    ...buttonStyle,
                                    width: '28px',
                                    height: '28px',
                                    cursor: quantity >= product.countInStock ? 'not-allowed' : 'pointer',
                                    backgroundColor: '#fff',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px',
                                    color: 'black',
                                    opacity: quantity >= product.countInStock ? 0.5 : 1
                                }}
                                disabled={quantity >= product.countInStock}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "8px"
                    }}>
                        <button style={{
                            ...buyNowStyle,
                            height: '40px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                        }}>
                            Mua ngay
                        </button>
                        <button
                            onClick={handleAddToCart}
                            style={{
                                ...addToCartStyle,
                                height: '40px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer',
                                opacity: product.countInStock === 0 ? 0.5 : 1
                            }}
                            disabled={product.countInStock === 0}
                        >
                            🛒 Thêm vào giỏ hàng
                        </button>
                    </div>
                </WrapperContainer>
            </Col>
        </Row>
    );
};

export default ProductDetailComponent;
