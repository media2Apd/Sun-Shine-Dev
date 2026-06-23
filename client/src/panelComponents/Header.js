import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiMenu } from "react-icons/fi"; 

const Header = ({ toggleMobileSidebar }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm px-4 md:px-12 py-3 flex items-center justify-between border-b z-30">
      
      {/* Logo - Stays on the Left */}
      <img 
        src={logo} 
        onClick={() => navigate('/admin-panel/admin-dashboard')}
        alt="Logo" 
        className="h-10 w-auto cursor-pointer"
      />

      {/* Hamburger Menu - Now on the Right (Visible only on Mobile/Tablet) */}
      <button 
        onClick={toggleMobileSidebar}
        className="p-2 rounded-lg hover:bg-slate-100 lg:hidden text-slate-600 transition-colors focus:outline-none"
      >
        <FiMenu size={24} />
      </button>

    </div>
  );
};

export default Header;