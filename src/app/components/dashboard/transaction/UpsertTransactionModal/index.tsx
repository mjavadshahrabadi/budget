import { FC, ReactElement, useEffect } from 'react';
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
import { ITransactionRow } from '@/src/app/components/dashboard/transaction/types';
import { ICartRow } from '@/src/app/components/dashboard/cart/types';

interface IUpsertTransactionModalProps {
    edit?: boolean;
    editFormData?: ITransactionRow;
    isOpen: boolean;
    onClose: () => void;
    creditCarts: ICartRow[];
}

interface IFormValues {
    type: string;
    creditCartNumber: string;
    date: string;
    amount: number;
    description: string;
}

const schema = Yup.object().shape({
    type: Yup.string().required().oneOf(['ورودی', 'خروجی']),
    date: Yup.string().required(),
    amount: Yup.number().positive().required(),
    description: Yup.string().min(5).max(2000).required(),
    creditCartNumber: Yup.string().required(),
});

export const UpsertTransactionModal: FC<IUpsertTransactionModalProps> = (props): ReactElement => {
    const { onClose, isOpen, edit = false, editFormData, creditCarts = [] } = props;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            amount: 0,
            type: 'input',
            date: new Date().toISOString().slice(0, 10),
        },
        mode: 'all',
    });

    const onFormSubmitHandler: SubmitHandler<IFormValues> = (data) => {
        console.log('data:', data);
    };

    useEffect(() => {
        if (editFormData && edit) {
            setValue('creditCartNumber', editFormData.creditCartNumber);
            setValue('amount', editFormData.amount);
            setValue('type', editFormData.type);
            setValue('date', editFormData.date);
            setValue('description', editFormData.description);
        }
    }, [editFormData, edit]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit(onFormSubmitHandler)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[14px]">
                                {edit ? 'ویرایش' : 'افزودن'} تراکنش
                            </ModalHeader>
                            <ModalBody dir="rtl" className="flex flex-col space-y-4">
                                <Autocomplete
                                    isRequired
                                    defaultSelectedKey={
                                        editFormData?.creditCartNumber && editFormData?.creditCartNumber
                                    }
                                    label="انتخاب کارت بانکی"
                                    className="min-w-full"
                                    isInvalid={!!errors.creditCartNumber}
                                    defaultItems={[{ label: '123321123321123321', value: '123321123321123321' }]}
                                    {...register('creditCartNumber')}
                                    scrollShadowProps={{ isEnabled: false }}
                                >
                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                                <Autocomplete
                                    isRequired
                                    label="نوع تراکنش"
                                    className="min-w-full"
                                    isInvalid={!!errors.type}
                                    defaultSelectedKey={editFormData?.type ? editFormData.type : 'خروجی'}
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
