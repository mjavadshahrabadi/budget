import { create } from 'zustand';

export interface IUser {
    id: number;
    email: string;
    fullName: string;
}

interface IUserStore {
    user: IUser | null;
    setLogin: (value: IUser | null) => void;
    setLogout: () => void;
}

export const useAuth = create<IUserStore>((set) => ({
    user: null,
    setLogin: (value: IUser | null) => set(() => ({ user: value })),
    setLogout: () => set(() => ({ user: null })),
}));
