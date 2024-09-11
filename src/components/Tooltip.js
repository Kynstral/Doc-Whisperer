import React, { useState } from "react";
import clsx from "clsx";

export default function Tooltip({
  message,
  children,
  placement = "top",
  arrow = true,
}) {
  const [visible, setVisible] = useState(false);

  const getTooltipPosition = () => {
    switch (placement) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      case "top-left":
        return "bottom-full left-0 mb-2";
      case "top-right":
        return "bottom-full right-0 mb-2";
      case "bottom-left":
        return "top-full left-0 mt-2";
      case "bottom-right":
        return "top-full right-0 mt-2";
      case "bottom-center":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "top-center":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "left-center":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right-center":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  const getArrowPosition = () => {
    switch (placement) {
      case "top":
      case "top-center":
        return "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-[#d2d4d5]/10 border-t-8 border-x-transparent border-x-8 border-b-0";
      case "bottom":
      case "bottom-center":
        return "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-[#d2d4d5]/10 border-b-8 border-x-transparent border-x-8 border-t-0";
      case "left":
      case "left-center":
        return "right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-l-[#d2d4d5]/10 border-l-8 border-y-transparent border-y-8 border-r-0";
      case "right":
      case "right-center":
        return "left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-r-[#d2d4d5]/10 border-r-8 border-y-transparent border-y-8 border-l-0";
      case "top-left":
        return "bottom-0 left-2 transform translate-y-full border-t-[#d2d4d5]/10 border-t-8 border-x-transparent border-x-8 border-b-0";
      case "top-right":
        return "bottom-0 right-2 transform translate-y-full border-t-[#d2d4d5]/10 border-t-8 border-x-transparent border-x-8 border-b-0";
      case "bottom-left":
        return "top-0 left-2 transform -translate-y-full border-b-[#d2d4d5]/10 border-b-8 border-x-transparent border-x-8 border-t-0";
      case "bottom-right":
        return "top-0 right-2 transform -translate-y-full border-b-[#d2d4d5]/10 border-b-8 border-x-transparent border-x-8 border-t-0";
      default:
        return "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-[#d2d4d5]/10 border-t-8 border-x-transparent border-x-8 border-b-0";
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={clsx(
            "absolute whitespace-nowrap bg-[#d2d4d5]/10 text-white text-sm px-2 py-2 rounded z-10",
            getTooltipPosition(),
          )}
        >
          {message}
          {arrow && (
            <div className={clsx("absolute w-0 h-0", getArrowPosition())}></div>
          )}
        </div>
      )}
    </div>
  );
}
