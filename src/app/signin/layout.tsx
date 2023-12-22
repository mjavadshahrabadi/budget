import type { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
    title: 'ورود به حساب کاربری',
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
    return <Fragment>{children}</Fragment>;
}
