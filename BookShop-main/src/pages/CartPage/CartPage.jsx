import React from "react";
import ShoppingCartComponent from "../../components/ShoppingCartComponent/ShoppingCartComponent";

const CartPage = () => {
    return (
        <div style={{ paddingTop: "120px" }}>  {/* Tạo khoảng cách bằng chiều cao Header */}
            <ShoppingCartComponent />
        </div>

    )
}
export default CartPage;