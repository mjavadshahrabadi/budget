'use client';

import { FC, ReactElement, useMemo } from 'react';
import {
    UserIcon,
    ArrowTrendingUpIcon,
    CreditCardIcon,
    ArrowsRightLeftIcon,
    ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/src/app/hook/useLocalStorage';
import { useAuth } from '@/src/store';

export const Sidebar: FC = (): ReactElement => {
    const pathName = usePathname();
    const currentPath: string = useMemo(() => pathName.split('/')[2], [pathName]);
    const router = useRouter();
    const { removeLocalStorageItem } = useLocalStorage();
    const { setLogin } = useAuth();

    const onLogout = () => {
        removeLocalStorageItem('token');
        setLogin(null);
        router.replace('/signin');
    };

    return (
        <aside className="w-full h-screen" dir="rtl">
            <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-sm text-gray-800">
                <div className="mb-5 pr-2 flex items-center gap-x-1">
                    <Avatar src="/jpeg/other/avatar.jpg" size="md" />
                    <div className="flex flex-col space-y-2">
                        <span className="text-[14px] font-semibold whitespace-nowrap">جواد شهرآبادی</span>
                    </div>
                </div>
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link
                            href="/dashboard/profile"
                            className={`${currentPath === 'profile' ? 'bg-indigo-500 text-white' : null} sidebar_item`}
                        >
                            <UserIcon className="w-5 h-5" />
                            <span className="text-[15px]">حساب کاربری</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/cart"
                            className={`${currentPath === 'cart' ? 'bg-indigo-500 text-white' : null} sidebar_item`}
                        >
                            <CreditCardIcon className="w-5 h-5" />
                            <span className="text-[15px]">کارت های من</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/transactions"
                            className={`${
                                currentPath === 'transactions' ? 'bg-indigo-500 text-white' : null
                            } sidebar_item`}
                        >
                            <ArrowsRightLeftIcon className="w-5 h-5" />
                            <span className="text-[15px]">تراکنش ها</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/reporting"
                            className={`${
                                currentPath === 'reporting' ? 'bg-indigo-500 text-white' : null
                            } sidebar_item`}
                        >
                            <ArrowTrendingUpIcon className="w-5 h-5" />
                            <span className="text-[15px]">گزارش گیری</span>
                        </Link>
                    </li>{' '}
                    <li className="sidebar_item" onClick={onLogout}>
                        <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                        <span className="text-[15px]">خروج</span>
                    </li>
                </ul>
            </div>
        </aside>
    );
};
