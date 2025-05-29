import React, { createContext, useContext, useState, useEffect } from "react";

interface UserData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  school?: string;
}

interface UserDataContextProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UserDataContext = createContext<UserDataContextProps>({
  userData: { name: "", email: "", phone: "", city: "", state: "" },
  setUserData: () => {},
});

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    school: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
