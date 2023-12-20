import { FC, ReactElement } from 'react';
import { Input, Button } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import UserPlus from '@heroicons/react/24/outline/UserPlusIcon';
import Link from 'next/link';

interface ISigninValues {
    nationalCode: string;
    password: string;
}

const schema = Yup.object().shape({
    nationalCode: Yup.string().length(10, 'کد ملی وارد شده صحیح نمی باشد.').required('کد ملی الزامی می باشد.'),
    password: Yup.string().min(8).required('رمز عبور الزامی می باشد.'),
});

export const SigninForm: FC = (): ReactElement => {
    const {
        handleSubmit,
        register,
        formState: { errors, dirtyFields },
    } = useForm<ISigninValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            nationalCode: '',
            password: '',
        },
        mode: 'all',
    });

    const onFormSubmitAction: SubmitHandler<ISigninValues> = (data) => {
        console.log('data: ', data);
    };

    return (
        <form className="flex flex-col space-y-4 w-1/3" dir="rtl" onSubmit={handleSubmit(onFormSubmitAction)}>
            <h1>ورود به حساب کاربری</h1>
            <div>
                <Input
                    label="کد ملی"
                    size="md"
                    type="text"
                    required
                    maxLength={10}
                    color={errors.nationalCode ? 'danger' : dirtyFields.nationalCode ? 'success' : 'default'}
                    {...register('nationalCode')}
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
                <UserPlus className="x-7 h-5 text-[#0070f0]" />
                <span className="text-sm text-[#0070f0]">ایجاد حساب کاربری</span>
            </Link>
        </form>
    );
};
