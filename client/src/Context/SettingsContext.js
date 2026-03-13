import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profileData");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          image: "",
        };
  });

  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem("addressData");
    return saved
      ? JSON.parse(saved)
      : {
          firstName: "",
          lastName: "",
          company: "",
          street: "",
          country: "",
          state: "",
          zip: "",
          email: "",
          phone: "",
        };
  });

  const saveProfile = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));
  };

  const saveAddress = () => {
    localStorage.setItem("addressData", JSON.stringify(address));
  };

  return (
    <SettingsContext.Provider
      value={{
        profile,
        setProfile,
        address,
        setAddress,
        saveProfile,
        saveAddress,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);