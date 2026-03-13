
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './helpers/ScrollToTop';
import ProductOverview from './pages/ProductOverview';

// import Home from './pages/Home';



function App() {
  const location = useLocation();
  // const loading = useFetchLoginUser();
  const isAdminPanel = location.pathname.startsWith('/admin-panel');
  return (
    <>
      <ScrollToTop />
     {!isAdminPanel && <Header />}
   
      <main className='min-h-[calc(100vh-120px)] '>
        <Outlet />
      </main>
      {!isAdminPanel && <Footer />}
    </>
  );
}

export default App;


