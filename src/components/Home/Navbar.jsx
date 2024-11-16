import { useState, useEffect, useRef, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [isArabic, setIsArabic] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  const sections = useMemo(() => ["heroSection", "features", "howItWorks", "contactUs"], []);

  const toggleLanguage = (lang) => {
    setIsArabic(lang === "ar");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-42% 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) observer.unobserve(section);
      });
    };
  }, [sections]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="py-3 border-b-2 border-[#B3C5CE] fixed top-0 left-0 w-full bg-white z-30">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-8">
          <div className="text-2xl md:text-3xl font-bold text-main">LOGO</div>
        </Link>

        <div className="hidden text-lg md:flex md:space-x-6 justify-center flex-grow text-center">
          {sections.map((section, index) => (
            <a key={index} href={`#${section}`} onClick={() => handleSectionClick(section)} className={`text-primary ${location.hash === `#${section}` || activeSection === section ? "text-[#013E5D] font-bold border-b-2 border-yellow-500" : ""}`}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-main rounded-md text-white text-[10px] md:text-base px-4 py-2 hover:bg-hoverButton transition duration-300" onClick={() => navigate("/chooseRole")}>
            Get Started
          </button>
          <div className="flex items-center border border-main rounded-full overflow-hidden">
            <button onClick={() => toggleLanguage("en")} className={`px-4 md:px-5 py-[6px] text-[9px] md:text-base ${!isArabic ? "bg-main rounded-full text-white" : "bg-white text-primary"}`}>
              en
            </button>
            <button onClick={() => toggleLanguage("ar")} className={`px-4 md:px-5 py-[6px] text-[9px] md:text-base ${isArabic ? "bg-main rounded-full text-white" : "bg-white text-primary"}`}>
              ar
            </button>
          </div>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <FaTimes className="text-2xl text-main" /> : <FaBars className="text-2xl text-main" />}</button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMenuOpen(false)}></div>
          <div ref={menuRef} className="md:hidden bg-white z-20 shadow-md text-center py-4 space-y-4 absolute top-0 left-0 right-0">
            <div className="flex justify-between pr-4 pl-4">
              <Link to="/" className="flex items-center space-x-8">
                <div className="text-3xl font-bold text-main">LOGO</div>
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <FaTimes className="text-2xl text-main" />
              </button>
            </div>

            {sections.map((section) => (
              <a key={section} href={`#${section}`} onClick={() => handleSectionClick(section)} className={`text-primary block py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 ${location.hash === `#${section}` || activeSection === section ? "text-[#013E5D] font-bold " : ""}`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
