'use client';

import { FC, ReactElement, useEffect, useState } from 'react';

import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import API from '@/src/app/utils/API';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';
import toast from 'react-hot-toast';
import { ITransactionRow } from '@/src/app/components/dashboard/transaction/types';
import { TransactionTable } from '@/src/app/components/dashboard/transaction/TransactionTable';

interface IFormValues {
    lt?: string | null;
    gt?: string | null;
    creditCardNumber?: string | null;
    transactionType?: string | null;
}

export const ReportingFilteringForm: FC = (): ReactElement => {
    const { register, handleSubmit } = useForm<IFormValues>({
        defaultValues: {
            creditCardNumber: '',
            gt: '',
            lt: '',
            transactionType: '',
        },
    });
    const [carts, setCarts] = useState<ICartRow[]>([]);
    const [transaction, setTransaction] = useState<ITransactionRow[]>([]);
    const [filteredTransaction, setFilteredTransaction] = useState<ITransactionRow[]>([]);

    const getAllTransactions = async () => {
        try {
            const response = await API.get('account/transaction/all');
            const result = response.data;
            if (result.success && result.data) {
                const normalizeData = result.data.map((cart: ICartRow) => ({ ...cart, action: true }));
                setTransaction(normalizeData);
                setFilteredTransaction(normalizeData);
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

    const onFilterHandler: SubmitHandler<IFormValues> = (data) => {
        if (data.lt === '' && data.gt === '' && data.creditCardNumber === '' && data.transactionType === '') {
            getAllTransactions();
        }

        let filteredTransaction = transaction;
        if (data.lt) {
            const value = +data.lt;
            filteredTransaction = filteredTransaction.filter((item) => item.amount <= value);
        }
        if (data.gt) {
            const value = +data.gt;
            filteredTransaction = filteredTransaction.filter((item) => item.amount >= value);
        }

        if (data.transactionType) {
            if (data.transactionType === 'ورودی') {
                filteredTransaction = filteredTransaction.filter((item) => +item.type === 0);
            } else {
                filteredTransaction = filteredTransaction.filter((item) => +item.type === 1);
            }
        }

        if (data.creditCardNumber) {
            const findCartById = carts.find((cart) => cart.creditCardNumber === data.creditCardNumber)!;
            filteredTransaction = filteredTransaction.filter((item) => +item.cartId === +findCartById?.id);
        }
        setFilteredTransaction(filteredTransaction);
    };

    return (
        <form className="bg-white m-5 p-5 rounded-md" onSubmit={handleSubmit(onFilterHandler)}>
            <div className="grid grid-cols-4 gap-5 mb-5" dir="rtl">
                <Autocomplete
                    id="type"
                    label="فیلتر بر اساس نوع تراکنش"
                    defaultItems={[
                        { label: 'ورودی', value: 'ورودی' },
                        { label: 'خروجی', value: 'خروجی' },
                    ]}
                    {...register('transactionType')}
                >
                    {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete
                    id="creditCardNumber"
                    label="فیلتر بر اساس کارت بانکی"
                    defaultItems={carts.map((cart) => ({ label: cart.creditCardNumber, value: cart.creditCardNumber }))}
                    {...register('creditCardNumber')}
                >
                    {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                </Autocomplete>

                <Input type="number" label="مبالغ کمتر از" {...register('lt')} />
                <Input type="number" label="مبالغ بیشتر از" {...register('gt')} />
                <Button type="submit" className="w-1/2 bg-indigo-500 text-white self-center">
                    اعمال فیلتر
                </Button>
            </div>

            <TransactionTable transactions={filteredTransaction} carts={carts} getAllTransaction={getAllTransactions} />
        </form>
    );
};
