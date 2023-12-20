import { Fragment } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'ایجاد حساب کاربری',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            <Image
                src="svg/other/wave-pattern.svg"
                alt="wave-pattern"
                fill
                className="absolute inset-0 -z-[999] object-cover"
            />
            {children}
        </Fragment>
    );
}
