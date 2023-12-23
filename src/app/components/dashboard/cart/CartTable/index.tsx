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
    Chip,
} from '@nextui-org/react';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { DeleteConfirmModal } from '@/src/app/components/common/DeleteConfirmModal';
import { UpsertCartModal } from '@/src/app/components/dashboard/cart/UpsertCartModal';

const columns: { name: string; uid: string }[] = [
    { name: 'ویرایش', uid: 'actions' },
    { name: 'محدودیت کارت به تومان', uid: 'limitation' },
    { name: 'موجودی کارت به تومان', uid: 'balance' },
    { name: 'تاریخ انقضا', uid: 'expireDate' },
    { name: 'CVV2', uid: 'cvv2' },
    { name: 'شماره کارت', uid: 'creditCartNumber' },
];

interface ICartTableProps {
    carts: ICartRow[];
}

export const CartTable: FC<ICartTableProps> = (props): ReactElement => {
    const { carts } = props;
    const { isOpen: isDeleteOpen, onClose: onDeleteClose, onOpen: onDeleteOpen } = useDisclosure();
    const [selectedRow, setSelectedRow] = useState<ICartRow>();
    const { isOpen: isEditOpen, onClose: onEditClose, onOpen: onEditOpen } = useDisclosure();

    const renderCell = useCallback((cart: ICartRow, columnKey: keyof ICartRow) => {
        const cellValue = cart[columnKey];
        switch (columnKey) {
            case 'creditCartNumber':
                return <span className="text-[13px]">{cart.creditCartNumber}</span>;
            case 'cvv2':
                return <span className="text-[13px]">{cart.cvv2 ?? ''}</span>;
            case 'expireDate':
                return <span className="text-[13px]">{cart.expireDate ?? ''}</span>;
            case 'limitation':
                return (
                    <Chip size="sm" className="bg-red-100 text-red-600">
                        {cart.limitation ?? ''}
                    </Chip>
                );
            case 'balance':
                return (
                    <Chip size="sm" className="bg-green-100 text-green-600 font-semibold">
                        {cart.balance ?? ''}
                    </Chip>
                );
            case 'actions':
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Tooltip content="ویرایش">
                            <span className="rounded-md">
                                <PencilIcon
                                    className="w-5 h-5 cursor-pointer text-gray-500"
                                    onClick={() => {
                                        setSelectedRow(cart);
                                        onEditOpen();
                                    }}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip content="حذف">
                            <span
                                className="rounded-md"
                                onClick={() => {
                                    setSelectedRow(cart);
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
            <DeleteConfirmModal title="حذف کارت" isOpen={isDeleteOpen} onClose={onDeleteClose} onDelete={() => {}} />
            <UpsertCartModal isOpen={isEditOpen} onClose={onEditClose} edit={true} editFormData={selectedRow} />
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align="center" className="text-center">
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={carts}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell className="text-center">
                                    {renderCell(item, columnKey as keyof ICartRow)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Fragment>
    );
};
