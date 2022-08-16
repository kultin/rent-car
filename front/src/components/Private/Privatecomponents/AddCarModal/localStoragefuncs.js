import { useEffect, useState } from 'react';

// custom hook for saving data to local storage

function getSavedValue(key, defaultValue) {
    const savedValue = localStorage.getItem(key);
    return JSON.parse(savedValue) || defaultValue;
}

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(getSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
