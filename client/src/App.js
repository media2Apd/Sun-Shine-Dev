// import { useEffect } from 'react';
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import {Toaster } from "react-hot-toast";
// import ScrollToTop from './helpers/ScrollToTop';
// import useFetchLoginUser from './hooks/useFetchLoginUser';
// import PageLoader from './helpers/PageLoader';
// import { setNavigationHandler } from './common/apiClient';
// import { CartProvider } from "./context/CartContext";

// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const loading = useFetchLoginUser();
//   const isAdminPanel = location.pathname.startsWith('/admin-panel');

//   // Set up navigation handler for API client
//   useEffect(() => {
//     setNavigationHandler(navigate);
//   }, [navigate]);

//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <PageLoader />
//       </div>
//     );
//   }

//   return (
//     <CartProvider>
//     <>
//       <ScrollToTop />
//       {!isAdminPanel && <Header />}

//       {/* ID- customer-scroll-area is used in ScrollToTop */}
//       {isAdminPanel ? (
//         <Outlet />
//       ) : (
//         <main id="customer-scroll-area" className='min-h-[calc(98vh-113px)] bg-[#F8FAFF]'>
//           <Outlet />
//         </main>
//       )}

//       {!isAdminPanel && <Footer />}
//       <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
//     </>
//     </CartProvider>
//   );
// }
// export default App;


// import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './helpers/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-[72px]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;


