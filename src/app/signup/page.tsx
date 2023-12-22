'use client';

import React, { ReactElement } from 'react';
import Image from 'next/image';
import { SignupForm } from '../components/signup/SignupForm';

export default function Page(): ReactElement {
    return (
        <section className="max-w-5xl mx-auto min-h-screen grid place-items-center">
            <div className="w-full h-auto flex items-center justify-between p-8 bg-white rounded-lg shadow-sm">
                <div className="relative w-1/2 h-[400px]">
                    <Image src="svg/signup/signup.svg" alt="signup-illustration" fill />
                </div>
                <SignupForm />
            </div>
        </section>
    );
}
