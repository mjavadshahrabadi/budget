import { FC, ReactElement } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Toaster } from 'react-hot-toast';

interface IPasswordRecoveryProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IFormValues {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const schema = Yup.object().shape({
    currentPassword: Yup.string().min(8).required(),
    newPassword: Yup.string().min(8).required(),
    confirmNewPassword: Yup.string()
        .min(8)
        .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
        .required(),
});

export const PasswordRecoveryModal: FC<IPasswordRecoveryProps> = (props): ReactElement => {
    const { onClose, isOpen } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        mode: 'all',
    });

    const onFormSubmitHandler: SubmitHandler<IFormValues> = (data) => {
        console.log('data:', data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <form onSubmit={handleSubmit(onFormSubmitHandler)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-[14px]">تغییر رمز عبور</ModalHeader>
                            <ModalBody dir="rtl" className="flex flex-col space-y-4">
                                <Input
                                    label="رمز عبور فعلی"
                                    isRequired
                                    type="password"
                                    {...register('currentPassword')}
                                    isInvalid={!!errors.currentPassword}
                                />
                                <Input
                                    label="رمز عبور جدید"
                                    isRequired
                                    type="password"
                                    {...register('newPassword')}
                                    isInvalid={!!errors.newPassword}
                                />
                                <Input
                                    label="تکرار رمز عبور جدید"
                                    isRequired
                                    type="password"
                                    {...register('confirmNewPassword')}
                                    isInvalid={!!errors.confirmNewPassword}
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
