import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { USER_SESSION, USER_SETTINGS } from '@Constans';
import { UserI } from '@Types/user';

interface TypeContextUser {
  user: UserI;
  signoutUser: () => void;
  setDataUserLocalStorage: (dataUser: UserI) => void;
  isLoading: boolean;
}

//Context
const ContextAuth = createContext<TypeContextUser | undefined>(undefined);

//Provider
export const ContextAuthProvider = ({ children }) => {
  const [user, setUser] = useState<undefined | null | UserI>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const dataUser: UserI = JSON.parse(localStorage.getItem(USER_SESSION));
    if (dataUser) {
      setUser(dataUser);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const setDataUserLocalStorage = (dataUser: UserI) => {
    localStorage.setItem(USER_SESSION, JSON.stringify(dataUser));
    setUser(dataUser);
  };

  const signoutUser = () => {
    localStorage.removeItem(USER_SESSION);
    localStorage.removeItem(USER_SETTINGS);
    setUser(null);
    router.push('/login');
  };

  return (
    <ContextAuth.Provider
      value={{
        user,
        signoutUser,
        setDataUserLocalStorage,
        isLoading,
      }}
    >
      {children}
    </ContextAuth.Provider>
  );
};

//Hook
export const useContextAuth = () => {
  const dataUser = useContext(ContextAuth);

  if (typeof dataUser === 'undefined') {
    throw new Error('useUser must be withing ContextUserProvider');
  }

  return dataUser;
};
