import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProduct, WrapperTypeProduct } from "./style";
import Slidercomponent from "../../components/Slidercomponent/Slidercomponent";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/image3.png";
import CardComponent from "../../components/CartComponent/CardComponent";
import FooterComponent from "../../components/FotterComponent/FotterComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const Homepage = () => {
    const arr = ['Sách thiếu nhi', 'Sách gia đình', 'Sách chính trị-xã hội', 'Sách khoa học', 'Truyện'];

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await ProductService.getAllProducts();
                console.log("Dữ liệu từ API:", res);
                return res;
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                throw error;
            }
        },
        retry: 3,
        retryDelay: 1000,
    });

    return (
        <>
            <div style={{ padding: '0px 120px', background: '#02bbff' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => (
                        <Link
                            to={`/typeproduct/${item}`}
                            key={item}
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}
                        >
                            <TypeProduct name={item} />
                        </Link>
                    ))}
                </WrapperTypeProduct>
            </div>

            {/* Slider đặt riêng phía trên */}
            <div style={{ backgroundColor: "#efefef", padding: "0 120px" }}>
                <Slidercomponent arrImage={[image1, image2, image3]} />
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#efefef",
                padding: "20px 120px",
                position: "relative"
            }}>
                <span style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#02bbff",
                    paddingRight: "20px",
                    backgroundColor: "#efefef",
                    zIndex: "1"
                }}>
                    Tất cả sách:
                </span>
                <div style={{
                    flex: "1",
                    height: "4px",
                    backgroundColor: "#02bbff",
                    position: "relative",
                    top: "4px"
                }}></div>
            </div>

            <div id="container"
                style={{
                    backgroundColor: "#efefef",
                    padding: "0px 120px",
                    display: "flex",
                    gap: "20px"
                }}>

                {/* Cột bên trái - Navbar */}
                <div style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    position: "sticky",
                    top: "120px",
                    height: "fit-content",
                }}>
                    <NavbarComponent />
                </div>

                {/* Cột bên phải - Nội dung chính */}
                <div style={{ flex: 1 }}>
                    <WrapperProduct>
                        {isLoading ? (
                            <p>Đang tải dữ liệu...</p>
                        ) : isError ? (
                            <p>Có lỗi xảy ra khi tải dữ liệu!</p>
                        ) : (
                            products?.data?.map((product) => (
                                <CardComponent
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    author={product.author}
                                    description={product.description}
                                    image={product.image}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                />
                            ))
                        )}
                    </WrapperProduct>
                </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "20px", backgroundColor: "#efefef" }}>
                <WrapperButtonMore
                    textButton="Xem thêm"
                    type="outline"
                    styleButton={{ border: "1px solid #02bbff", color: "Blue", width: "240px", height: "38px", borderRadius: "4px" }}
                    styleTextButton={{ fontWeight: "500" }}
                />
            </div>
            <div>
                <FooterComponent />
            </div>
        </>
    );
};

export default Homepage;
