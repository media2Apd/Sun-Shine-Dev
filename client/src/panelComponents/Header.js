import logo from "../assets/logo.png"; 

const Header = () => {
  return (
    <div className="bg-white shadow-sm px-12 py-3 flex items-center">
      
      {/* Logo */}
      <img 
        src={logo} 
        alt="Logo" 
        className="h-10 w-auto"
      />

    </div>
  );
};

export default Header;