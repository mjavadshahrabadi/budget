import { FC, ReactElement } from 'react';
import { Input, Button } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FingerPrintIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import API from '@/src/app/utils/API';
import { useLocalStorage } from '@/src/app/hook/useLocalStorage';
import { IUser, useAuth } from '@/src/store';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface ISigninValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = Yup.object().shape({
    fullName: Yup.string().min(5).max(50).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required(),
});

export const SignupForm: FC = (): ReactElement => {
    const { setLocalStorage } = useLocalStorage();
    const { setLogin } = useAuth();
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, dirtyFields },
    } = useForm<ISigninValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            password: '',
            confirmPassword: '',
            email: '',
            fullName: '',
        },
        mode: 'all',
    });

    const onFormSubmitAction: SubmitHandler<ISigninValues> = async (data) => {
        const { fullName, email, password, confirmPassword } = data;
        try {
            const response = await API.post('/auth/signup', { fullName, email, password, confirmPassword });
            const result = response.data;
            if (result.success && result.data) {
                const userPayload: IUser = jwtDecode(result.data);
                setLogin(userPayload);
                setLocalStorage('token', result.data);
                router.replace('/dashboard/profile');
            }
        } catch (error) {
            toast.error(error?.response?.data?.error ?? 'مشکلی رخ داده است');
        }
    };

    return (
        <form className="flex flex-col space-y-4 w-1/3" dir="rtl" onSubmit={handleSubmit(onFormSubmitAction)}>
            <div className="text-gray-700 flex items-center gap-x-1">
                <i>
                    <UserPlusIcon className="w-5 h-5" />
                </i>
                <h1>ایجاد حساب کاربری</h1>
            </div>
            <div>
                <Input
                    label="نام و نام خانوادگی"
                    size="md"
                    type="text"
                    required
                    maxLength={50}
                    color={errors.fullName ? 'danger' : dirtyFields.fullName ? 'success' : 'default'}
                    {...register('fullName')}
                />
            </div>
            <div>
                <Input
                    label="ایمیل"
                    size="md"
                    type="email"
                    required
                    color={errors.email ? 'danger' : dirtyFields.email ? 'success' : 'default'}
                    {...register('email')}
                />
            </div>
            <div>
                <Input
                    label="رمز عبور"
                    size="md"
                    type="password"
                    required
                    color={errors.password ? 'danger' : dirtyFields.password ? 'success' : 'default'}
                    maxLength={20}
                    {...register('password')}
                />
            </div>
            <div>
                <Input
                    label="تکرار رمز عبور"
                    size="md"
                    type="password"
                    required
                    color={errors.confirmPassword ? 'danger' : dirtyFields.confirmPassword ? 'success' : 'default'}
                    maxLength={20}
                    {...register('confirmPassword')}
                />
            </div>
            <Button color="primary" type="submit">
                ثبت نام
            </Button>
            <Link className="flex items-center gap-x-1 cursor-pointer w-fit" href="/signin">
                <FingerPrintIcon className="w-5 h-5 text-[#0070f0]" />
                <span className="text-sm text-[#0070f0]">ورود به حساب کاربری</span>
            </Link>
        </form>
    );
};
