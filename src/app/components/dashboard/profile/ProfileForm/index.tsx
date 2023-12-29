import { FC, Fragment, ReactElement, useEffect } from 'react';
import { Button, Input, AutocompleteItem, Autocomplete, useDisclosure } from '@nextui-org/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { PasswordRecoveryModal } from '@/src/app/components/dashboard/profile/PasswordRecoveryModal';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import API from '@/src/app/utils/API';

interface IFormValues {
    fullName: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    state?: string;
    job?: string;
    degreeOfEducation?: string;
}

const degreeOfEducation = [
    { label: 'دیپلم', value: 'دیپلم', description: '' },
    { label: 'کارشناسی', value: 'کارشناسی', description: '' },
    { label: 'کارشناسی ارشد', value: 'کارشناسی ارشد', description: '' },
    { label: 'دکتری', value: 'دکتری', description: '' },
];

const states = [
    { label: 'تهران', value: 'تهران', description: '' },
    { label: 'قزوین', value: 'قزوین', description: '' },
    { label: 'رشت', value: 'رشت', description: '' },
];

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
        setValue,
        watch,
        control,
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

    const formValue = useWatch({ control });
    console.log('formValues:', formValue.state);

    const onSubmitFormHandler: SubmitHandler<IFormValues> = async (data) => {
        const { job, fullName, phoneNumber, degreeOfEducation, address, state } = data;
        try {
            const response = await API.put('/account/profile', {
                job,
                fullName,
                phoneNumber,
                degreeOfEducation,
                address,
                state,
            });
            const result = response.data;
            if (result.success && result.data) {
                toast.success('فرم با موفقیت ویرایش شد');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message ?? 'مشکلی رخ داده است');
        }
    };

    const getProfile = async () => {
        try {
            const response = await API.get('account/profile');
            const result = response.data;
            if (result.success && result.data) {
                const user = result.data;
                setValue('job', user.job ? user.job : '');
                setValue('address', user.address ? user.address : '');
                setValue('email', user.email ? user.email : '');
                setValue('degreeOfEducation', user.degreeOfEducation ? user.degreeOfEducation : '');
                setValue('fullName', user.fullName ? user.fullName : '');
                setValue('phoneNumber', user.phoneNumber ? user.phoneNumber : '');
                setValue('state', user.state ? user.state : '');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        getProfile();
    }, []);

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
                            value={formValue.email}
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
                            value={formValue.fullName}
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
                            value={formValue.phoneNumber}
                            {...register('phoneNumber')}
                            isInvalid={!!errors.phoneNumber}
                        />
                    </div>
                    <div>
                        <Input
                            id="address"
                            label="آدرس"
                            type="text"
                            value={formValue.address}
                            {...register('address')}
                            isInvalid={!!errors.address}
                        />
                    </div>
                    <div>
                        <Input
                            id="job"
                            label="شغل"
                            type="text"
                            {...register('job')}
                            isInvalid={!!errors.job}
                            value={formValue.job}
                        />
                    </div>
                    <div>
                        <Autocomplete
                            id="state"
                            label="استان محل سکونت"
                            inputValue={formValue.state}
                            defaultItems={states}
                            onInputChange={(value) => setValue('state', value)}
                        >
                            {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <div>
                        <Autocomplete
                            id="degreeOfEducation"
                            label="مدرک تحصیلی"
                            inputValue={formValue.degreeOfEducation}
                            defaultItems={degreeOfEducation}
                            onInputChange={(value) => setValue('degreeOfEducation', value)}
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
