const mongoose = require('mongoose');
const Product = require('../models/ProductModel');
require('dotenv').config();

const products = [
    {
        name: "Ba Chú Lợn Con",
        image: "/images/bachuloncon.jpg",
        type: "Sách thiếu nhi",
        price: 85000,
        rating: 4.5,
        description: "Câu chuyện cổ tích nổi tiếng về ba chú lợn con xây nhà để chống lại chó sói.",
        author: "Truyện dân gian",
        countInStock: 50
    },
    {
        name: "Cây Cam Ngọt Của Tôi",
        image: "/images/Caycamngotcuatoi.jpg",
        type: "Tiểu thuyết",
        price: 108000,
        rating: 4.8,
        description: "Tiểu thuyết cảm động về cậu bé Zezé và tình bạn với một cây cam ngọt.",
        author: "José Mauro de Vasconcelos",
        countInStock: 30
    },
    {
        name: "Cho Tôi Xin Một Vé Đi Tuổi Thơ",
        image: "/images/chotoixin1vedituoitho.jpg",
        type: "Tiểu thuyết",
        price: 90000,
        rating: 4.7,
        description: "Tác phẩm nổi tiếng của Nguyễn Nhật Ánh về kỷ niệm tuổi thơ.",
        author: "Nguyễn Nhật Ánh",
        countInStock: 45
    },
    {
        name: "Corduroy",
        image: "/images/Corduroy.jpg",
        type: "Sách thiếu nhi",
        price: 75000,
        rating: 4.6,
        description: "Câu chuyện cảm động về chú gấu bông Corduroy và ước mơ tìm được một người bạn.",
        author: "Don Freeman",
        countInStock: 25
    },
    {
        name: "Để Con Được Ốm",
        image: "/images/Deconduocom.jpg",
        type: "Nuôi dạy con",
        price: 115000,
        rating: 4.7,
        description: "Cuốn sách chia sẻ quan điểm giáo dục trẻ em theo hướng tôn trọng sự phát triển tự nhiên.",
        author: "Uyên Bùi",
        countInStock: 35
    },
    {
        name: "Dế Mèn Phiêu Lưu Ký",
        image: "/images/Demenphieuluuky.jpg",
        type: "Sách thiếu nhi",
        price: 88000,
        rating: 4.9,
        description: "Tác phẩm kinh điển của văn học Việt Nam kể về cuộc phiêu lưu của chú Dế Mèn.",
        author: "Tô Hoài",
        countInStock: 60
    },
    {
        name: "Đi Tìm Ý Nghĩa Cuộc Sống",
        image: "/images/ditimynghiacuocsong.jpg",
        type: "Tâm lý - Kỹ năng sống",
        price: 120000,
        rating: 4.7,
        description: "Cuốn sách giúp độc giả khám phá ý nghĩa sâu sắc của cuộc sống.",
        author: "Viktor E. Frankl",
        countInStock: 40
    },
    {
        name: "Don Quixote",
        image: "/images/DonQuiXote.jpg",
        type: "Văn học cổ điển",
        price: 150000,
        rating: 4.8,
        description: "Kiệt tác văn học thế giới kể về cuộc phiêu lưu của hiệp sĩ Don Quixote.",
        author: "Miguel de Cervantes",
        countInStock: 20
    },
    {
        name: "Đừng Lựa Chọn An Nhàn",
        image: "/images/dungluachonannhan.jpg",
        type: "Tâm lý - Kỹ năng sống",
        price: 110000,
        rating: 4.6,
        description: "Cuốn sách truyền cảm hứng về việc dám bước ra khỏi vùng an toàn.",
        author: "Cảnh Thiên",
        countInStock: 55
    },
    {
        name: "Goodnight Moon",
        image: "/images/Goodnightmoon.jpeg",
        type: "Sách thiếu nhi",
        price: 70000,
        rating: 4.9,
        description: "Cuốn sách thiếu nhi kinh điển với những hình ảnh đẹp và câu chuyện đơn giản.",
        author: "Margaret Wise Brown",
        countInStock: 30
    },
    {
        name: "How To Talk",
        image: "/images/howtotalk.jpg",
        type: "Kỹ năng giao tiếp",
        price: 95000,
        rating: 4.5,
        description: "Cuốn sách cung cấp những phương pháp hiệu quả để cải thiện kỹ năng giao tiếp.",
        author: "Dale Carnegie",
        countInStock: 45
    },
    {
        name: "Kính Vạn Hoa",
        image: "/images/Kinhvanhoa.jpg",
        type: "Sách thiếu niên",
        price: 85000,
        rating: 4.7,
        description: "Bộ truyện nổi tiếng của Nguyễn Nhật Ánh kể về cuộc sống học đường.",
        author: "Nguyễn Nhật Ánh",
        countInStock: 50
    },
    {
        name: "Oh The Places You'll Go",
        image: "/images/Ohtheplaceyouwillgo.jpg",
        type: "Sách thiếu nhi",
        price: 80000,
        rating: 4.8,
        description: "Cuốn sách nổi tiếng của Dr. Seuss với thông điệp đầy cảm hứng về hành trình cuộc đời.",
        author: "Dr. Seuss",
        countInStock: 35
    },
    {
        name: "Parent",
        image: "/images/Parent.jpg",
        type: "Nuôi dạy con",
        price: 125000,
        rating: 4.6,
        description: "Cuốn sách cung cấp những phương pháp hiệu quả và thực tế để nuôi dạy con cái.",
        author: "Adele Faber & Elaine Mazlish",
        countInStock: 25
    },
    {
        name: "Simply",
        image: "/images/Simply.jpg",
        type: "Phát triển bản thân",
        price: 105000,
        rating: 4.4,
        description: "Cuốn sách hướng dẫn cách đơn giản hóa cuộc sống trong thế giới phức tạp.",
        author: "Tác giả không rõ",
        countInStock: 40
    },
    {
        name: "The 7 Habits of Highly Effective Families",
        image: "/images/The7habits.jpg",
        type: "Phát triển bản thân",
        price: 130000,
        rating: 4.7,
        description: "Cuốn sách cung cấp các thói quen để xây dựng gia đình hạnh phúc và hiệu quả.",
        author: "Stephen R. Covey",
        countInStock: 30
    },
    {
        name: "The Snowy Day",
        image: "/images/thesnowyday.jpg",
        type: "Sách thiếu nhi",
        price: 75000,
        rating: 4.8,
        description: "Câu chuyện về một ngày tuyết rơi và những khám phá của cậu bé Peter.",
        author: "Ezra Jack Keats",
        countInStock: 45
    },
    {
        name: "The Whole-Brain Child",
        image: "/images/thewholebrandchild.jpg",
        type: "Nuôi dạy con",
        price: 120000,
        rating: 4.6,
        description: "Cuốn sách hướng dẫn cách nuôi dạy trẻ dựa trên khoa học về não bộ.",
        author: "Daniel J. Siegel & Tina Payne Bryson",
        countInStock: 35
    },
    {
        name: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
        image: "/images/Toithayhoavangtrencoxanh.jpg",
        type: "Tiểu thuyết",
        price: 95000,
        rating: 4.7,
        description: "Tác phẩm nổi tiếng của Nguyễn Nhật Ánh về tuổi thơ và những kỷ niệm đẹp.",
        author: "Nguyễn Nhật Ánh",
        countInStock: 55
    },
    {
        name: "Sống Đơn Giản Cho Mình Thanh Thản",
        image: "/images/songdongian.jpg",
        type: "Phát triển bản thân",
        price: 100000,
        rating: 4.5,
        description: "Cuốn sách hướng dẫn cách sống đơn giản để đạt được sự thanh thản trong tâm hồn.",
        author: "Shunmyo Masuno",
        countInStock: 40
    }
];

const seedProducts = async () => {
    try {
        // Kết nối đến MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Xóa tất cả sản phẩm cũ (nếu có)
        await Product.deleteMany({});
        console.log('Deleted existing products');

        // Import dữ liệu mới
        await Product.insertMany(products);
        console.log('Successfully seeded product data');

        // Đóng kết nối
        await mongoose.connection.close();
        console.log('Database connection closed');
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

// Chạy function
seedProducts(); 