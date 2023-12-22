import { Spinner } from '@nextui-org/react';

export default function Loading() {
    return (
        <div className="w-full min-h-screen grid place-items-center">
            <Spinner size="md" color="primary" />
        </div>
    );
}
