import { FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Newsletter() {
  return (
    <div className="border-t bg-gray-100 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-center md:text-left">
        
        {/* Left Text */}
        <div className="w-full md:w-auto">
          <h2 className="text-lg font-semibold">
            Subscribe our Newsletter
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Pellentesque eu nibh eget mauris congue mattis mattis nec tellus.
            Phasellus imperdiet elit eu magna.
          </p>
        </div>

        {/* Input + Button */}
        <div className="flex w-full md:w-auto items-center bg-white rounded-full overflow-hidden border">
          <input
            type="email"
            placeholder="Your email address"
            className="px-5 py-3 outline-none w-full md:w-60"
          />
          <button className="bg-green-600 text-white px-6 py-3 whitespace-nowrap">
            Subscribe
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <div className="bg-green-600 text-white p-3 rounded-full">
            <FaFacebookF size={14} />
          </div>
          <FaTwitter className="text-gray-600" size={16} />
        </div>

      </div>
    </div>
  );
}