import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { routes } from "./routes";
import Defaultcomponent from "./components/Defaultcomponents/Defaultcomponent";
import { jwtDecode } from "jwt-decode";
import * as UserService from "../src/services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/slides/userSlide";
import { isJsonString } from "./utils";
import Loading from "./components/isLoading";
import NotFoundPage from "./pages/NotFoundspage/NotFoundspage";
import AdminUser from './components/AdminUser/AdminUser';

function App() {
    const dispatch = useDispatch();
    const [isLoading, setisLoanding] = useState(false);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleDecoded = () => {
        let storageData = localStorage.getItem('access_token');
        let decoded = {};
        try {
            if (storageData) {
                storageData = isJsonString(storageData) ? JSON.parse(storageData) : storageData;
                decoded = jwtDecode(storageData);
            }
        } catch (error) {
            console.log('Error decoding token:', error);
        }
        return { decoded, storageData };
    };

    const handleGetDetailUser = async (id, token) => {
        try {
            const res = await UserService.getDetailUser(id, token);
            dispatch(updateUser({ ...res?.data, access_token: token }));
            if (res?.data?.isAdmin) {
                navigate('/system/admin');
            }
        } catch (error) {
            console.log('Error getting user details:', error);
        }
    };

    useEffect(() => {
        const handleInit = async () => {
            setisLoanding(true);
            const { decoded, storageData } = handleDecoded();
            if (decoded?.id) {
                await handleGetDetailUser(decoded.id, storageData);
            }
            setisLoanding(false);
        };
        handleInit();
    }, []);

    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            const currentTime = new Date();
            const { decoded } = handleDecoded();

            if (decoded?.exp && decoded.exp < currentTime.getTime() / 1000) {
                try {
                    const data = await UserService.refreshToken();
                    if (data?.access_token) {
                        config.headers['Authorization'] = `Bearer ${data.access_token}`;
                        localStorage.setItem('access_token', JSON.stringify(data.access_token));
                    }
                } catch (error) {
                    console.log('Error refreshing token:', error);
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const ProtectedRoute = ({ isAdmin, children }) => {
        if (isAdmin && !user.isAdmin) {
            return <Navigate to="/not-found" replace />;
        }

        if (isAdmin && !user.access_token) {
            return <Navigate to="/sign-in" replace />;
        }

        return children;
    };

    return (
        <div>
            <Loading isLoading={isLoading}>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader ? Defaultcomponent : React.Fragment;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <ProtectedRoute isAdmin={route.isPrivate}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}
                    <Route path="/not-found" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/not-found" replace />} />
                    <Route path="/system/admin/users" element={
                        <ProtectedRoute isAdmin={true}>
                            <AdminUser />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Loading>
        </div>
    );
}

export default App;
