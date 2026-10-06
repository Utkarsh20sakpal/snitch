import React from "react";
import { GOOGLE_AUTH_URL } from "../services/auth.api";

/**
 * Official Google Identity Compliant Button
 * Strict adherence to Google Sign-In Branding Guidelines:
 * - Official multi-color 'G' logo geometry and exact brand hex codes
 * - Approved button text: "Continue with Google"
 * - Font: Roboto / System sans-serif with 500 (medium) weight
 * - Standardized dimensions, padding, minimum clear space, and hover/active states
 */
export const GoogleAuthButton = ({
  text = "Continue with Google",
  variant = "light", // 'light' (standard official Google white) or 'dark' (official Google dark)
  className = "",
  onClick,
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }
    // Redirect browser to initiate Google OAuth 2.0 flow
    window.location.href = GOOGLE_AUTH_URL;
  };

  const isDark = variant === "dark";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={text}
      className={`group relative w-full h-11 px-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer select-none font-sans font-medium text-sm border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#050608] ${
        isDark
          ? "bg-[#131314] hover:bg-[#1c1d1f] active:bg-[#282a2d] border-[#8e918f]/50 hover:border-[#8e918f] text-[#e3e3e3] shadow-md focus:ring-zinc-400"
          : "bg-white hover:bg-neutral-50 active:bg-neutral-100 border-[#dadce0] text-[#1f1f1f] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.18)] focus:ring-white/80"
      } ${className}`}
    >
      {/* Official Standard Google 'G' Mark (Exact SVG geometry & Pantone palette) */}
      <span className="shrink-0 flex items-center justify-center w-5 h-5">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue */}
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          {/* Green */}
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          {/* Yellow */}
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            fill="#FBBC05"
          />
          {/* Red */}
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            fill="#EA4335"
          />
        </svg>
      </span>

      {/* Button Text following exact capitalization & typography guidelines */}
      <span className="tracking-normal font-medium leading-none">
        {text}
      </span>
    </button>
  );
};

export default GoogleAuthButton;
