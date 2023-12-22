import { FC, ReactElement, useCallback } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    getKeyValue,
} from '@nextui-org/react';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';

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

interface ICartSignature {
    [key: string]: string | number;
}
export const CartTable: FC<ICartTableProps> = (props): ReactElement => {
    const { carts } = props;
    const renderCell = useCallback((cart: ICartRow, columnKey: string) => {
        const cellValue = cart[columnKey] as number | string;
        switch (columnKey) {
            case 'creditCartNumber':
                return (
                    <span>
                        {cart.creditCartNumber.slice(0, 4) +
                            '-' +
                            cart.creditCartNumber.slice(4, 8) +
                            '-' +
                            cart.creditCartNumber.slice(8, 12) +
                            '-' +
                            cart.creditCartNumber.slice(12, 16) ?? ''}
                    </span>
                );
            case 'cvv2':
                return <span>{cart.cvv2 ?? ''}</span>;
            case 'expireDate':
                return <span>{cart.expireDate ?? ''}</span>;
            case 'balance':
                return <span>{cart.balance ?? ''}</span>;
            case 'limitation':
                return <span>{cart.limitation ?? ''}</span>;
            case 'actions':
                return <span>actions</span>;
            // case 'actions':
            //     return (
            //         <div className="relative flex items-center gap-2">
            //             <Tooltip content="Details">
            //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            //                     <EyeIcon />
            //                 </span>
            //             </Tooltip>
            //             <Tooltip content="Edit user">
            //                 <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            //                     <EditIcon />
            //                 </span>
            //             </Tooltip>
            //             <Tooltip color="danger" content="Delete user">
            //                 <span className="text-lg text-danger cursor-pointer active:opacity-50">
            //                     <DeleteIcon />
            //                 </span>
            //             </Tooltip>
            //         </div>
            //     );
            default:
                return cellValue ?? '';
        }
    }, []);
    return (
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
                        {(columnKey) => <TableCell className="text-center">{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};
