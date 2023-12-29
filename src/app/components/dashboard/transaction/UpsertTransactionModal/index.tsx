'use client';
import { FC, ReactElement } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea,
    Autocomplete,
    AutocompleteItem,
} from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';
import toast from 'react-hot-toast';
import API from '@/src/app/utils/API';

interface IUpsertTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    creditCarts: ICartRow[];
    getAllTransaction: () => void;
}

interface IFormValues {
    type: string;
    creditCardNumber: string;
    date: string;
    amount: number;
    description: string;
}

const schema = Yup.object().shape({
    type: Yup.string().required().oneOf(['ورودی', 'خروجی']),
    date: Yup.string().required(),
    amount: Yup.number()
        .positive()
        .required()
        .test('value', 'value', (value) => value > 0),
    description: Yup.string().min(5).max(2000).required(),
    creditCardNumber: Yup.string().required(),
});

export const UpsertTransactionModal: FC<IUpsertTransactionModalProps> = (props): ReactElement => {
    const { onClose, isOpen, creditCarts = [], getAllTransaction = () => {} } = props;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            amount: 0,
            type: 'خروجی',
            date: new Date().toISOString().slice(0, 10),
        },
        mode: 'all',
    });

    const onFormSubmitHandler: SubmitHandler<IFormValues> = async (data) => {
        const cart = creditCarts.find((cart) => cart.creditCardNumber === data['creditCardNumber']);
        if (cart) {
            try {
                const response = await API.post('account/transaction/add', {
                    ...data,
                    type: data['type'] === 'ورودی' ? 0 : 1,
                    cartId: cart.id,
                });
                const result = response.data;
                if (result.success && result.data) {
                    getAllTransaction();
                    onClose();
                    toast.success('تراکنش با موفقیت اضافه شد');
                }
            } catch (error) {
                toast.error('اضافه کردن تراکنش با خطا مواجه شد');
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit(onFormSubmitHandler)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[14px]">افزودن تراکنش جدید</ModalHeader>
                            <ModalBody dir="rtl" className="flex flex-col space-y-4">
                                <Autocomplete
                                    isRequired
                                    label="انتخاب کارت بانکی"
                                    className="min-w-full"
                                    isInvalid={!!errors.creditCardNumber}
                                    defaultItems={creditCarts.map((cart) => ({
                                        label: cart.creditCardNumber,
                                        value: cart.creditCardNumber,
                                    }))}
                                    {...register('creditCardNumber')}
                                    scrollShadowProps={{ isEnabled: false }}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                                <Autocomplete
                                    isRequired
                                    label="نوع تراکنش"
                                    className="min-w-full"
                                    isInvalid={!!errors.type}
                                    defaultSelectedKey={'خروجی'}
                                    items={[
                                        { value: 'ورودی', label: 'ورودی' },
                                        { value: 'خروجی', label: 'خروجی' },
                                    ]}
                                    {...register('type')}
                                    scrollShadowProps={{ isEnabled: false }}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                                <Input
                                    label="مبلغ به تومان"
                                    isRequired
                                    value={watch('amount').toString()}
                                    type="number"
                                    {...register('amount')}
                                    isInvalid={!!errors.amount}
                                />

                                <Input
                                    label="تاریخ ثبت"
                                    isRequired
                                    value={watch('date')}
                                    type="date"
                                    {...register('date')}
                                    isInvalid={!!errors.date}
                                />

                                <Textarea
                                    isRequired
                                    label="توضیحات"
                                    value={watch('description')}
                                    className="min-w-full"
                                    {...register('description')}
                                    isInvalid={!!errors.description}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-indigo-500 text-white" type="submit">
                                    ثبت
                                </Button>
                                <Button className="text-gray-700" variant="light" onPress={onClose} type="button">
                                    بازگشت
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </form>
        </Modal>
    );
};
