"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import GridPattern from "./Grid";
import { useRouter } from "next/navigation";

// Portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "SaaS MVP",
    description: "Complete MVP development with modern tech stack",
    imageUrl: "https://placehold.co/600x400/ff6b35/ffffff?text=SaaS+MVP",
  },
  {
    id: 2,
    title: "Quickreels",
    description: "Create videos with AI and share them with your audience on autopilot.",
    imageUrl: "https://placehold.co/600x400/4a90a4/ffffff?text=Quickreels",
  },
  {
    id: 3,
    title: "Moosemail",
    description: "Find verified leads, send targeted emails, and track results all in one place.",
    imageUrl: "https://placehold.co/600x400/a8d8a8/000000?text=Moosemail",
  },
  {
    id: 4,
    title: "ShopFynch",
    description: "The social shopping network. Shop Better, Together.",
    imageUrl: "https://placehold.co/600x400/8b5fbf/ffffff?text=ShopFynch",
  },
  {
    id: 5,
    title: "Skylock",
    description: "Manage Your Files completely anywhere with WhatsApp.",
    imageUrl: "https://placehold.co/600x400/f0f0f0/000000?text=Skylock",
  },
];

// Hook for window size
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    let timeoutId = null;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize([window.innerWidth, window.innerHeight]);
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);
  return size;
};

// ===== SIGN UP MODAL COMPONENT =====
const SignUpModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Signed up as ${formData.name} (${formData.email})`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-orange-50 via-pink-100 to-purple-150 rounded-2xl w-full max-w-md p-6 relative shadow-2xl border border-white/30
      transform transition-transform duration-300 ease-out scale-95 opacity-0 animate-slideUpFadeIn"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
        >
          <X size={24} />
        </button>

        {/* Modal Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
          Sign Up
        </h2>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
            required
          />

          {/* Sign Up button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Divider with "or" */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-purple-300" />
          <span className="mx-2 text-purple-600 font-medium">or</span>
          <hr className="flex-grow border-purple-300" />
        </div>

        {/* Login button */}
        <button
          onClick={() => router.push("/login")}
          className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 rounded-xl font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
};

const SemiCirclePortfolioSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardPositions, setCardPositions] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [width] = useWindowSize();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const portfolioContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const calculatePositions = () => {
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const containerWidth = portfolioContainerRef.current
        ? portfolioContainerRef.current.offsetWidth
        : 1200;

      let positions;

      if (isMobile) {
        const cardHeight = 300;
        const horizontalCenter = 50;
        const horizontalOffset = 23;
        positions = portfolioItems.map((item, index) => {
          const rowIndex = Math.floor(index / 2);
          const isLeftColumn = index % 2 === 0;
          const isLastAndOdd =
            index === portfolioItems.length - 1 &&
            portfolioItems.length % 2 !== 0;
          return {
            ...item,
            position: {
              top: `${rowIndex * cardHeight}px`,
              left: isLastAndOdd
                ? "50%"
                : isLeftColumn
                  ? `${horizontalCenter - horizontalOffset}%`
                  : `${horizontalCenter + horizontalOffset}%`,
            },
            rotation: 0,
            zIndex: portfolioItems.length - index,
            ropeLength: "short",
          };
        });
      } else if (isTablet) {
        const cardHeight = 300;
        const horizontalPadding = 0.25;
        positions = portfolioItems.map((item, index) => {
          const rowIndex = Math.floor(index / 2);
          const isLeftColumn = index % 2 === 0;
          const isLastAndOdd =
            index === portfolioItems.length - 1 &&
            portfolioItems.length % 2 !== 0;
          return {
            ...item,
            position: {
              top: `${rowIndex * cardHeight}px`,
              left: isLastAndOdd
                ? "50%"
                : isLeftColumn
                  ? `${horizontalPadding * 100}%`
                  : `${(1 - horizontalPadding) * 100}%`,
            },
            rotation: isLeftColumn ? -5 : 5,
            zIndex: portfolioItems.length - index,
            ropeLength: "short",
          };
        });
      } else {
        const containerHeight = 500;
        const semiCircleWidth = containerWidth * 0.9;
        const semiCircleHeight = 200;
        const centerX = containerWidth / 2;
        const topY = 0;

        positions = portfolioItems.map((item, index) => {
          const progress = index / (portfolioItems.length - 1);
          const radius = semiCircleWidth / 2;
          const normalizedX = progress * 2 - 1;
          const x = centerX + normalizedX * radius;
          const y =
            topY + semiCircleHeight * Math.sqrt(1 - Math.pow(normalizedX, 2));
          const distanceFromCenter = Math.abs(0.5 - progress);
          let ropeLength = "medium";
          if (distanceFromCenter > 0.3) ropeLength = "short";
          else if (distanceFromCenter < 0.1) ropeLength = "long";
          const rotation = (0.5 - progress) * 30;
          return {
            ...item,
            position: {
              left: `${(x / containerWidth) * 100}%`,
              top: `${((y + 100) / containerHeight) * 100}%`,
            },
            rotation,
            ropeLength,
            zIndex: index + 1,
          };
        });
      }
      setCardPositions(positions);
    };
    calculatePositions();
  }, [width]);

  const getContainerHeight = () => {
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    if (isMobile) return `${portfolioItems.length * 280 + 100}px`;
    if (isTablet) {
      const numRows = Math.ceil(portfolioItems.length / 2);
      return `${numRows * 280 + 100}px`;
    }
    return "128px";
  };

  // Hanging rope component
  const HangingRope = ({ length }) => {
    const ropeHeights = { short: "h-8", medium: "h-16", long: "h-24" };
    return (
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0">
        <div
          className={`w-1 bg-gradient-to-b from-amber-700 to-amber-900 ${ropeHeights[length]} rounded-full shadow-sm`}
        />
        <div className="w-3 h-3 bg-amber-800 rounded-full shadow-sm -mt-1 border-2 border-amber-600"></div>
      </div>
    );
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-orange-50 via-pink-100 to-purple-150 overflow-hidden"
      ref={portfolioContainerRef}
    >
      <GridPattern scrollY={scrollY} />

      {/* ===== Navbar ===== */}
      <nav className="relative z-30 pt-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/40 backdrop-blur-lg rounded-full px-6 py-3 border border-white/50 shadow-md">
          <img
            src="/assests/DEVNOVATE LOGO BLACK.png"
            alt="logo"
            className="h-8"
          />
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-800 hover:text-[rgb(146,36,187)] transition-colors">
              Events
            </a>
            <a href="#" className="text-gray-800 hover:text-[rgb(146,36,187)] transition-colors">
              Communities
            </a>
            <a href="#" className="text-gray-800 hover:text-[rgb(146,36,187)] transition-colors">
              Jobs
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <button
              className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100"
              onClick={() => alert("Login Clicked")}
            >
              Log in
            </button>
            <button
              className="bg-[rgb(146,36,187)] text-white px-4 py-2 rounded-full font-medium hover:bg-[rgb(181,66,224)] flex items-center"
              onClick={() => setIsSignUpOpen(true)}
            >
              Sign Up <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-gray-800 hover:bg-white/50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-lg">
            <div className="flex flex-col space-y-4 text-center">
              <a href="#" className="text-gray-800 hover:text-[rgb(146,36,187)] py-2">
                Events
              </a>
              <a href="#" className="text-gray-800 hover:text-[rgb(146,36,187)] py-2">
                Communities
              </a>
              <a href="#" className="text-gray-800 hover:text-[rgb(146,36,187)] py-2">
                Jobs
              </a>
              <button
                className="bg-white text-gray-900 py-2 rounded-full font-medium"
                onClick={() => alert("Login Clicked")}
              >
                Log in
              </button>
              <button
                className="bg-[rgb(146,36,187)] text-white py-2 rounded-full font-medium hover:bg-[rgb(181,66,224)] flex items-center justify-center"
                onClick={() => setIsSignUpOpen(true)}
              >
                Sign Up <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ===== Hero Section ===== */}
      <div
        className={`relative z-10 pt-20 pb-16 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4 leading-tight text-balance">
            Where Innovation Meets
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[rgb(146,36,187)] mb-8 leading-tight text-balance">
            Collaboration
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-2">
            <span className="font-semibold text-gray-900">
              Discover, join, organize hackathons and tech events
            </span>
            <span className="text-[rgb(146,36,187)] font-medium ml-1 sm:ml-2">
              on the most comprehensive platform for developers and innovators.
            </span>
          </p>
          <div className="mt-10">
            <button
              className="bg-[rgb(146,36,187)] hover:bg-[rgb(181,66,224)] text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center mx-auto"
              onClick={() => setIsSignUpOpen(true)}
            >
              Join Now <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Cards */}
      <div className="relative max-w-7xl mx-auto mt-8 md:h-[650px]">
        {cardPositions.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-40 md:w-64 transition-all duration-700 ease-out ${hoveredCard === item.id ? "scale-105 z-50" : ""
              } ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            style={{
              top: item.position.top,
              left: item.position.left,
              transform: `translate(-50%, 0) rotate(${item.rotation}deg) ${hoveredCard === item.id ? "translateY(-5px)" : "translateY(0)"
                }`,
              zIndex: hoveredCard === item.id ? 50 : item.zIndex,
              transformOrigin: "top center",
              transitionDelay: `${300 + index * 100}ms`,
            }}
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <HangingRope length={item.ropeLength} />
            <div
              className={`bg-white rounded-2xl transition-all duration-500 overflow-hidden relative mt-2 border border-gray-200/50 ${hoveredCard === item.id
                ? "shadow-2xl shadow-purple-200/80"
                : "shadow-xl shadow-purple-100/60"
                }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-24 md:h-32 object-cover"
              />
              <div className="p-3 md:p-6 pt-2">
                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Spacer for dynamic height */}
      <div style={{ height: getContainerHeight() }}></div>

      {/* ===== SIGN UP MODAL ===== */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />

      <style>{`
        @keyframes swing {
          0% { transform: rotate(1.5deg); }
          100% { transform: rotate(-1.5deg); }
        }
        @keyframes slideUpFadeIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slideUpFadeIn {
          animation: slideUpFadeIn 0.3s forwards;
        }
      `}</style>
    </div>
  );
};

export default SemiCirclePortfolioSection;
