import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

const ButtomInputSearch = ({ size, placeholder, textbotton }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Input
                size={size}
                placeholder={placeholder}
                style={{
                    flexGrow: 1,
                    borderRadius: 0, // Loại bỏ bo góc
                }}
            />
            <Button
                size={size}
                icon={<SearchOutlined />}
                style={{
                    marginLeft: '-4px', // Đưa nút gần thanh tìm kiếm
                    borderRadius: 0, // Loại bỏ bo góc
                }}
            >
                {textbotton}
            </Button>
        </div>
    );
};

export default ButtomInputSearch;
