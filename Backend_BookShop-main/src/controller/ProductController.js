const ProductService = require("../services/ProductService");

const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, type, author, countInStock } = req.body;

        // Validate required fields
        if (!name || !price || !description || !image || !type || !author) {
            return res.status(400).json({
                status: "ERR",
                message: "Missing required fields: name, price, description, image, type, author",
            });
        }

        // Validate price
        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({
                status: "ERR",
                message: "Price must be a positive number",
            });
        }

        // Validate countInStock
        if (countInStock === undefined || countInStock === null) {
            return res.status(400).json({
                status: "ERR",
                message: "countInStock is required",
            });
        }

        if (typeof countInStock !== 'number' || countInStock < 0) {
            return res.status(400).json({
                status: "ERR",
                message: "countInStock must be a non-negative number",
            });
        }

        // Gọi service để tạo sản phẩm
        const response = await ProductService.createProduct(req.body);

        // Kiểm tra kết quả từ service
        if (response.status === "ERR") {
            return res.status(400).json(response);
        }

        return res.status(201).json(response);

    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: "Internal server error",
            error: e.message,
        });
    }
};

// ✅ API cập nhật sản phẩm
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        if (!productId) {
            return res.status(400).json({
                status: "ERR",
                message: "Product ID is required",
            });
        }

        // Validate countInStock if it's being updated
        if (updateData.countInStock !== undefined) {
            if (typeof updateData.countInStock !== 'number' || updateData.countInStock < 0) {
                return res.status(400).json({
                    status: "ERR",
                    message: "countInStock must be a non-negative number",
                });
            }
        }

        // Validate price if it's being updated
        if (updateData.price !== undefined) {
            if (typeof updateData.price !== 'number' || updateData.price <= 0) {
                return res.status(400).json({
                    status: "ERR",
                    message: "Price must be a positive number",
                });
            }
        }

        const response = await ProductService.updateProduct(productId, updateData);

        if (response.status === "ERR") {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: "Internal server error",
            error: e.message,
        });
    }
};

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: "Product ID is required"
            });
        }
        const response = await ProductService.getDetailProduct(productId);

        if (response.status === 'ERR') {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: "Internal server error",
            error: e.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'ERR',
                message: "Product ID is required"
            });
        }
        const response = await ProductService.deleteProduct(productId);

        if (response.status === 'ERR') {
            return res.status(404).json(response);
        }

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: "Internal server error",
            error: e.message
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { sort, filter } = req.query;
        // Bỏ limit và page, lấy tất cả sản phẩm
        const response = await ProductService.getAllProduct(null, null, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: "ERR",
            message: "Internal server error",
            error: e.message
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
};
