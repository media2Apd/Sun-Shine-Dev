import React, { createContext, useContext, useState, useEffect } from "react";

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState(() => {
  const stored = localStorage.getItem("enquiries");
  return stored ? JSON.parse(stored) : [];
});


  // 👉 Save to localStorage
  useEffect(() => {
    localStorage.setItem("enquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  // 👉 Add enquiry
  const addEnquiry = (data) => {
    const newEnquiry = {
      id: "ENQ-" + Date.now(), // ✅ unique ID
      createdAt: new Date().toISOString(),
      ...data,
    };

    setEnquiries((prev) => [...prev, newEnquiry]);
  };

  return (
    <EnquiryContext.Provider value={{ enquiries, addEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => useContext(EnquiryContext);