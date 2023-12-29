'use client';

import { useState } from 'react';
import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { UpsertTransactionModal } from '@/src/app/components/dashboard/transaction/UpsertTransactionModal';
import { TransactionTable } from '@/src/app/components/dashboard/transaction/TransactionTable';
import API from '@/src/app/utils/API';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';
import toast from 'react-hot-toast';
import { ITransactionRow } from '@/src/app/components/dashboard/transaction/types';
import { useEffect } from 'react';

export default function Page() {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const [transactions, setTransaction] = useState<ITransactionRow[]>([]);
    const [carts, setCarts] = useState<ICartRow[]>([]);

    const getAllTransactions = async () => {
        try {
            const response = await API.get('account/transaction/all');
            const result = response.data;
            if (result.success && result.data) {
                const normalizeData = result.data.map((cart: ICartRow) => ({ ...cart, action: true }));
                setTransaction(normalizeData);
            }
        } catch (error) {
            toast.error('مشکلی در بارگذاری تراکنش ها رخ داده است');
        }
    };
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
        getAllTransactions();
        getAllCarts();
    }, []);

    return (
        <div className="bg-white m-5 p-5 rounded-md">
            <UpsertTransactionModal
                isOpen={isOpen}
                onClose={onClose}
                creditCarts={carts}
                getAllTransaction={getAllTransactions}
            />
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2">
                    <Chip className="bg-indigo-500 text-white">{transactions.length ?? 0}</Chip>
                    <span>تعداد تراکنش ها</span>
                </div>
                <div>
                    <Button type="button" className="bg-indigo-500 text-white" onPress={onOpen}>
                        افزودن تراکنش جدید
                    </Button>
                </div>
            </div>
            <TransactionTable transactions={transactions} carts={carts} getAllTransaction={getAllTransactions} />
        </div>
    );
}
