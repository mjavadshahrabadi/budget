import { FC, Fragment, ReactElement } from 'react';
import { Button, Input, AutocompleteItem, Autocomplete, useDisclosure } from '@nextui-org/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { PasswordRecoveryModal } from '@/src/app/components/dashboard/profile/PasswordRecoveryModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

interface IFormValues {
    fullName: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    state?: string;
    job?: string;
    degreeOfEducation?: string;
}

const schema = Yup.object().shape({
    fullName: Yup.string().min(5).max(50).required(),
    email: Yup.string(),
    phoneNumber: Yup.string().test('phoneNumber', 'length of phone number', (value) => !value || value.length === 11),
    address: Yup.string().test(
        'address',
        'Length of address',
        (value) => !value || (value.length >= 5 && value.length <= 255),
    ),
    state: Yup.string(),
    degreeOfEducation: Yup.string(),
    job: Yup.string().test('job', 'length of job', (value) => !value || (value.length >= 4 && value.length <= 100)),
});

export const ProfileForm: FC = (): ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            address: '',
            degreeOfEducation: '',
            state: '',
            phoneNumber: '',
            job: '',
            email: '',
            fullName: '',
        },
        mode: 'all',
    });

    const onSubmitFormHandler: SubmitHandler<IFormValues> = (data) => {
        console.log('data:', data);
        toast.success('فرم با موفقیت ارسال شد');
    };

    console.log('error:', errors);

    return (
        <Fragment>
            <PasswordRecoveryModal isOpen={isOpen} onClose={onClose} />
            <form
                className="bg-white rounded-md shadow-sm m-5 p-5"
                dir="rtl"
                onSubmit={handleSubmit(onSubmitFormHandler)}
            >
                <div className="flex items-center gap-x-1">
                    <PencilSquareIcon className="w-6 h-6 text-gray-800" />
                    <h1 className="text-[15px] font-semibold text-gray-700">ویرایش اطلاعات کاربری</h1>
                </div>

                <div className="grid grid-cols-3 mt-10 gap-8">
                    <div>
                        <Input
                            id="email"
                            label="ایمیل"
                            type="email"
                            isRequired
                            isReadOnly
                            value="test@test.com"
                            {...register('email')}
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            id="fullName"
                            label="نام کاربری"
                            maxLength={50}
                            type="text"
                            isRequired
                            {...register('fullName')}
                            isInvalid={!!errors.fullName}
                        />
                    </div>
                    <div>
                        <Input
                            id="phoneNumber"
                            label="شماره تلفن"
                            maxLength={11}
                            type="text"
                            {...register('phoneNumber')}
                            isInvalid={!!errors.phoneNumber}
                        />
                    </div>
                    <div>
                        <Input
                            id="address"
                            label="آدرس"
                            type="text"
                            {...register('address')}
                            isInvalid={!!errors.address}
                        />
                    </div>
                    <div>
                        <Input id="job" label="شغل" type="text" {...register('job')} isInvalid={!!errors.job} />
                    </div>
                    <div>
                        <Autocomplete
                            id="state"
                            label="استان محل سکونت"
                            defaultItems={[
                                { label: 'تهران', value: 'tehran', description: '' },
                                { label: 'قزوین', value: 'qazvin', description: '' },
                                { label: 'رشت', value: 'gilan', description: '' },
                            ]}
                            {...register('state')}
                        >
                            {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <div>
                        <Autocomplete
                            id="degreeOfEducation"
                            label="مدرک تحصیلی"
                            defaultItems={[
                                { label: 'دیپلم', value: 'diplom', description: '' },
                                { label: 'کارشناسی', value: 'karshenasi', description: '' },
                                { label: 'کارشناسی ارشد', value: 'karshenasi-arshad', description: '' },
                                { label: 'دکتری', value: 'doctora', description: '' },
                            ]}
                            {...register('degreeOfEducation')}
                        >
                            {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Button type="button" onPress={onOpen}>
                            تغییر رمز عبور
                        </Button>
                        <Button type="submit" className="bg-indigo-500 text-white">
                            ویرایش
                        </Button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};
