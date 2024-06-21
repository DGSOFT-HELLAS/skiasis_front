import { useState, useEffect } from "react";
import { getStorage } from "./use-local-storage";


type ReturnType = {
    user: {
        username: string;
        role: string;
        photoURL: string;
    }
}


export function useUser(): ReturnType {
    const [user, setUser] = useState({
        username: '',
        role: '',
        photoURL: '',
    });

    useEffect(() => {
        let user = getStorage('user');
        if(user) {
            setUser(user);
        }
    }, [])

    return {
        user
    }
}