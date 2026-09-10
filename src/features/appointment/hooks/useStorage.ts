


/**
 * Drop-in replacement for useState that persists to localStorage.
 * This is a stand-in for a real backend — swap this out once appointments
 * are served from an API, but it means data now survives a page refresh.
 */

import { useEffect, useState } from "react";


export function useLocalStorage<T>(key:string, initialValue:T){
    const [value, setValue] = useState<T>(() =>{
        try{
            const stored = window.localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T): initialValue;
        }catch{
            return initialValue;
        }
    });


    useEffect(() =>{
        try{
            window.localStorage.setItem(key, JSON.stringify(value))
        }catch{

        }
    },[key,value]);

    return [value, setValue] as const
}