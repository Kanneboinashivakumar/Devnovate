import React from "react";
const GridPattern = ({ scrollY }) => {
  return (
    <div
      className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(146, 36, 187, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(146, 36, 187, 0.08) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        transform: `translateY(${scrollY * 0.1}px) rotate(-15deg) scale(2)`,
      }}
    />
  );
};


export default GridPattern;
