import type { Metadata } from 'next';
import { Fragment } from 'react';
import { Sidebar } from '../../components/common/Sidebar';
import IsAuth from '@/src/app/components/Auth';

export const metadata: Metadata = {
    title: 'ورود به حساب کاربری',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <Fragment>
            <IsAuth>
                <section className="w-full grid grid-cols-12">
                    <div className="col-span-10">{children}</div>
                    <div className="col-span-2 relative">
                        <Sidebar />
                    </div>
                </section>
            </IsAuth>
        </Fragment>
    );
}
