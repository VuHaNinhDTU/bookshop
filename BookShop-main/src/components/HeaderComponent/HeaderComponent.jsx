import React from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
    const { totalQuantity } = useSelector((state) => state.cart);

    return (
        <Badge count={totalQuantity} size="small">
            <ShoppingCartOutlined style={{ fontSize: '20px', color: '#fff' }} />
        </Badge>
    );
};

export default HeaderComponent; 