import { Button, Form, Modal, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { WrapperHeader, WrapperUploadFile } from './style';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64 } from '../../utils';
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from '../../hook/useMutationHooks';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import * as message from '../MessageComponent/Message';

const AdminProduct = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stateProduct, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        author: '',
        countInStock: ''
    });

    // Add queryClient
    const queryClient = useQueryClient();

    // Fetch products data
    const getAllProducts = async () => {
        console.log('Calling getAllProducts API...');
        try {
            const res = await ProductService.getAllProducts({
                sort: ['desc', 'createdAt'], // Sort by createdAt in descending order
                filter: null // No filter by default
            });
            console.log('getAllProducts response:', res);
            return res;
        } catch (error) {
            console.error('Fetch products error:', error.message);
            throw error;
        }
    };

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        refetchOnWindowFocus: false,
        enabled: true,
        staleTime: 300000,
        cacheTime: 300000,
        retry: 3,
        refetchOnMount: true,
        onSuccess: (response) => {
            console.log('Query success:', {
                status: response?.status,
                hasData: Boolean(response?.data),
                totalProducts: response?.data?.length,
                data: response?.data
            });
        },
        onError: (error) => {
            console.error('Query error:', error.message);
            message.error('Failed to fetch products');
        }
    });
    
    const { isLoading: isLoadingProducts, data: products } = queryProduct;

    // Transform data for table
    const tableData = React.useMemo(() => {
        console.log('Raw products data:', products); // Log raw data
        if (!products?.data || !Array.isArray(products.data)) {
            console.log('No products data available');
            return [];
        }

        const transformedData = products.data.map((product) => {
            if (!product || !product._id) {
                console.log('Invalid product:', product);
                return null;
            }

            return {
                key: product._id,
                name: product.name || '',
                price: product.price || 0,
                type: product.type || '',
                rating: product.rating || 0,
                author: product.author || '',
                image: product.image || '',
                description: product.description || '',
                countInStock: product.countInStock || 0,
                discount: product.discount || 0
            };
        }).filter(Boolean);

        console.log('Transformed table data:', transformedData);
        return transformedData;
    }, [products]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (price) => `${price?.toLocaleString()}đ`
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Số lượng',
            dataIndex: 'countInStock',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => {
                return (
                    <span>
                        <Button
                            type="link"
                            onClick={() => {
                                handleEdit(record);
                            }}
                        >
                            Sửa
                        </Button>
                        <Button
                            type="link"
                            danger
                            onClick={() => {
                                handleDelete(record.key);
                            }}
                        >
                            Xóa
                        </Button>
                    </span>
                );
            }
        }
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const mutation = useMutationHooks(
        (data) => {
            console.log('Creating product with data:', data);
            return ProductService.createProduct(data);
        },
        {
            onSuccess: async (response) => {
                console.log('Create product response:', response);
                if (response?.status === 'OK' || response?.status === 'ok') {
                    message.success('Tạo sản phẩm thành công');
                    handleCancel();
                    form.resetFields();
                    setProduct({
                        name: '',
                        price: '',
                        description: '',
                        rating: '',
                        image: '',
                        type: '',
                        author: '',
                        countInStock: ''
                    });

                    // Invalidate and refetch
                    console.log('Invalidating products cache...');
                    await queryClient.invalidateQueries(['products']);
                    console.log('Refetching products...');
                    await queryProduct.refetch();
                    console.log('Refetch completed');
                } else {
                    message.error(response?.message || 'Tạo sản phẩm thất bại');
                }
                setLoading(false);
            },
            onError: (error) => {
                console.error('Create product error:', error);
                message.error(error?.message || 'Tạo sản phẩm thất bại');
                setLoading(false);
            }
        }
    );

    const { isLoading, isSuccess, isError } = mutation;

    const updateMutation = useMutationHooks((data) => {
        const { id, ...updateData } = data;
        return ProductService.updateProduct(id, updateData);
    });

    const deleteMutation = useMutationHooks(
        (id) => {
            console.log('Deleting product:', id);
            return ProductService.deleteProduct(id);
        },
        {
            onSuccess: async (response) => {
                console.log('Delete success:', response);
                if (response?.status === 'OK') {
                    message.success(response.message || 'Xóa sản phẩm thành công');
                    // Refresh danh sách sản phẩm
                    await queryClient.invalidateQueries(['products']);
                    await queryProduct.refetch();
                } else {
                    message.error(response?.message || 'Xóa sản phẩm thất bại');
                }
            },
            onError: (error) => {
                console.error('Delete error:', error);
                message.error(error?.message || 'Xóa sản phẩm thất bại');
            }
        }
    );
    
    // Handle update success/error
    useEffect(() => {
        if (updateMutation.isSuccess) {
            message.success('Cập nhật sản phẩm thành công');
            setIsEditModalOpen(false);
            setEditingProduct(null);
            handleCancel();
            queryProduct.refetch();
        } else if (updateMutation.isError) {
            const errorMsg = updateMutation.error?.message || 'Cập nhật sản phẩm thất bại';
            message.error(errorMsg);
            setLoading(false);
        }
    }, [updateMutation.isSuccess, updateMutation.isError]);
    
    const handleDelete = (id) => {
        if (!id) {
            message.error('Không tìm thấy ID sản phẩm');
            return;
        }
    
        console.log('Handling delete for product:', id);
    
        Modal.confirm({
            title: 'Xác nhận xóa sản phẩm',
            content: 'Bạn có chắc chắn muốn xóa sản phẩm này không?',
            okText: 'Đồng ý',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: () => {
                console.log('Confirmed delete for product:', id);
                deleteMutation.mutate(id);
            }
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setLoading(false);
        setProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            author: '',
            countInStock: ''
        });
        form.resetFields();
    };

    const onFinish = (values) => {
        setLoading(true);
        try {
            const name = values.name?.trim();
            const type = values.type?.trim();
            const description = values.description?.trim();
            const price = Number(values.price);
            const rating = Number(values.rating);
            const author = values.author?.trim();
            const countInStock = Number(values.countInStock);

            if (!name) throw new Error('Tên sản phẩm không được để trống');
            if (!type) throw new Error('Loại sản phẩm không được để trống');
            if (!description) throw new Error('Mô tả sản phẩm không được để trống');
            if (!stateProduct.image) throw new Error('Vui lòng chọn ảnh sản phẩm');
            if (isNaN(price) || price <= 0) throw new Error('Giá phải là số dương');
            if (isNaN(rating) || rating < 0 || rating > 5) throw new Error('Rating phải là số từ 0 đến 5');
            if (!author) throw new Error('Tác giả không được để trống');
            if (isNaN(countInStock) || countInStock < 0) throw new Error('Số lượng phải là số dương');

            const finalData = {
                name,
                type,
                price,
                description,
                rating,
                image: stateProduct.image,
                countInStock,
                discount: 0,
                author
            };

            mutation.mutate(finalData);
        } catch (error) {
            console.error('Form error:', error.message);
            message.error(error.message);
            setLoading(false);
        }
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        try {
            if (fileList && fileList.length > 0) {
                const file = fileList[0];
                if (file.originFileObj) {
                    const preview = await getBase64(file.originFileObj);
                    setProduct({
                        ...stateProduct,
                        image: preview
                    });
                }
            }
        } catch (error) {
            console.error('Error handling image:', error);
            message.error('Có lỗi xảy ra khi xử lý ảnh');
        }
    };

    const handleOnChange = (e) => {
        setProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = (record) => {
        setEditingProduct(record);
        setProduct({
            name: record.name,
            price: record.price,
            description: record.description,
            rating: record.rating,
            image: record.image,
            type: record.type,
            author: record.author,
            countInStock: record.countInStock
        });
        setIsEditModalOpen(true);
        form.setFieldsValue({
            name: record.name,
            price: record.price,
            description: record.description,
            rating: record.rating,
            type: record.type,
            author: record.author,
            countInStock: record.countInStock
        });
    };

    const handleUpdate = (values) => {
        setLoading(true);
        try {
            const name = values.name?.trim();
            const type = values.type?.trim();
            const description = values.description?.trim();
            const price = Number(values.price);
            const rating = Number(values.rating);
            const author = values.author?.trim();
            const countInStock = Number(values.countInStock);

            if (!name) throw new Error('Tên sản phẩm không được để trống');
            if (!type) throw new Error('Loại sản phẩm không được để trống');
            if (!description) throw new Error('Mô tả sản phẩm không được để trống');
            if (isNaN(price) || price <= 0) throw new Error('Giá phải là số dương');
            if (isNaN(rating) || rating < 0 || rating > 5) throw new Error('Rating phải là số từ 0 đến 5');
            if (isNaN(countInStock) || countInStock < 0) throw new Error('Số lượng phải là số dương');

            const finalData = {
                id: editingProduct.key,
                name,
                type,
                price,
                description,
                rating,
                author,
                image: stateProduct.image || editingProduct.image,
                countInStock,
                discount: editingProduct.discount || 0
            };

            console.log('Updating product:', {
                id: finalData.id,
                name: finalData.name,
                type: finalData.type
            });

            updateMutation.mutate(finalData);
        } catch (error) {
            console.error('Update error:', error.message);
            message.error(error.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <Button
                    style={{
                        height: '150px',
                        width: '150px',
                        borderRadius: '6px',
                        borderStyle: 'dashed'
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Loading isLoading={isLoadingProducts}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={tableData}
                        pagination={{
                            total: tableData.length,
                            pageSize: 5,
                            showSizeChanger: false
                        }}
                    />
                </Loading>
            </div>
            <Modal
                title="Tạo sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
                maskClosable={false}
            >
                <Loading isLoading={loading}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        preserve={false}
                        onSubmit={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                        >
                            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
                        >
                            <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                        >
                            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
                        >
                            <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Vui lòng nhập rating!' }]}
                        >
                            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" type="number" min={0} max={5} />
                        </Form.Item>

                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Please input author!' }]}
                        >
                            <InputComponent value={stateProduct.author} onChange={handleOnChange} name="author" />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="countInStock"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh sản phẩm!' }]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnchangeAvatar}
                                maxCount={1}
                                accept="image/*"
                                beforeUpload={() => false}
                                showUploadList={false}
                            >
                                <Button>Select File</Button>
                                {stateProduct?.image && (
                                    <img
                                        src={stateProduct.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px'
                                        }}
                                        alt="product"
                                    />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>

            {/* Edit Modal */}
            <Modal
                title="Cập nhật sản phẩm"
                open={isEditModalOpen}
                onCancel={() => {
                    setIsEditModalOpen(false);
                    setEditingProduct(null);
                    handleCancel();
                }}
                footer={null}
                destroyOnClose
                maskClosable={false}
            >
                <Loading isLoading={loading}>
                    <Form
                        form={form}
                        name="edit"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={handleUpdate}
                        autoComplete="off"
                        preserve={false}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input product name!' }]}
                        >
                            <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input product type!' }]}
                        >
                            <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input price!' }]}
                        >
                            <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input description!' }]}
                        >
                            <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[{ required: true, message: 'Please input rating!' }]}
                        >
                            <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Please input author!' }]}
                        >
                            <InputComponent value={stateProduct.author} onChange={handleOnChange} name="author" />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng"
                            name="countInStock"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please upload an image!' }]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnchangeAvatar}
                                maxCount={1}
                                accept="image/*"
                                beforeUpload={() => false} // Prevent auto upload
                                showUploadList={false}
                            >
                                <Button>Select File</Button>
                                {stateProduct?.image && (
                                    <img
                                        src={stateProduct.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginLeft: '10px'
                                        }}
                                        alt="product"
                                    />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
        </div>
    );
};

export default AdminProduct;
