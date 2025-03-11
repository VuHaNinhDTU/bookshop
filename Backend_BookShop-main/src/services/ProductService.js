const Product = require("../models/ProductModel");

const createProduct = async (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, description, author, countInStock } = newProduct;
        try {
            // Validate required fields
            if (!name || !image || !type || !price || !description || !author) {
                return resolve({
                    status: "ERR",
                    message: "Missing required fields",
                });
            }

            // Validate countInStock
            if (countInStock === undefined || countInStock === null) {
                return resolve({
                    status: "ERR",
                    message: "countInStock is required",
                });
            }

            if (typeof countInStock !== 'number' || countInStock < 0) {
                return resolve({
                    status: "ERR",
                    message: "countInStock must be a non-negative number",
                });
            }

            // Check if product exists
            const checkProduct = await Product.findOne({ name: name });
            if (checkProduct) {
                return resolve({
                    status: "ERR",
                    message: "Product already exists!",
                });
            }

            // Create new product
            const createdProduct = await Product.create({
                name,
                image,
                type,
                price,
                rating: 0,
                description,
                author,
                countInStock
            });

            resolve({
                status: "OK",
                message: "Product created successfully",
                data: createdProduct,
            });

        } catch (e) {
            reject({
                status: "ERR",
                message: "Error creating product",
                error: e.message
            });
        }
    });
};

// ✅ Hàm cập nhật sản phẩm
const updateProduct = async (id, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id);
            if (!checkProduct) {
                return resolve({
                    status: "ERR",
                    message: "Product not found!",
                });
            }

            // 👉 Nếu có countInStock, thì cộng thêm vào thay vì ghi đè
            if (updateData.countInStock !== undefined) {
                updateData.countInStock = checkProduct.countInStock + updateData.countInStock;
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

            resolve({
                status: "OK",
                message: "Product updated successfully!",
                data: updatedProduct,
            });

        } catch (e) {
            reject({
                status: "ERR",
                message: "Error updating product",
                error: e.message
            });
        }
    });
};


const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id)
            if (!checkProduct) {
                return resolve({
                    status: "ERR",
                    message: "Product not found",
                });
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "Product deleted successfully",
            });
        } catch (e) {
            reject({
                status: "ERR",
                message: "Error deleting product",
                error: e.message
            });
        }
    });
};

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(id)
            if (!product) {
                return resolve({
                    status: "ERR",
                    message: "Product not found",
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: product
            });
        } catch (e) {
            reject({
                status: "ERR",
                message: "Error fetching product details",
                error: e.message
            });
        }
    });
};

const getAllProduct = (sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = {};

            // Xử lý filter
            if (filter && Array.isArray(filter) && filter.length >= 2) {
                const [field, value] = filter;
                query[field] = { '$regex': value, '$options': 'i' };
            }

            // Xử lý sort
            let sortOptions = {};
            if (sort && Array.isArray(sort) && sort.length >= 2) {
                const [order, field] = sort;
                sortOptions[field] = order === 'asc' ? 1 : -1;
            }

            // Truy vấn tất cả sản phẩm
            const products = await Product.find(query).sort(sortOptions);

            // Nếu không tìm thấy sản phẩm nào
            if (!products || products.length === 0) {
                return resolve({
                    status: "OK",
                    message: "No products found",
                    data: [],
                    total: 0
                });
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: products,
                total: products.length
            });
        } catch (e) {
            reject({
                status: "ERR",
                message: "Error fetching products",
                error: e.message
            });
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
};
