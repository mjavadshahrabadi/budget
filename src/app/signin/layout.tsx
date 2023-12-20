import type { Metadata } from 'next';
import { Fragment } from 'react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'ورود به حساب کاربری',
};

export default function SigninLayout({ children }: { children: React.ReactNode }) {
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
