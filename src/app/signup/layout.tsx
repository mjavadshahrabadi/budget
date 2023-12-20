import type { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
    title: 'ایجاد حساب کاربری',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <Fragment>{children}</Fragment>;
}
