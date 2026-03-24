import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './helpers/ScrollToTop';
import {Toaster } from "react-hot-toast";
import useFetchLoginUser from './hooks/useFetchLoginUser';
import { setNavigationHandler } from './common/apiClient';
import PageLoader from './helpers/PageLoader';


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useFetchLoginUser();
  const isAdminPanel = location.pathname.startsWith('/admin-panel');

  // Set up navigation handler for API client
  useEffect(() => {
    setNavigationHandler(navigate);
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PageLoader />
      </div>
    );
  }
  
  return (
    <>
      <ScrollToTop />
        
      {!isAdminPanel && <Header />}
   
      <main className='min-h-[calc(100vh-120px)] '>
        <Outlet />
      </main>
      {!isAdminPanel && <Footer />}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;


