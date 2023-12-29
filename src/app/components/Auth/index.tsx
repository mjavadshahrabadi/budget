'use client';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { useLocalStorage } from '@/src/app/hook/useLocalStorage';
import { redirect } from 'next/navigation';
import Loading from '@/src/app/loading';
import { IUser, useAuth } from '@/src/store';
import { jwtDecode } from 'jwt-decode';
import API from '@/src/app/utils/API';
import toast from 'react-hot-toast';

interface IAuthProp {
    children: React.ReactNode;
}
const IsAuth = (props: IAuthProp): ReactElement => {
    const { children } = props;
    const { getLocalStorage } = useLocalStorage();
    const [auth, setAuth] = useState(false);
    const { setLogin } = useAuth();

    const getUserData = async () => {
        try {
            const response = await API.get('account/profile');
            const result = response.data;
            if (result.success && result.success) {
                setLogin(result.data as IUser);
            }
        } catch (error) {
            toast.error('مشکلی در دریافت اطلاعات کاربری رخ داده است');
        }
    };
    useEffect(() => {
        const token = getLocalStorage('token');
        if (!token) {
            redirect('/signin');
            return;
        }
        getUserData();
        setAuth(true);
    }, []);

    if (!auth) return <Loading />;
    return <Fragment>{children}</Fragment>;
};

export default IsAuth;
