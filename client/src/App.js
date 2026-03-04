// import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './helpers/ScrollToTop';
import Home from './pages/Home';


function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className='min-h-[calc(100vh-120px)] '>
        <Outlet />
      </main>
   
      <Footer />
    </>
  );
}

export default App;
