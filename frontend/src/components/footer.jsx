import { Link, useNavigate } from "react-router-dom";
import {
  BiLogoProductHunt,
  BiSolidCart,
} from "react-icons/bi";
import {
  MdContactPhone,
  MdReviews,
} from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { HiHome } from "react-icons/hi";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-pink-600 text-white mt-10">
      <div className="max-w-[1400px] mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo + Description */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/white-remove-bg.png"
              alt="Logo"
              className="w-[300px] cursor-pointer"
              onClick={() => navigate("/")}
            />

            <p className="text-center md:text-left mt-3 text-sm text-pink-100">
              Quality products with a smooth shopping experience.
              Thank you for visiting our store.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-5">
              Quick Links
            </h2>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="hover:text-pink-200 flex items-center justify-center gap-2"
              >
                <HiHome />
                Home
              </Link>

              <Link
                to="/products"
                className="hover:text-pink-200 flex items-center justify-center gap-2"
              >
                <BiLogoProductHunt />
                Products
              </Link>

              <Link
                to="/reviews"
                className="hover:text-pink-200 flex items-center justify-center gap-2"
              >
                <MdReviews />
                Reviews
              </Link>

              <Link
                to="/about-us"
                className="hover:text-pink-200 flex items-center justify-center gap-2"
              >
                <IoIosPeople />
                About Us
              </Link>

              <Link
                to="/contact-us"
                className="hover:text-pink-200 flex items-center justify-center gap-2"
              >
                <MdContactPhone />
                Contact Us
              </Link>

              <Link
                to="/cart"
                className="hover:text-pink-200 flex items-center justify-center gap-2"
              >
                <BiSolidCart />
                Cart
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold mb-5">
              Contact
            </h2>

            <div className="space-y-2 text-pink-100">
              <p>Email: support@example.com</p>
              <p>Phone: +94 74 123 4567</p>
              <p>Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-pink-400 mt-10 pt-5 text-center text-sm text-pink-100">
          © {new Date().getFullYear()} BEAU LUXE Store. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}