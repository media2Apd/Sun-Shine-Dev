import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
 

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-sm px-12 py-3 flex items-center border-b">
      
      {/* Logo */}
      <img 
        src={logo} 
        onClick={()=>navigate('/')}
        alt="Logo" 
        className="h-10 w-auto"
      />

    </div>
  );
};

export default Header;