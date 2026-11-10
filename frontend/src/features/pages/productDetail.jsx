import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useProduct } from "../products/hooks/useproduct";
import { useAuth } from "../auth/hooks/useAuth";
import {
  ArrowLeft,
  ShieldCheck,
  Package,
  ImageOff,
  ChevronLeft,
  ChevronRight,
  Shirt,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
};

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handelGetProductById } = useProduct();
  const { handelGetMe, user } = useAuth();
  const products = useSelector((state) => state.product.products) || [];

  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [acquired, setAcquired] = useState(false);

  useEffect(() => {
    handelGetMe();

    async function fetchProduct() {
      setLoading(true);
      setError("");

      // Try finding from store first for instantaneous render
      const existing = products.find((p) => p._id === id);
      if (existing) {
        setProduct(existing);
      }

      // Fetch fresh data from backend
      try {
        const data = await handelGetProductById(id);
        if (data) {
          setProduct(data);
        } else if (!existing) {
          setError("This piece could not be located in the atelier archive.");
        }
      } catch (err) {
        if (!existing) {
          setError(
            err.response?.data?.message ||
              "Failed to retrieve piece details from vault."
          );
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const images = product?.images || [];
  const symbol =
    CURRENCY_SYMBOLS[product?.price?.currency] || product?.price?.currency || "";
  const dateFormatted = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  const isSellerOfProduct =
    user &&
    (product?.seller === user.id ||
      product?.seller?._id === user.id ||
      user.role === "seller");

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-[#E2E8F0] font-sans selection:bg-zinc-700 selection:text-white overflow-x-hidden">
      {/* Specular Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="absolute top-1/4 right-1/4 w-[750px] h-[750px] bg-gradient-to-tr from-zinc-700/10 via-slate-400/5 to-transparent rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-white/[0.02] via-zinc-800/10 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <header className="w-full border-b border-white/[0.06] bg-[#050608]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            {/* Back CTA */}
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg border border-zinc-800 bg-[#0C0E12] flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <span className="uppercase tracking-widest hidden sm:inline">
                Back to Archive
              </span>
            </button>

            {/* Brand Logo */}
            <Link to="/" className="group flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/95 via-zinc-200 to-zinc-400 p-[1px] shadow-[0_0_15px_rgba(255,255,255,0.18)]">
                <div className="w-full h-full bg-[#08090C] rounded-[7px] flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-white tracking-tighter">
                    SN
                  </span>
                </div>
              </div>
              <span className="text-base font-semibold tracking-[0.25em] uppercase text-white/95 group-hover:text-white transition-colors">
                SNITCH
              </span>
            </Link>

            {/* Right Status */}
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                A/W 2026 // PIECE DOSSIER
              </span>

              {user?.role === "seller" && (
                <Link
                  to="/seller/dashboard"
                  className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12">
          {loading && !product ? (
            /* Loading Skeleton */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 animate-pulse">
              <div className="lg:col-span-7 aspect-[4/3] rounded-2xl bg-[#0D0F13] border border-zinc-800" />
              <div className="lg:col-span-5 space-y-5">
                <div className="h-4 bg-zinc-800 rounded w-1/3" />
                <div className="h-8 bg-zinc-800 rounded w-3/4" />
                <div className="h-6 bg-zinc-800 rounded w-1/4" />
                <div className="h-24 bg-zinc-800/60 rounded w-full" />
                <div className="h-12 bg-zinc-800 rounded w-full" />
              </div>
            </div>
          ) : error && !product ? (
            /* Error / Not Found */
            <div className="obsidian-card relative rounded-2xl border border-white/10 p-12 sm:p-16 text-center max-w-xl mx-auto my-12">
              <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-zinc-500" />
              </div>
              <h2 className="text-xl font-semibold text-white uppercase tracking-tight">
                Piece Not Found
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-2 leading-relaxed">
                {error}
              </p>
              <Link
                to="/"
                className="chrome-button inline-flex items-center gap-2 px-6 py-3 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase mt-6 cursor-pointer"
              >
                Return to Archive
              </Link>
            </div>
          ) : product ? (
            /* Product Showcase */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* LEFT: Visual Archive Gallery */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Primary High-Resolution Viewport */}
                <div className="obsidian-card relative rounded-2xl border border-white/10 bg-[#0A0C10] overflow-hidden aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-4 shadow-2xl">
                  {/* Top Specular Sheen */}
                  <div className="absolute -top-[1px] left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/50 to-transparent z-10" />

                  {images.length > 0 ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={images[activeImageIndex]?.url}
                        alt={product.title}
                        className="w-full h-full object-contain filter contrast-105"
                      />

                      {/* Frame Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[10px] text-zinc-300 uppercase tracking-widest">
                        FRAME {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                        {String(images.length).padStart(2, "0")}
                      </div>

                      {/* Navigation Controls */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === 0 ? images.length - 1 : prev - 1
                              )
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black/90 transition-all cursor-pointer shadow-lg"
                            aria-label="Previous frame"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() =>
                              setActiveImageIndex((prev) =>
                                prev === images.length - 1 ? 0 : prev + 1
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-black/90 transition-all cursor-pointer shadow-lg"
                            aria-label="Next frame"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-zinc-600">
                      <ImageOff className="w-12 h-12" />
                      <span className="font-mono text-xs uppercase tracking-wider">
                        No imagery available
                      </span>
                    </div>
                  )}
                </div>

                {/* Thumbnails Filmstrip */}
                {images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto py-2">
                    {images.map((img, idx) => (
                      <button
                        key={img._id || idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-white ring-2 ring-white/30 scale-102"
                            : "border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-black/70 font-mono text-[8px] text-zinc-300">
                          {idx + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Specification Dossier */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="obsidian-card relative rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
                  {/* Top Specular Sheen */}
                  <div className="absolute -top-[1px] left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent" />

                  {/* Header Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                        AUTHENTICATED DROP // A/W 2026
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 font-mono text-[10px] text-zinc-300 uppercase tracking-wider">
                      VERIFIED
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white uppercase leading-snug">
                      {product.title}
                    </h1>
                    <div className="mt-3 flex items-baseline gap-3">
                      <span className="font-mono text-3xl font-bold text-white tracking-tight">
                        {symbol}{product.price?.amount?.toLocaleString("en-IN")}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        {product.price?.currency}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-zinc-800/80" />

                  {/* Description / Atelier Notes */}
                  <div className="space-y-2">
                    <h3 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Shirt className="w-3.5 h-3.5 text-zinc-400" />
                      Atelier Notes & Fabric Specifications
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
                      {product.description ||
                        "No detailed composition supplied for this garment."}
                    </p>
                  </div>

                  {/* Metadata Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl border border-zinc-800/90 bg-[#090B0E]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">
                        Catalog ID
                      </span>
                      <span className="font-mono text-xs text-zinc-200 block mt-1 truncate">
                        {product._id}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-zinc-800/90 bg-[#090B0E]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">
                        Archived Date
                      </span>
                      <span className="font-mono text-xs text-zinc-200 block mt-1">
                        {dateFormatted || "Recent Drop"}
                      </span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="pt-2 space-y-3">
                    {acquired ? (
                      <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs font-mono">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>Piece reserved under your private atelier ledger.</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAcquired(true)}
                        className="chrome-button w-full py-4 px-6 rounded-xl text-zinc-950 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                      >
                        <Sparkles className="w-4 h-4 text-zinc-900" />
                        <span>Reserve Piece // Escrow Acquire</span>
                      </button>
                    )}

                    {isSellerOfProduct && (
                      <Link
                        to="/seller/dashboard"
                        className="w-full py-3 rounded-xl text-xs font-mono font-medium text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-900/50 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Manage in Seller Dashboard
                      </Link>
                    )}
                  </div>

                  {/* Trust Strip */}
                  <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                    <div className="flex items-center gap-2 text-zinc-400 text-[11px] font-mono">
                      <ShieldCheck className="w-4 h-4 text-zinc-300" />
                      <span>Authenticity Certificate Included</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Escrow payment protected & insured shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-white/[0.06] py-6 px-6 bg-[#050608]/90 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 font-mono text-xs">
            <p>© 2026 SNITCH ATELIER. High-End Streetwear Syndicate.</p>
            <div className="flex items-center gap-3 text-[10px] tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>TLS 1.3 · Escrow Guard · White-Glove Dispatch</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProductDetail;

