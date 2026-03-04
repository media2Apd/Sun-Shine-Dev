import logo from "../assets/footerimage.png";

export default function Footer() {
  return (
    <div className="bg-[#111111] text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10">

        {/* Logo + Address */}
        <div>
          <img src={logo} alt="logo" className="w-40 mb-4" />

          <p className="text-sm leading-6 text-gray-400">
            71/151/1,Door no W2/151, Mariyaponusami Mill Complex,<br/>
            Annanji Vilakku, Unjampatti, Theni Dist-625 531,<br/>
            Tamilnadu.
          </p>

          <p className="text-sm mt-4 text-gray-400">
            (+91) 84899 43518, 8489 435238
          </p>

          <p className="text-sm mt-2 text-gray-400">
            sunshineagrotech@gmail.com
          </p>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-white font-semibold mb-4">My Account</h3>
          <ul className="space-y-2 text-sm">
            <li>Profile</li>
            <li>Order History</li>
            <li>Shopping Cart</li>
            <li>Wishlist</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>Organic manures</li>
            <li>Bio fertilizers</li>
            <li>Bio pesticides</li>
            <li>Growth promoter</li>
          </ul>
        </div>

        {/* Proxy */}
        <div>
          <h3 className="text-white font-semibold mb-4">Proxy</h3>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Shop</li>
            <li>Blog</li>
            <li>Gallery</li>
          </ul>
        </div>

        {/* Helps */}
        <div>
          <h3 className="text-white font-semibold mb-4">Helps</h3>
          <ul className="space-y-2 text-sm">
            <li>Contact</li>
            <li>FAQ’s</li>
            <li>Terms & Condition</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

      </div>
    </div>
  );
}