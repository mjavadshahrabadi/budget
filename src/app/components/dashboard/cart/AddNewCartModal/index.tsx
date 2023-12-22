import { FC, ReactElement } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IAddNewCartModal {
    isOpen: boolean;
    onClose: () => void;
}

interface IFormValues {
    creditCartNumber: string;
    cvv2: number;
    expireDate: Date;
    limitation?: number;
    balance: number;
}

const schema = Yup.object().shape({
    creditCartNumber: Yup.string().length(16).required(),
    cvv2: Yup.number()
        .required()
        .test('cvv2', 'length gate', (value) => value.toString().length === 3)
        .required(),
    expireDate: Yup.date().required(),
    limitation: Yup.number()
        .transform((value) => (!value ? 0 : value))
        .test('test limitation', '<= balance', (value, context) => {
            return !value || (value >= 0 && value <= context.parent.balance);
        }),
    balance: Yup.number().positive().required(),
});

export const AddNewCartModal: FC<IAddNewCartModal> = (props): ReactElement => {
    const { onClose, isOpen } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {},
        mode: 'all',
    });
    //
    const onFormSubmitHandler: SubmitHandler<IFormValues> = (data) => {
        console.log('data:', data);
    };

    console.log('errors:', errors);
    //
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit(onFormSubmitHandler)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[14px]">افزودن کارت بانکی</ModalHeader>
                            <ModalBody dir="rtl" className="flex flex-col space-y-4">
                                <Input
                                    label="شماره کارت بانکی"
                                    isRequired
                                    type="text"
                                    maxLength={16}
                                    {...register('creditCartNumber')}
                                    isInvalid={!!errors.creditCartNumber}
                                />
                                <Input
                                    label="cvv2"
                                    isRequired
                                    type="number"
                                    {...register('cvv2')}
                                    isInvalid={!!errors.cvv2}
                                />
                                <Input
                                    label="تاریخ انقضا"
                                    isRequired
                                    defaultValue={new Date().toISOString().slice(0, 10)}
                                    type="date"
                                    {...register('expireDate')}
                                    isInvalid={!!errors.expireDate}
                                />
                                <Input
                                    defaultValue="20000"
                                    label="موجودی کارت (تومان)"
                                    isRequired
                                    type="number"
                                    {...register('balance')}
                                    isInvalid={!!errors.balance}
                                />
                                <Input
                                    label="محدودیت کارت (تومان)"
                                    type="number"
                                    defaultValue="0"
                                    min={0}
                                    {...register('limitation')}
                                    isInvalid={!!errors.limitation}
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
