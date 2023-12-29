import { FC, ReactElement } from 'react';
import { Input, Button } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserPlusIcon, FingerPrintIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import API from '@/src/app/utils/API';
import toast from 'react-hot-toast';
import { useLocalStorage } from '@/src/app/hook/useLocalStorage';
import { useRouter } from 'next/navigation';
import { IUser, useAuth } from '@/src/store';
import { jwtDecode } from 'jwt-decode';

interface ISigninValues {
    email: string;
    password: string;
}

const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
});

export const SigninForm: FC = (): ReactElement => {
    const { setLocalStorage } = useLocalStorage();
    const router = useRouter();
    const { setLogin } = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, dirtyFields },
    } = useForm<ISigninValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'all',
    });

    const onFormSubmitAction: SubmitHandler<ISigninValues> = async (data) => {
        const { email, password } = data;

        try {
            const response = await API.post('auth/signin', { email, password });
            const result = response.data;

            if (result.success && result.data) {
                const userPayload: IUser = jwtDecode(result.data);
                setLogin(userPayload);
                setLocalStorage('token', result.data);
                router.replace('/dashboard/profile');
                return;
            }
        } catch (error) {
            toast.error(error?.response?.data?.error ?? 'مشکلی رخ داده است.');
        }
    };

    return (
        <form className="flex flex-col space-y-4 w-1/3" dir="rtl" onSubmit={handleSubmit(onFormSubmitAction)}>
            <div className="text-gray-700 flex items-center gap-x-1">
                <i>
                    <FingerPrintIcon className="w-5 h-5" />
                </i>
                <h1>ورود به حساب کاربری</h1>
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
            <Button color="primary" type="submit">
                ورود
            </Button>
            <Link className="flex items-center gap-x-1 cursor-pointer w-fit" href="/signup">
                <UserPlusIcon className="w-5 h-5 text-[#0070f0]" />
                <span className="text-sm text-[#0070f0]">ایجاد حساب کاربری</span>
            </Link>
        </form>
    );
};
