import { FC, ReactElement, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';

interface IAddNewCartModal {
    edit?: boolean;
    editFormData?: ICartRow;
    isOpen: boolean;
    onClose: () => void;
}

interface IFormValues {
    creditCartNumber: string;
    cvv2: number;
    expireDate: string;
    limitation?: number;
    balance: number;
}

const schema = Yup.object().shape({
    creditCartNumber: Yup.string().length(16).required(),
    cvv2: Yup.number()
        .required()
        .required()
        .test('cvv2', 'length gate', (value) => value.toString().length === 3),
    expireDate: Yup.string().required(),
    limitation: Yup.number()
        .transform((value) => (!value ? 0 : value))
        .test('test limitation', '<= balance', (value, context) => {
            return !value || (value >= 0 && value <= context.parent.balance);
        }),
    balance: Yup.number()
        .required()
        .test('balance', 'range', (value) => value >= 1000),
});

export const UpsertCartModal: FC<IAddNewCartModal> = (props): ReactElement => {
    const { onClose, isOpen, edit = false, editFormData } = props;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            balance: 0,
            cvv2: 0,
            limitation: 0,
            expireDate: new Date().toISOString().slice(0, 10),
            creditCartNumber: '',
        },
        mode: 'all',
    });

    const onFormSubmitHandler: SubmitHandler<IFormValues> = (data) => {
        console.log('data:', data);
    };

    useEffect(() => {
        console.warn(editFormData);
        if (editFormData && edit) {
            setValue('creditCartNumber', editFormData.creditCartNumber);
            setValue('cvv2', editFormData.cvv2);
            setValue('expireDate', editFormData.expireDate);
            setValue('balance', editFormData.balance);
            setValue('limitation', editFormData.limitation);
        }
    }, [editFormData, edit]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit(onFormSubmitHandler)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[14px]">
                                {edit ? 'ویرایش' : 'افزودن'} کارت بانکی
                            </ModalHeader>
                            <ModalBody dir="rtl" className="flex flex-col space-y-4">
                                <Input
                                    label="شماره کارت بانکی"
                                    isRequired
                                    value={watch('creditCartNumber')}
                                    type="text"
                                    maxLength={16}
                                    {...register('creditCartNumber')}
                                    isInvalid={!!errors.creditCartNumber}
                                />
                                <Input
                                    label="cvv2"
                                    isRequired
                                    value={watch('cvv2').toString()}
                                    type="number"
                                    {...register('cvv2')}
                                    isInvalid={!!errors.cvv2}
                                />
                                <Input
                                    label="تاریخ انقضا"
                                    isRequired
                                    value={watch('expireDate')}
                                    type="date"
                                    {...register('expireDate')}
                                    isInvalid={!!errors.expireDate}
                                />
                                <Input
                                    value={watch('balance').toString()}
                                    label="موجودی کارت (تومان)"
                                    isRequired
                                    type="number"
                                    {...register('balance')}
                                    isInvalid={!!errors.balance}
                                />
                                <Input
                                    label="محدودیت کارت (تومان)"
                                    value={watch('limitation')?.toString()}
                                    type="number"
                                    min={0}
                                    {...register('limitation')}
                                    isInvalid={!!errors.limitation}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-indigo-500 text-white" type="submit">
                                    {edit ? 'ویرایش' : 'ثبت'}
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
