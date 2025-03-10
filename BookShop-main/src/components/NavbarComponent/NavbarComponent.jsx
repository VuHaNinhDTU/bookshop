import React, { useState, useEffect, useRef } from "react";
import { WrapperContent, WrapperLabelText, WrapperTextValue, WrapperItem, DropdownWrapper } from "./style";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";

const options = [
    { id: "name", text: "Tìm theo tên sách", icon: <SearchOutlined /> },
    { id: "author", text: "Tìm theo tên tác giả", icon: <SearchOutlined /> },
    { id: "store", text: "Tìm theo gian hàng", icon: <DownOutlined /> },
    { id: "rating", text: "Tìm theo đánh giá sao", icon: <SearchOutlined />, hasDropdown: true },
];

const starOptions = [
    { id: "5-stars", stars: 5, label: "Từ 5 sao" },
    { id: "4-stars", stars: 4, label: "Từ 4 sao" },
    { id: "3-stars", stars: 3, label: "Từ 3 sao" },
    { id: "2-stars", stars: 2, label: "Từ 2 sao" },
    { id: "1-star", stars: 1, label: "Từ 1 sao" },
    { id: "all-stars", stars: 0, label: "--Tất cả--" },
];

const NavbarComponent = () => {
    const [selectedDropdown, setSelectedDropdown] = useState(null);
    const dropdownRef = useRef(null);

    // Xử lý đóng dropdown khi click ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSelectedDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <WrapperLabelText>Bộ lọc tìm kiếm</WrapperLabelText>
            <WrapperContent>
                {options.map((option) => (
                    <div key={option.id} style={{ position: "relative" }} ref={option.hasDropdown ? dropdownRef : null}>
                        <WrapperItem
                            onClick={() => {
                                if (option.hasDropdown) {
                                    setSelectedDropdown(selectedDropdown === option.id ? null : option.id);
                                }
                            }}
                        >
                            <WrapperTextValue>{option.text}</WrapperTextValue>
                            {option.icon && <span>{option.icon}</span>}
                        </WrapperItem>

                        {/* Hiển thị dropdown nếu mục đang được chọn */}
                        {option.hasDropdown && selectedDropdown === option.id && (
                            <DropdownWrapper>
                                {starOptions.map((star) => (
                                    <WrapperItem key={star.id}>
                                        <span style={{ color: "gold" }}>{"★".repeat(star.stars)}</span> {star.label}
                                    </WrapperItem>
                                ))}
                            </DropdownWrapper>
                        )}
                    </div>
                ))}
            </WrapperContent>
        </div>
    );
};

export default NavbarComponent;
