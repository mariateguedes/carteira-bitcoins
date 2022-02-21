import React, { createContext, useContext, useEffect } from "react";

interface AuthenticationContext {
  userId?: number;
  userName?: string;
  setUser: (userId: number, userName: string) => void;
}

const authenticationContext = createContext<AuthenticationContext>({
  setUser: () => {}, 
});

export const useAuthentication = (): AuthenticationContext =>
  useContext(authenticationContext);

const AuthenticationProvider: React.FunctionComponent = ({ children }) => {
  const [userId, setUserId] = React.useState<number>();
  const [userName, setUserName] = React.useState<string>();

  return (
    <authenticationContext.Provider
      value={{
        userId: userId,
        userName: userName,
        setUser: (userId, userName) => {
          setUserId(userId);
          setUserName(userName);
        },
      }}
    >
      {children}
    </authenticationContext.Provider>
  );
};

export default AuthenticationProvider;
