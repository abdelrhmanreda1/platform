import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGoogle } from "react-icons/fa";
import Subscribe from "./Subscribe";

function Footer() {
  return (
    <footer id="contactUs" className="pt-12 pb-12 ">
      <Subscribe />
      <div className="max-w-6xl mt-12 mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
        <div>
          <div className="mb-4">
            <div className="text-3xl font-bold text-main">LOGO</div>
          </div>
          <a href="#" className="text-base text-[#1B1717]">
            www.LOGO.com
          </a>
        </div>
        <div>
          <h3 className="font-normal text-xl text-main">Name</h3>
          <ul className="mt-2 space-y-3 text-base text-[#1B1717]">
            <li>Home</li>
            <li>Features</li>
            <li>How it works</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="font-normal text-xl text-main">Contact us</h3>
          <ul className="mt-2 space-y-3 text-base text-[#1B1717]">
            <li>+1 (800) 987-45698</li>
            <li>+1 (800) 987-45698</li>
          </ul>
        </div>
        <div>
          <h3 className="font-normal text-xl text-main ">Follow</h3>
          <div className="flex justify-center md:justify-start mt-2 space-x-8 ">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Google">
              <FaGoogle />
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-normal text-xl text-main">Download our app</h3>
          <div className="flex justify-center md:justify-start mt-2 space-x-2">
            <img src="/options.png" alt="Google Play && Apple Store" className="w-32" />
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-[#1C1A1A] text-base">
        © Copyright 2024 <strong>name</strong> Website
      </div>
    </footer>
  );
}

export default Footer;
