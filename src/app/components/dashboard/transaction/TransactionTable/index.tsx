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
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { DeleteConfirmModal } from '@/src/app/components/common/DeleteConfirmModal';
import { ITransactionRow } from '@/src/app/components/dashboard/transaction/types';
import { UpsertTransactionModal } from '@/src/app/components/dashboard/transaction/UpsertTransactionModal';

const columns: { name: string; uid: string }[] = [
    { name: 'ویرایش', uid: 'actions' },
    { name: 'توضیحات', uid: 'description' },
    { name: 'تاریخ', uid: 'date' },
    { name: 'نوع تراکنش', uid: 'type' },
    { name: 'مبلغ به تومان', uid: 'amount' },
    { name: 'شماره کارت', uid: 'creditCartNumber' },
];

interface ICartTableProps {
    transactions: ITransactionRow[];
}

export const TransactionTable: FC<ICartTableProps> = (props): ReactElement => {
    const { transactions } = props;
    const { isOpen: isDeleteOpen, onClose: onDeleteClose, onOpen: onDeleteOpen } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState<ITransactionRow>();
    const { isOpen: isEditOpen, onClose: onEditClose, onOpen: onEditOpen } = useDisclosure();

    const renderCell = useCallback((transaction: ITransactionRow, columnKey: keyof ITransactionRow) => {
        const cellValue = transaction[columnKey];

        switch (columnKey) {
            case 'creditCartNumber':
                return <span className="text-[13px]">{transaction.creditCartNumber}</span>;
            case 'amount':
                return <span className="text-[13px]">{transaction.amount ?? ''}</span>;
            case 'type':
                return <span className="text-[13px]">{transaction.type ?? ''}</span>;
            case 'date':
                return <span className="text-[13px]">{transaction.date ?? ''}</span>;
            case 'description':
                return <span className="text-[13px]">{transaction.description ?? ''}</span>;
            case 'actions':
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip content="ویرایش">
                            <span className="rounded-md">
                                <PencilIcon
                                    className="w-5 h-5 cursor-pointer text-gray-500"
                                    onClick={() => {
                                        setSelectedRow(transaction);
                                        onEditOpen();
                                    }}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip content="حذف">
                            <span
                                className="rounded-md"
                                onClick={() => {
                                    setSelectedRow(transaction);
                                    onDeleteOpen();
                                }}
                            >
                                <TrashIcon className="w-5 h-5 cursor-pointer text-red-500" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue ?? '';
        }
    }, []);
    return (
        <Fragment>
            <DeleteConfirmModal title="حذف تراکنش" isOpen={isDeleteOpen} onClose={onDeleteClose} onDelete={() => {}} />
            <UpsertTransactionModal
                isOpen={isEditOpen}
                onClose={onEditClose}
                edit={true}
                editFormData={selectedRow}
                creditCarts={[]}
            />
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
                        <TableRow key={item.transactionId}>
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
