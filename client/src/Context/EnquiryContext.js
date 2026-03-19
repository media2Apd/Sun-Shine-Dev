
import React, { createContext, useContext, useState, useEffect } from "react";

const EnquiryContext = createContext();

// ✅ Provider
export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState(() => {
    const stored = localStorage.getItem("enquiries");
    return stored ? JSON.parse(stored) : [];
  });

  // Save to localStorage automatically
  useEffect(() => {
    localStorage.setItem("enquiries", JSON.stringify(enquiries));
  }, [enquiries]);

  // Add enquiry
  const addEnquiry = (data) => {
    const newEnquiry = {
      id: "ENQ-" + Date.now(),
      createdAt: new Date().toISOString(),
      notes: [], // 👈 initialize notes
      ...data,
    };
    setEnquiries((prev) => [...prev, newEnquiry]);
  };

  // Add note to enquiry by id
  const addNoteToEnquiry = (enquiryId, noteText) => {
    setEnquiries((prev) =>
      prev.map((enq) =>
        enq.id === enquiryId
          ? {
              ...enq,
              notes: [...(enq.notes || []), { text: noteText, date: new Date().toISOString() }],
            }
          : enq
      )
    );
  };

  // ✅ Update status
const updateEnquiryStatus = (id, newStatus) => {
  setEnquiries((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    )
  );
};

  return (
    <EnquiryContext.Provider value={{ enquiries, addEnquiry, addNoteToEnquiry , updateEnquiryStatus  }}>
      {children}
    </EnquiryContext.Provider>
  );
};

// ✅ Hook to use context
export const useEnquiry = () => useContext(EnquiryContext);