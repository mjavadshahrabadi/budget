'use client';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { useLocalStorage } from '@/src/app/hook/useLocalStorage';
import { redirect } from 'next/navigation';
import Loading from '@/src/app/loading';

interface IAuthProp {
    children: React.ReactNode;
}
const IsAuth = (props: IAuthProp): ReactElement => {
    const { children } = props;
    const { getLocalStorage } = useLocalStorage();
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        const token = getLocalStorage('token');
        if (!token) {
            redirect('/signin');
            return;
        }
        setAuth(true);
    }, [getLocalStorage]);
    if (!auth) return <Loading />;
    return <Fragment>{children}</Fragment>;
};

export default IsAuth;
