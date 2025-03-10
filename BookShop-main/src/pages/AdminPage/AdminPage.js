import { Menu } from 'antd';
import React, { useState } from 'react';
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import HeaderComponent from '../../components/Headercomponents/Headercomponent';

const AdminPage = () => {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />)
    ];

    const [keySelected, setKeySelected] = useState('user');

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            default:
                return <></>;
        }
    };

    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };

    console.log('keySelected', keySelected);

    return (
        <div>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{
                display: 'flex',
                overflowX: 'hidden',
                background: '#fff',
                marginTop: '0px',
                paddingTop: '100px'
            }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnClick}
                    defaultSelectedKeys={['user']}
                />
                <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
