// import React from "react";


import React from "react";
import { ArrowLeft, MapPin, Mail, Phone } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen px-5 md:px-10 lg:px-24 py-5">

      {/* Back Button */}
      <button className="flex items-center gap-2 text-gray-600 mb-8 hover:text-black">
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

        {/* CONTACT INFO */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col divide-y h-full">

          {/* Address */}
          <div className="text-center py-6">
            <MapPin className="mx-auto text-green-600 mb-3" size={26} />

            <p className="text-sm text-gray-600 leading-relaxed max-w-[220px] mx-auto">
              71/15/1, Door no W2/15/11, Mariyappansami Mill Complex,
              Annanji Vilakku, Unjampatti, Theni Dist-625 531,
              Tamilnadu.
            </p>
          </div>

          {/* Email */}
          <div className="text-center py-6">
            <Mail className="mx-auto text-green-600 mb-3" size={24} />

            <p className="text-sm text-gray-600">
              sunshineagriteech@gmail.com
            </p>
          </div>

          {/* Phone */}
          <div className="text-center py-6">
            <Phone className="mx-auto text-green-600 mb-3" size={24} />

            <p className="text-sm text-gray-600">
              (91) 84899 43519
            </p>

            <p className="text-sm text-gray-600">
              (91) 84899 43523
            </p>
          </div>

        </div>


        {/* CONTACT FORM */}
       <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">

  <h2 className="text-lg font-semibold mb-2">
    Just Say Hello!
  </h2>

  <p className="text-gray-500 text-sm mb-5 max-w-xl">
    Do you fancy saying hi to me or you want to get started with your
    project and you need my help? Feel free to contact me.
  </p>

  <form className="space-y-4">

    <input
      type="text"
      placeholder="Your Name"
      className="w-full border rounded-md px-4 py-3 outline-none focus:border-green-500"
    />

    <input
      type="text"
      placeholder="Subjects"
      className="w-full border rounded-md px-4 py-3 outline-none focus:border-green-500"
    />

    <textarea
      rows="4"
      placeholder="Write your message..."
      className="w-full border rounded-md px-4 py-3 outline-none focus:border-green-500"
    ></textarea>

    <button
      type="submit"
      className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition"
    >
      Send Message
    </button>

  </form>
</div>

      </div>


      {/* MAP */}
      <div className="mt-10 rounded-xl overflow-hidden border">

        <iframe
          title="map"
          src="https://www.google.com/maps?q=Theni,Tamilnadu&output=embed"
          className="w-full h-[320px]"
          loading="lazy"
        ></iframe>

      </div>

    </div>
  );
};

export default ContactPage;