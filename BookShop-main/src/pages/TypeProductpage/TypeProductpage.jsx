import { useParams } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CartComponent/CardComponent";
import { Pagination } from "antd";
import FooterComponent from "../../components/FotterComponent/FotterComponent";
import { WrapperTypeProduct } from "../Homepage/style";
import { Link } from "react-router-dom";
import TypeProduct from "../../components/TypeProduct/TypeProduct";

const Productpage = () => {
    const arr = ['Sách thiếu nhi', 'Sách gia đình', 'Sách chính trị-xã hội', 'Sách khoa học', 'Truyện'];
    const { type } = useParams(); // Lấy danh mục từ URL

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
                                color: type === item ? "red" : "white",
                                backgroundColor: type === item ? "#ffcccc" : "transparent",
                                padding: "5px 10px",
                                borderRadius: "5px"
                            }}
                        >
                            <TypeProduct name={item} />
                        </Link>
                    ))}
                </WrapperTypeProduct>
            </div>

            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", backgroundColor: '#efefef', padding: "10px", borderBottom: "2px red #02bbff", color: "red" }}>
                {type ? `Danh mục: ${type}` : "Tất cả sản phẩm"}
            </div>

            <div id="container"
                style={{
                    backgroundColor: "#efefef",
                    padding: "20px 120px",
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
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "20px",
                    }}>
                        {/* Giả lập danh sách sản phẩm theo danh mục */}
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CardComponent key={index} />
                        ))}
                    </div>
                </div>
            </div>

            <Pagination
                style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: '10px' }}
                defaultCurrent={1}
                total={50}
            />

            <FooterComponent />
        </>
    );
};

export default Productpage;
