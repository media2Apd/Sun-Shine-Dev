
// import { createContext, useState, useEffect } from "react";

// export const LoginContext = createContext();

// export const LoginProvider = ({ children }) => {
//   // Only one array: users
//   const [users, setUsers] = useState(() => {
//     const stored = localStorage.getItem("users");
//     return stored ? JSON.parse(stored) : [];
//   });

//   // Save users array to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("users", JSON.stringify(users));
//   }, [users]);

//   // Helper to get current logged-in user
//   const currentUser = users.find(u => u.isLoggedIn) || null;

//   // Register new user
//   const register = ({ email, password }) => {
//     const exists = users.find(u => u.email === email);
//     if (exists) return { success: false, message: "User already exists" };

//     const newUser = { email, password, isLoggedIn: true };

//     // Log out any existing logged-in user and add new one
//     setUsers(prev => prev.map(u => ({ ...u, isLoggedIn: false })).concat(newUser));
//     return { success: true };
//   };

//   // Login existing user
//   const login = ({ email, password }) => {
//     const index = users.findIndex(u => u.email === email && u.password === password);
//     if (index >= 0) {
//       setUsers(prev =>
//         prev.map((u, i) => ({ ...u, isLoggedIn: i === index }))
//       );
//       return { success: true };
//     }
//     return { success: false, message: "Invalid email or password" };
//   };

//   // Logout
//   const logout = () => {
//     setUsers(prev => prev.map(u => ({ ...u, isLoggedIn: false })));
//   };

//   return (
//     <LoginContext.Provider
//       value={{ users, currentUser, register, login, logout }}
//     >
//       {children}
//     </LoginContext.Provider>
//   );
// };


// import { createContext, useState, useEffect } from "react";

// export const LoginContext = createContext();

// export const LoginProvider = ({ children }) => {
//   const [users, setUsers] = useState(() => {
//     const stored = localStorage.getItem("users");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("users", JSON.stringify(users));
//   }, [users]);

//   const currentUser = users.find(u => u.isLoggedIn) || null;

//   // Function to generate unique customer ID
//   const generateCustomerId = () => {
//     return `CUST-${Date.now()}-${Math.floor(Math.random() * 10)}`;
//   };

//   const register = ({ email, password }) => {
//     const exists = users.find(u => u.email === email);
//     if (exists) return { success: false, message: "User already exists" };

//     const newUser = {
//       customerId: generateCustomerId(), // <-- ID here
//       email,
//       password,
//       isLoggedIn: true
//     };

//     setUsers(prev =>
//       prev.map(u => ({ ...u, isLoggedIn: false })).concat(newUser)
//     );
//     return { success: true, customerId: newUser.customerId }; // optional return
//   };

//   const login = ({ email, password }) => {
//     const index = users.findIndex(u => u.email === email && u.password === password);
//     if (index >= 0) {
//       setUsers(prev =>
//         prev.map((u, i) => ({ ...u, isLoggedIn: i === index }))
//       );
//       return { success: true, customerId: users[index].customerId }; // return ID
//     }
//     return { success: false, message: "Invalid email or password" };
//   };

//   const logout = () => {
//     setUsers(prev => prev.map(u => ({ ...u, isLoggedIn: false })));
//   };

//   return (
//     <LoginContext.Provider
//       value={{ users, currentUser, register, login, logout }}
//     >
//       {children}
//     </LoginContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const currentUser = users.find(u => u.isLoggedIn) || null;

  // Generate unique customer ID
  const generateCustomerId = () => `CUST-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const register = ({ email, password }) => {
    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, message: "User already exists" };

    const newUser = {
      customerId: generateCustomerId(),
      email,
      password,
      isLoggedIn: true
    };

    setUsers(prev => prev.map(u => ({ ...u, isLoggedIn: false })).concat(newUser));

    return { success: true, customerId: newUser.customerId };
  };

  const login = ({ email, password }) => {
    const index = users.findIndex(u => u.email === email && u.password === password);
    if (index >= 0) {
      setUsers(prev => prev.map((u, i) => ({ ...u, isLoggedIn: i === index })));
      return { success: true, customerId: users[index].customerId };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logout = () => {
    setUsers(prev => prev.map(u => ({ ...u, isLoggedIn: false })));
  };

  return (
    <LoginContext.Provider value={{ users, currentUser, register, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};