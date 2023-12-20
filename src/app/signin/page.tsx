'use client';

import React, { ReactElement } from 'react';
import Image from 'next/image';
import { SigninForm } from '../components/signin/SigninForm';

export default function Page(): ReactElement {
    return (
        <section className="max-w-6xl mx-auto min-h-screen grid place-items-center">
            <div className="w-full h-auto flex items-center justify-between p-8 bg-white rounded-lg shadow-sm">
                <div className="relative w-1/2 h-[400px]">
                    <Image src="svg/signin/signin.svg" alt="signin-illustration" fill />
                </div>
                <SigninForm />
            </div>
        </section>
    );
}
