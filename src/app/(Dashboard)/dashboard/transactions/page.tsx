'use client';

import { Button, Chip, useDisclosure } from '@nextui-org/react';
import { UpsertTransactionModal } from '@/src/app/components/dashboard/transaction/UpsertTransactionModal';
import { TransactionTable } from '@/src/app/components/dashboard/transaction/TransactionTable';

export default function Page() {
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <div className="bg-white m-5 p-5 rounded-md">
            <UpsertTransactionModal isOpen={isOpen} onClose={onClose} creditCarts={[]} />
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2">
                    <Chip className="bg-indigo-500 text-white">۲</Chip>
                    <span>تعداد تراکنش ها</span>
                </div>
                <div>
                    <Button type="button" className="bg-indigo-500 text-white" onPress={onOpen}>
                        افزودن تراکنش جدید
                    </Button>
                </div>
            </div>
            <TransactionTable
                transactions={[
                    {
                        transactionId: '1',
                        description: 'توضیحات مربوط به خرید',
                        date: '2023-04-01',
                        amount: 12000,
                        actions: true,
                        type: 'input',
                        creditCartNumber: '123321123321123321',
                    },
                    {
                        transactionId: '2',
                        description: 'توضیحات مربوط به خرید',
                        date: '2021-03-12',
                        amount: 50000,
                        actions: true,
                        type: 'output',
                        creditCartNumber: '123321123321123321',
                    },
                ]}
            />
        </div>
    );
}
