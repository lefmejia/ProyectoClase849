import { createContext, useContext, useState } from "react";

//1. tipado del objeto principal del contexto
type User = {
    email: string;
} | null;

type AuthContextType = {
    user: User | null;
    login: (email:string) => boolean;
    logout: () => void;
}

//2. crear el contexto
const AuthContext = createContext<AuthContextType | null>(null);

//4. Exposicion de contexto en forma de hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error ("useAuth debe usarse dentro de Authprovider");
    return context;
}

//3. crear el provider: medio por el cual se maneja el estado global
export const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<User>(null);

    const login = (email:string):boolean => {
        const allowed = email.endsWith('.edu');
        if(allowed)
        {
            setUser({email});
        }

        return allowed;
    }

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};