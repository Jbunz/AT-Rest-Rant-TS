import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the User interface
export interface User {
    id: number;
    name: string;
    email: string;
}

// Define the context type
export interface CurrentUserContextType {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const CurrentUser = createContext<CurrentUserContextType | undefined>(undefined);


// Define the provider component
export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
};

// Custom hook to simplify useContext usage
export const useCurrentUser = (): CurrentUserContextType => {
    const context = useContext(CurrentUser);
    if (!context) {
        throw new Error('useCurrentUser must be used within a CurrentUserProvider');
    }
    return context;
};

