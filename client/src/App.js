
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './helpers/ScrollToTop';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const location = useLocation();
  // const loading = useFetchLoginUser();
  const isAdminPanel = location.pathname.startsWith('/admin-panel');
  return (
    <>
      <ScrollToTop />

        <ToastContainer position="top-right" autoClose={2000} />
        
     {!isAdminPanel && <Header />}
   
      <main className='min-h-[calc(100vh-120px)] '>
        <Outlet />
      </main>
      {!isAdminPanel && <Footer />}
    </>
  );
}

export default App;


