import { Fragment } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ایجاد حساب کاربری',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return <Fragment>{children}</Fragment>;
}
