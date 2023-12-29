interface IUseLocalStorageOut {
    setLocalStorage: (key: string, value: string) => void;
    getLocalStorage: (key: string) => string | null;
    removeLocalStorageItem: (key: string) => void;
}

export const useLocalStorage = (): IUseLocalStorageOut => {
    const setLocalStorage = (key: string, value: string) => {
        if (typeof window !== undefined) {
            window.localStorage.setItem(key, value);
        }
    };
    const getLocalStorage = (key: string): string | null => {
        if (typeof window !== undefined) {
            const value = window.localStorage.getItem(key);
            return value ? value : null;
        }
        return null;
    };

    const removeLocalStorageItem = (key: string) => {
        if (typeof window !== undefined) {
            window.localStorage.removeItem(key);
        }
    };

    return { setLocalStorage, getLocalStorage, removeLocalStorageItem };
};
