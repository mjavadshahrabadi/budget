'use client';

import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { UpsertCartModal } from '@/src/app/components/dashboard/cart/UpsertCartModal';
import { CartTable } from '@/src/app/components/dashboard/cart/CartTable';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';

const carts: ICartRow[] = [
    {
        id: 1,
        creditCartNumber: '1234432112344321',
        balance: 200000,
        limitation: 100000,
        expireDate: '2026-12-07',
        cvv2: 123,
        actions: true,
    },
    {
        id: 2,
        creditCartNumber: '1234432112344321',
        balance: 200000,
        limitation: 100000,
        expireDate: '2026-12-07',
        cvv2: 123,
        actions: true,
    },
];

export default function Page() {
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <div className="bg-white m-5 p-5 rounded-md">
            <UpsertCartModal isOpen={isOpen} onClose={onClose} />
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2">
                    <Chip className="bg-indigo-500 text-white">۲</Chip>
                    <span>تعداد کارت های بانکی</span>
                </div>
                <div>
                    <Button type="button" className="bg-indigo-500 text-white" onPress={onOpen}>
                        افزودن کارت جدید{' '}
                    </Button>
                </div>
            </div>
            <CartTable carts={carts} />
        </div>
    );
}
