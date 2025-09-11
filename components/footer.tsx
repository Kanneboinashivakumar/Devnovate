"use client";
import { useEffect } from "react";
import "../app/footer.css";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaDiscord, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  useEffect(() => {
    const text = "Join the Devnovate";
    const speed = 120; // typing speed per character
    const pause = 2000; // wait 2 seconds after typing

    const typingElement = document.getElementById("typing-text");
    if (!typingElement) return;

    let typingInterval: NodeJS.Timeout;
    let isTyping = false;

    function startTyping() {
      if (isTyping) return; // prevent multiple observers from starting new loops
      isTyping = true;

      let i = 0;
      typingElement.innerHTML = "";

      function type() {
        if (i < text.length) {
          typingElement.innerHTML += text.charAt(i);
          i++;
          typingInterval = setTimeout(type, speed);
        } else {
          setTimeout(() => {
            typingElement.innerHTML = ""; // clear after pause
            i = 0;
            type(); // restart typing
          }, pause);
        }
      }

      type();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTyping();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(typingElement);

    return () => {
      clearTimeout(typingInterval);
      observer.disconnect();
    };
  }, []);


  return (
    <>
      {/* Purple Banner */}
      <section className="purple-banner">
        <h2>Inspiring, educating and entertaining entrepreneurs.</h2>
        <p>Save, invest, and manage your money effortlessly.</p>
        <button className="cta-btn">
          <span id="typing-text"></span>
          <FaArrowRight />
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* Left */}
          <div className="footer-left">
            <img src="/assests/logo.png" alt="Devnovate Logo" className="footer-logo" />
            <p>
              Every week, we share content to help you grow your business. Don't miss a thing — drop us your mail.
            </p>
          </div>

          {/* Right: Columns */}
          <div className="footer-right">
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About us</a>
              <a href="#">Contact us</a>
              <a href="#">Partners</a>
            </div>
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Services</a>
              <a href="#">Membership</a>
              <a href="#">Blog</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Events</a>
              <a href="#">Photo Gallery</a>
              <a href="#">Documentation</a>
            </div>
          </div>
        </div>

        {/* Newsletter + Social Icons */}
        <div className="footer-row">
          <div className="newsletter">
            <h2 className="newsletter-title gradient-text">Newsletter</h2>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>

          <div className="social-icons">
            <a href="#"><FaInstagram size={24} /></a>
            <a href="#"><FaLinkedinIn size={24} /></a>
            <a href="#"><FaTiktok size={24} /></a>
            <a href="#"><FaDiscord size={24} /></a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p><strong>© 2025 Devnovate. All rights reserved.</strong></p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies Setting</a>
          </div>
        </div>
      </footer>
    </>
  );
}
