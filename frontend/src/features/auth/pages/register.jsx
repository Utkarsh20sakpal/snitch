import React, { useState } from "react";
import { Link } from "react-router";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Tag,
  Layers,
  Crown,
  Shirt,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { GoogleAuthButton } from "../components/GoogleAuthButton";

export const Register = () => {
  const { handleRegister, loading, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    countryCode: "+91",
    contact: "",
    password: "",
    isSeller: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (formError) setFormError("");
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strengthScore = getPasswordStrength(formData.password);
  const strengthLabels = ["EMPTY", "WEAK", "FAIR", "GOOD", "METALLIC SECURE"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSuccessMsg("");

    if (!formData.fullname.trim()) {
      setFormError("Please enter your legal full name.");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setFormError("Please enter a valid dispatch email address.");
      return;
    }
    if (!formData.contact.trim() || formData.contact.replace(/\D/g, "").length < 7) {
      setFormError("Please provide a valid concierge contact number.");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    const payload = {
      fullname: formData.fullname.trim(),
      email: formData.email.trim(),
      contact: `${formData.countryCode}${formData.contact.trim().replace(/\s+/g, "")}`,
      password: formData.password,
      isSeller: formData.isSeller,
    };

    const res = await handleRegister(payload);
    if (res?.success) {
      setSuccessMsg(
        formData.isSeller
          ? "Fashion Merchant dossier created! Welcome to SNITCH Atelier."
          : "Atelier access granted! Welcome to the SNITCH collective."
      );
    } else if (res?.error) {
      setFormError(res.error);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#050608] text-[#E2E8F0] selection:bg-zinc-700 selection:text-white overflow-x-hidden font-sans">
      {/* Ambient Cyber-Luxury Lighting & Specular Sheen */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-zinc-700/10 via-slate-400/5 to-transparent rounded-full blur-[180px]"></div>
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-bl from-white/[0.03] via-zinc-800/10 to-transparent rounded-full blur-[150px]"></div>
      </div>

      {/* Top Editorial Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-white/[0.06]">
        {/* Brand Wordmark & Season Pill */}
        <div className="flex items-center gap-5">
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/95 via-zinc-200 to-zinc-400 p-[1px] shadow-[0_0_15px_rgba(255,255,255,0.18)]">
              <div className="w-full h-full bg-[#08090C] rounded-[7px] flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-white tracking-tighter">SN</span>
              </div>
            </div>
            <span className="text-base font-semibold tracking-[0.25em] uppercase text-white/95 group-hover:text-white transition-colors">
              SNITCH
            </span>
          </Link>

          <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 tracking-widest pl-4 border-l border-zinc-800 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse"></span>
            A/W 2026 // ATELIER
          </span>
        </div>

        {/* Fashion Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs text-zinc-400 tracking-wider uppercase">
          <span className="hover:text-white cursor-pointer transition-colors">Collections</span>
          <span className="hover:text-white cursor-pointer transition-colors">Runway</span>
          <span className="hover:text-white cursor-pointer transition-colors">Streetwear</span>
          <span className="hover:text-white cursor-pointer transition-colors">Atelier</span>
        </nav>

        {/* Trailing Sign In CTA */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 hidden sm:inline-block">Member already?</span>
          <Link
            to="/login"
            className="text-xs font-medium text-zinc-200 hover:text-white px-4 py-2 rounded-lg border border-zinc-700/60 hover:border-zinc-500 bg-zinc-900/60 backdrop-blur transition-all duration-200 flex items-center gap-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </Link>
        </div>
      </header>

      {/* Main Split Layout: Lookbook Visual Matrix + Registration Dossier */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Fashion Lookbook Editorial Pane */}
          <div className="lg:col-span-5 max-lg:hidden flex flex-col justify-between relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0A0C10] min-h-[700px] p-8 shadow-2xl">
            {/* Editorial Background Image Asset */}

            <div className="absolute inset-0 z-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv3trY1iqyw0XF0S4VW6coXNDF8LXD3EcFLanLFK6Ee3O-UfRGCe4nKTQjZ2ShqswsTPrZPIKavFbXWdcHxPDVQwjAMDWHelZ3D2lpmxh1y0Jxo7mn-V9M49mwA-xEfO1stLoZe76rQwrOnmqLW6vf8DdND6duS7P8b57U1pHJP8tboM6y5Cm1ID-viL0EF_MTqlA-wZ4OtJf5Nwzx8vTYisbAjxpen32MzYqWhnDh9hOSxeHPg1-9v03lv71IJMJyWHLKvqtW4A_Q"
                alt="SNITCH Haute Couture Campaign"
                className="w-full h-full object-cover object-center filter contrast-105 brightness-95 opacity-80 transition-transform duration-1000 hover:scale-105"
              />
              {/* Dark editorial vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/40 to-[#050608]/70"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/50 via-transparent to-[#050608]/80"></div>
            </div>

            {/* Top Fashion Badges */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] text-zinc-100 tracking-widest uppercase bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 w-fit flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-zinc-300" />
                  COLLECTION 2026 // ATELIER
                </span>
                <span className="font-mono text-[10px] text-zinc-400 tracking-widest pl-1">
                  LIMITED PRIVATE DROP 04
                </span>
              </div>
              <div className="px-2.5 py-1 rounded-md bg-zinc-900/90 backdrop-blur border border-white/20 shadow-md">
                <span className="font-mono text-xs text-white tracking-wider font-semibold">
                  RUNWAY EXCLUSIVE
                </span>
              </div>
            </div>

            {/* Center Fashion Concept Overlay */}
            <div className="relative z-10 my-auto pointer-events-none py-8">
              <div className="font-mono text-[11px] text-zinc-400 tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                <Shirt className="w-3.5 h-3.5 text-zinc-300" />
                HAUTE STREETWEAR ARCHIVE
              </div>
              <h2 className="text-3xl font-light tracking-tight leading-none uppercase text-white">
                LIQUID<br />
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  OBSIDIAN
                </span><br />
                SERIES
              </h2>
              <div className="w-14 h-px bg-white/30 my-4"></div>
              <p className="text-xs text-zinc-300 max-w-xs font-light leading-relaxed">
                Sculptural tailored silhouettes, metallic treated outerwear, and brushed silver hardware for the next era of fashion.
              </p>

              {/* Tag preview */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-200 border border-white/10">
                  #OversizedBlazer
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-200 border border-white/10">
                  #ChromeHardware
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-200 border border-white/10">
                  #CoutureDenim
                </span>
              </div>
            </div>

            {/* Bottom Lookbook Metadata Bar */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] text-zinc-400 uppercase">EDITION RUN</p>
                <p className="font-mono text-xs text-white font-semibold">120 BESPOKE PIECES</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] text-zinc-400 uppercase">FLAGSHIPS</p>
                <p className="font-mono text-xs text-zinc-300">PARIS · TOKYO · MILAN</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Registration Card Form with ample breathing space */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="obsidian-card relative rounded-2xl border border-white/10 p-7 sm:p-10 transition-all duration-300">
              {/* Top Specular Rim */}
              <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent"></div>

              {/* Header Section */}
              <div className="mb-7">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 animate-pulse"></span>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                    INVITATION SECURED // CLOTHING & ATELIER
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2 uppercase">
                  CREATE YOUR DOSSIER
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Join the SNITCH collective for private seasonal apparel drops and bespoke luxury streetwear.
                </p>
              </div>

              {/* Success Notification */}
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{successMsg}</p>
                </div>
              )}

              {/* Error Notification */}
              {(formError || authError) && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{formError || authError}</p>
                </div>
              )}

              {/* Continue with Google Button (Adhering to Official Google Branding Rules) */}
              <div className="space-y-4 mb-5">
                <GoogleAuthButton
                  text="Continue with Google"
                  variant="light"
                  className="shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                />

                {/* Haute Couture Architectural Divider */}
                <div className="relative py-2 flex items-center">
                  <div className="flex-grow border-t border-zinc-800"></div>
                  <span className="shrink-0 px-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    OR REGISTER DOSSIER WITH EMAIL
                  </span>
                  <div className="flex-grow border-t border-zinc-800"></div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                    Client Legal Name / Full Name
                  </label>
                  <div className="relative group">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-200 transition-colors pointer-events-none" />
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      placeholder="e.g. Julian K. Vance"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                      Atelier Dispatch Email
                    </label>
                    <span className="font-mono text-[9px] text-zinc-400 tracking-wider uppercase">
                      VAULT PASS VALIDATED
                    </span>
                  </div>
                  <div className="relative group">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-200 transition-colors pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vance@atelier-snitch.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Contact Number with Country Selector */}
                <div className="space-y-1.5">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                    Direct Concierge Contact Number
                  </label>
                  <div className="flex gap-2.5">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-28 shrink-0 px-2.5 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-xs font-mono text-zinc-300 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 transition-all duration-200 cursor-pointer"
                    >
                      <option value="+91" className="bg-zinc-900">+91 (IN)</option>
                      <option value="+1" className="bg-zinc-900">+1 (US)</option>
                      <option value="+44" className="bg-zinc-900">+44 (UK)</option>
                      <option value="+33" className="bg-zinc-900">+33 (FR)</option>
                      <option value="+39" className="bg-zinc-900">+39 (IT)</option>
                      <option value="+81" className="bg-zinc-900">+81 (JP)</option>
                      <option value="+971" className="bg-zinc-900">+971 (AE)</option>
                    </select>

                    <div className="relative flex-1 group">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-200 transition-colors pointer-events-none" />
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Password with Eye Toggle and 4-Segment Strength Indicator */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                      Vault Cipher Security Key (Password)
                    </label>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {strengthLabels[strengthScore]}
                    </span>
                  </div>
                  <div className="relative group">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-200 transition-colors pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/30 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-200 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Micro Strength Bars */}
                  {formData.password && (
                    <div className="pt-1.5 flex items-center gap-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            strengthScore >= step
                              ? strengthScore <= 1
                                ? "bg-rose-500"
                                : strengthScore === 2
                                ? "bg-amber-400"
                                : "bg-zinc-200"
                              : "bg-zinc-800"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* isSeller Flag: Fashion Creator / Designer Checkbox Card */}
                <div className="pt-2">
                  <label
                    className={`group relative flex flex-col p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      formData.isSeller
                        ? "bg-zinc-900/80 border-zinc-500/80 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                        : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          type="checkbox"
                          name="isSeller"
                          checked={formData.isSeller}
                          onChange={handleChange}
                          className="w-4 h-4 rounded bg-[#090B0E] border-zinc-700 text-zinc-100 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-zinc-200"
                        />
                      </div>
                      <div className="flex-1 select-none">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                            Register as Fashion Creator / Atelier Merchant
                          </span>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-medium tracking-wider bg-zinc-800 border border-zinc-700 text-zinc-300">
                            BOUTIQUE
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                          Unlock designer portal, launch clothing lines into the SNITCH fashion marketplace, and manage inventory drops.
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Merchant Perks Drawer (Visible when seller checked) */}
                    {formData.isSeller && (
                      <div className="mt-3.5 pt-3 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center animate-fadeIn">
                        <div className="bg-[#050608]/70 p-2 rounded-lg border border-zinc-800">
                          <span className="block font-mono text-[9px] text-zinc-400 uppercase">COMMISSION</span>
                          <span className="font-mono text-xs text-white font-semibold">92% PAYOUT</span>
                        </div>
                        <div className="bg-[#050608]/70 p-2 rounded-lg border border-zinc-800">
                          <span className="block font-mono text-[9px] text-zinc-400 uppercase">FULFILLMENT</span>
                          <span className="font-mono text-xs text-white font-semibold">WHITE-GLOVE</span>
                        </div>
                        <div className="bg-[#050608]/70 p-2 rounded-lg border border-zinc-800">
                          <span className="block font-mono text-[9px] text-zinc-400 uppercase">CATALOG</span>
                          <span className="font-mono text-xs text-zinc-300 font-semibold">INSTANT DROP</span>
                        </div>
                      </div>
                    )}
                  </label>
                </div>

                {/* Submit CTA Button (Shiny Liquid Chrome) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="chrome-button w-full py-3.5 px-6 rounded-xl text-zinc-950 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-900" />
                        <span>Initializing Dossier...</span>
                      </>
                    ) : (
                      <>
                        <span>{formData.isSeller ? "Launch Fashion Brand →" : "Join the Atelier →"}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Switch to Login */}
              <div className="mt-6 text-center">
                <p className="text-xs text-zinc-400">
                  Already hold an atelier dossier?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-white hover:text-zinc-300 underline underline-offset-4 transition-colors"
                  >
                    Sign In to Dossier →
                  </Link>
                </p>
              </div>

              {/* Bottom Security Credentials */}
              <div className="mt-7 pt-4 border-t border-zinc-800/60 flex items-center justify-center gap-2 text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                  Authenticity Guaranteed · Cipher Encryption · White-Glove Courier
                </span>
              </div>
            </div>

            {/* Micro Trust Indicators below card */}
            <div className="mt-5 flex items-center justify-between px-3 text-[10px] font-mono tracking-wider uppercase text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                Curated Apparel
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                Seasonal Drops
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                Secure Escrow
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* Editorial Footer */}
      <footer className="relative z-20 w-full py-5 px-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto text-xs text-zinc-500 font-mono">
        <p>© 2026 SNITCH ATELIER. High-end Streetwear & Fashion Syndicate.</p>
        <div className="flex items-center gap-5 uppercase text-[10px] tracking-wider">
          <span className="hover:text-zinc-300 cursor-pointer transition-colors">Lookbook</span>
          <span className="hover:text-zinc-300 cursor-pointer transition-colors">Authenticity</span>
          <span className="hover:text-zinc-300 cursor-pointer transition-colors">Atelier Terms</span>
        </div>
      </footer>
    </div>
  );
};

export default Register;