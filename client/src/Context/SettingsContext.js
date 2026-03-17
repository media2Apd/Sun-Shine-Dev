// import { createContext, useContext, useState } from "react";

// const SettingsContext = createContext();

// export const SettingsProvider = ({ children }) => {

//   const [profile, setProfile] = useState(() => {
//     const saved = localStorage.getItem("profileData");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           image: "",
//         };
//   });

//   const [address, setAddress] = useState(() => {
//     const saved = localStorage.getItem("addressData");
//     return saved
//       ? JSON.parse(saved)
//       : {
//           firstName: "",
//           lastName: "",
//           company: "",
//           street: "",
//           country: "",
//           state: "",
//           zip: "",
//           email: "",
//           phone: "",
//         };
//   });

//   const saveProfile = () => {
//     localStorage.setItem("profileData", JSON.stringify(profile));
//   };

//   const saveAddress = () => {
//     localStorage.setItem("addressData", JSON.stringify(address));
//   };

//   return (
//     <SettingsContext.Provider
//       value={{
//         profile,
//         setProfile,
//         address,
//         setAddress,
//         saveProfile,
//         saveAddress,
//       }}
//     >
//       {children}
//     </SettingsContext.Provider>
//   );
// };

// export const useSettings = () => useContext(SettingsContext);

import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();


export const SettingsProvider = ({ children }) => {

  // ✅ Profile with ID
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("profile");
    if (saved) return JSON.parse(saved);
    const id = Date.now().toString();
    localStorage.setItem("profile", JSON.stringify({ id, firstName: "", lastName: "", email: "", phone: "", image: "" }));
    return { id, firstName: "", lastName: "", email: "", phone: "", image: "" };
  });

  // ✅ Billing Address with ID
  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem("address");
    if (saved) return JSON.parse(saved);
    const id = Date.now().toString();
    localStorage.setItem(
      "address",
      JSON.stringify({
        id,
        firstName: "",
        lastName: "",
        company: "",
        street: "",
        country: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
      })
    );
    return {
      id,
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
    localStorage.setItem("profile", JSON.stringify(profile));
  };

  const saveAddress = () => {
    localStorage.setItem("address", JSON.stringify(address));
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
export const AddressContext = createContext();