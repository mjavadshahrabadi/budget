import { FC, ReactElement } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Autocomplete, AutocompleteItem, Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

interface IFormValues {
    lt?: string | null;
    gt?: string | null;
    date?: string | null;
    creditCartNumber?: string | null;
    transactionType?: string | null;
}

export const ReportingFilteringForm: FC = (): ReactElement => {
    const searchParam = useSearchParams();
    const { register, getValues } = useForm<IFormValues>();
    const router = useRouter();

    const getDateValue = (type: string): string => {
        switch (type) {
            case 'روز':
                return '0';
            case 'هفته':
                return '1';
            case 'ماه':
                return '2';
            case 'سال':
                return '3';
            default:
                return '';
        }
    };

    const getTransactionType = (type: string): string => {
        switch (type) {
            case 'ورودی':
                return '0';
            case 'خروجی':
                return '1';
            default:
                return '';
        }
    };

    const onFilterHandler = () => {
        const formValues = getValues();
        const params = new URLSearchParams(searchParam);

        for (const [key, value] of Object.entries(formValues)) {
            switch (key) {
                case 'lt':
                    params.set(key, value ? value : '');
                    break;
                case 'gt':
                    params.set(key, value ? value : '');
                    break;
                case 'date':
                    params.set(key, value ? getDateValue(value) : '');
                    break;
                case 'creditCartNumber':
                    params.set(key, value ? value : '');
                    break;
                case 'transactionType':
                    params.set(key, value ? getTransactionType(value) : '');
                    break;
                default:
                    return;
            }
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="bg-white m-5 p-5 rounded-md">
            <div className="grid grid-cols-4 gap-5" dir="rtl">
                <Autocomplete
                    id="date"
                    label="فیلتر بر اساس تاریخ"
                    defaultItems={[
                        { label: 'روز', value: 'روز' },
                        { label: 'هفته', value: 'هفته' },
                        { label: 'ماه', value: 'ماه' },
                        { label: 'سال', value: 'سال' },
                    ]}
                    {...register('date')}
                >
                    {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete
                    id="type"
                    label="فیلتر بر اساس نوع تراکنش"
                    defaultItems={[
                        { label: 'ورودی', value: 'ورودی' },
                        { label: 'خروجی', value: 'خروجی' },
                    ]}
                    {...register('transactionType')}
                >
                    {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                </Autocomplete>
                <Autocomplete
                    id="creditCardNumber"
                    label="فیلتر بر اساس نوع کارت بانکی"
                    defaultItems={[
                        { label: ' 6037697374333710', value: '6037697374333710' },
                        { label: '6280231353459380', value: '6280231353459380' },
                    ]}
                    {...register('creditCartNumber')}
                >
                    {(animal) => <AutocompleteItem key={animal.value}>{animal.label}</AutocompleteItem>}
                </Autocomplete>

                <Input type="number" label="مبالغ کمتر از" {...register('lt')} />
                <Input type="number" label="مبالغ بیشتر از" {...register('gt')} />
                <Button type="button" className="w-1/2 bg-indigo-500 text-white self-center" onPress={onFilterHandler}>
                    فیلتر
                </Button>
            </div>
        </div>
    );
};
