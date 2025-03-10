import React from "react";
import ProducDetailComponent from "../../components/ProductDetailcomponent/ProductDetailComponent";
import FotterComponent from "../../components/FotterComponent/FotterComponent";
import DescribeComponent from "../../components/DescribeComponent/DescribeComponent";
import { useParams } from "react-router-dom";

const ProducDetailPage = () => {
    const { id } = useParams();

    return (
        <>
            <div style={{
                marginTop: '100px',
                padding: '10px 120px',
                backgroundColor: '#efefef',
                minHeight: '80vh',
                paddingBottom: '30px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    <a
                        style={{
                            textDecoration: "none",
                            color: "#02bbff",
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                        href="/"
                    >
                        Trang Chủ
                    </a>
                    <span style={{ color: '#666' }}>/</span>
                    <span style={{ color: '#333' }}>Chi tiết sản phẩm</span>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <ProducDetailComponent />
                </div>

                <div style={{
                    marginTop: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    padding: '20px'
                }}>
                    <DescribeComponent />
                </div>
            </div>

            <FotterComponent />
        </>
    );
};

export default ProducDetailPage;