'use client';

import { FC, Fragment, ReactElement, useCallback, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    useDisclosure,
} from '@nextui-org/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { DeleteConfirmModal } from '@/src/app/components/common/DeleteConfirmModal';
import { ITransactionRow } from '@/src/app/components/dashboard/transaction/types';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';
import toast from 'react-hot-toast';
import API from '@/src/app/utils/API';

const columns: { name: string; uid: string }[] = [
    { name: 'ویرایش', uid: 'actions' },
    { name: 'توضیحات', uid: 'description' },
    { name: 'تاریخ', uid: 'date' },
    { name: 'نوع تراکنش', uid: 'type' },
    { name: 'مبلغ به تومان', uid: 'amount' },
    { name: 'شماره کارت', uid: 'cartId' },
];

interface ICartTableProps {
    transactions: ITransactionRow[];
    carts: ICartRow[];
    getAllTransaction: () => void;
}

export const TransactionTable: FC<ICartTableProps> = (props): ReactElement => {
    const { transactions, carts = [], getAllTransaction = () => {} } = props;

    const { isOpen: isDeleteOpen, onClose: onDeleteClose, onOpen: onDeleteOpen } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState<ITransactionRow>();

    const onDelete = async () => {
        try {
            const response = await API.post('account/transaction/delete', {
                transactionId: selectedRow?.id,
            });
            const result = response.data;
            if (result.success && result.data) {
                onDeleteClose();
                toast.success('تراکنش با موفقیت حذف شد');
                getAllTransaction();
            }
        } catch (error) {
            toast.error('حذف تراکنش با خطا مواجه شد');
        }
    };

    const renderCell = useCallback(
        (transaction: ITransactionRow, columnKey: keyof ITransactionRow) => {
            const cellValue = transaction[columnKey];
            let creditCartNumber = null;
            if (columnKey === 'cartId')
                creditCartNumber = carts.find((cart) => cart.id === +transaction.cartId)?.creditCardNumber;
            switch (columnKey) {
                case 'cartId':
                    return <span className="text-[13px]">{creditCartNumber ?? ''}</span>;
                case 'amount':
                    return <span className="text-[13px]">{transaction.amount ?? ''}</span>;
                case 'type':
                    return (
                        <span
                            className={`text-[13px] py-1 px-4 rounded-lg ${
                                +transaction.type === 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}
                        >
                            {+transaction.type === 1 ? 'خروجی' : 'ورودی' ?? ''}
                        </span>
                    );
                case 'date':
                    return <span className="text-[13px]">{transaction.createdAt.slice(0, 10) ?? ''}</span>;
                case 'description':
                    return <span className="text-[13px]">{transaction.description ?? ''}</span>;
                case 'actions':
                    return (
                        <div className="flex items-center justify-center">
                            <Tooltip content="حذف">
                                <span className="rounded-md">
                                    <TrashIcon
                                        className="w-5 h-5 cursor-pointer text-red-500"
                                        onClick={() => {
                                            setSelectedRow(transaction);
                                            onDeleteOpen();
                                        }}
                                    />
                                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue ?? '';
            }
        },
        [carts],
    );
    return (
        <Fragment>
            <DeleteConfirmModal title="حذف تراکنش" isOpen={isDeleteOpen} onClose={onDeleteClose} onDelete={onDelete} />
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align="center" className="text-center">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={transactions}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell className="text-center">
                                    {renderCell(item, columnKey as keyof ITransactionRow)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Fragment>
    );
};
