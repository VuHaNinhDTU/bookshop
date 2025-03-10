import { Button, Table, Modal } from 'antd';
import React, { useEffect } from 'react';
import { WrapperHeader } from '../AdminProduct/style';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hook/useMutationHooks';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import * as message from '../MessageComponent/Message';

const AdminUser = () => {
    // Fetch users data
    const getAllUsers = async () => {
        try {
            const res = await UserService.getAllUsers()
            console.log('Get all users response:', res)
            return res
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }
    }

    const queryUser = useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            console.log('Query success:', data);
        },
        onError: (error) => {
            console.error('Query error:', error);
            message.error('Failed to fetch users');
        }
    });

    const { isLoading: isLoadingUsers, data: users } = queryUser

    // Transform data for table
    const tableData = users?.data?.map((user) => {
        console.log('Processing user:', user);
        return {
            key: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin ? 'Yes' : 'No',
            address: user.address
        };
    }) || [];

    console.log('Table data:', tableData);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Is Admin',
            dataIndex: 'isAdmin',
            key: 'isAdmin'
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => {
                console.log("Render action column with record:", record); // Kiểm tra record
                return (
                    <Button type="link" danger onClick={() => handleDelete(record.key)}>
                        Xóa
                    </Button>
                );
            }
        }
    ];

    const deleteMutation = useMutationHooks((id) => {
        return UserService.deleteUser(id);
    });

    // Handle delete success/error
    useEffect(() => {
        if (deleteMutation.isSuccess) {
            message.success('Xóa người dùng thành công');
            queryUser.refetch().then(() => {
                console.log('Data refetched after delete');
            }).catch(error => {
                console.error('Error refetching data after delete:', error);
            });
        } else if (deleteMutation.isError) {
            const errorMsg = deleteMutation.error?.message || 'Xóa người dùng thất bại';
            message.error(errorMsg);
            console.error('Delete mutation error:', deleteMutation.error);
        }
    }, [deleteMutation.isSuccess, deleteMutation.isError]);

    const handleDelete = (id) => {
        console.log("handleDelete function called with ID:", id); // Kiểm tra xem hàm có được gọi không
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa người dùng này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                console.log("User confirmed deletion for ID:", id);
                try {
                    await deleteMutation.mutateAsync(id);
                    console.log("User deleted successfully:", id);
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            },
            onCancel: () => {
                console.log("User canceled deletion");
            }
        });
    };
    
    
    return (
        
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <Loading isLoading={isLoadingUsers}>
                    <Table
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
        </div>
    );
};


export default AdminUser;