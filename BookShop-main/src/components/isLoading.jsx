import { Spin } from "antd";
import React from "react";

const Loading = ({ children, isLoading, delay = 200 }) => {
    return (
        <Spin spinning={isLoading} delay={delay} tip="Loading...">
            <div style={{ minHeight: "100vh", display: isLoading ? "flex" : "block", justifyContent: "center", alignItems: "center" }}>
                {isLoading ? <div>Loading...</div> : children}
            </div>
        </Spin>
    );
};

export default Loading;
