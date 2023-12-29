'use client';
import { useEffect, useState } from 'react';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { UpsertCartModal } from '@/src/app/components/dashboard/cart/UpsertCartModal';
import { CartTable } from '@/src/app/components/dashboard/cart/CartTable';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';
import API from '@/src/app/utils/API';
import toast from 'react-hot-toast';

export default function Page() {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [carts, setCarts] = useState<ICartRow[]>([]);

    const getAllCarts = async () => {
        try {
            const response = await API.get('account/cart/get-all-carts');
            const result = response.data;
            if (result.success && result.data) {
                const normalizeData = result.data.map((cart: ICartRow) => ({ ...cart, action: true }));
                setCarts(normalizeData);
            }
        } catch (error) {
            toast.error('مشکلی در بارگذاری کارت های بانکی رخ داده است');
        }
    };

    useEffect(() => {
        getAllCarts();
    }, []);

    return (
        <div className="bg-white m-5 p-5 rounded-md">
            <UpsertCartModal isOpen={isOpen} onClose={onClose} getAllCarts={getAllCarts} />
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2">
                    <Chip className="bg-indigo-500 text-white">{carts.length}</Chip>
                    <span>تعداد کارت های بانکی</span>
                </div>
                <div>
                    <Button type="button" className="bg-indigo-500 text-white" onPress={onOpen}>
                        افزودن کارت جدید{' '}
                    </Button>
                </div>
            </div>
            <CartTable carts={carts} getAllCarts={getAllCarts} />
        </div>
    );
}
