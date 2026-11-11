import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/hooks/useAuth";
import { useProduct } from "../products/hooks/useproduct";
import {
  Package,
  LogIn,
  LayoutDashboard,
  Plus,
  ImageOff,
  ShieldCheck,
  User,
  Search,
  Sparkles,
  ArrowRight,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Shirt,
  Tag,
} from "lucide-react";

const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
};

/* ─── Navigation Header ────────────────────────────────────── */
const Navbar = ({ user }) => {
  return (
    <header className="relative z-20 w-full border-b border-white/[0.06] bg-[#050608]/80 backdrop-blur-md sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
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
            A/W 2026 // ATELIER ARCHIVE
          </span>
        </div>

        {/* User / Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Role Indicator */}
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-400 border border-zinc-800 bg-zinc-900/50 rounded-full px-2.5 py-1">
                <span className={`w-1.5 h-1.5 rounded-full ${user.role === "seller" ? "bg-emerald-400" : "bg-zinc-400"}`} />
                {user.role}
              </span>

              {/* Seller Actions */}
              {user.role === "seller" && (
                <div className="flex items-center gap-2">
                  <Link
                    to="/seller/create-product"
                    className="chrome-button hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-950 text-xs font-semibold tracking-wider uppercase cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Drop</span>
                  </Link>

                  <Link
                    to="/seller/dashboard"
                    className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-900/60 px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                </div>
              )}

              {/* User Pill */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60">
                <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-300 uppercase">
                  {(user.fullName || user.email || "U")[0]}
                </div>
                <span className="font-mono text-xs text-zinc-300 max-w-[120px] truncate hidden sm:inline">
                  {user.fullName || user.email?.split("@")[0]}
                </span>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 px-3.5 py-1.5 rounded-lg transition-all duration-200"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In
              </Link>
              <Link
                to="/register"
                className="chrome-button flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-zinc-950 text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Join Dossier
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

/* ─── Product Card ─────────────────────────────────────────── */
const ProductCard = ({ product }) => {
  const { title, description, price, images, _id } = product;
  const symbol = CURRENCY_SYMBOLS[price?.currency] || price?.currency || "";
  const thumb = images?.[0]?.url;
  const imageCount = images?.length || 0;

  return (
    <Link
      to={`/product/${_id}`}
      className="group relative rounded-xl border border-zinc-800/90 bg-[#0C0E12] overflow-hidden hover:border-zinc-500 transition-all duration-300 flex flex-col cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] bg-[#07080B] overflow-hidden shrink-0">
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-zinc-700">
            <ImageOff className="w-6 h-6" />
            <span className="font-mono text-[9px] uppercase tracking-wider">No Preview</span>
          </div>
        )}

        {/* Top Specular Sheen */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono tracking-widest bg-black/75 backdrop-blur-md text-zinc-300 border border-white/10 uppercase">
            A/W 2026
          </span>
        </div>

        {imageCount > 1 && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10">
            {imageCount} FRAMES
          </div>
        )}

        {/* Hover Inspect Pill */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-600 text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform duration-200">
            <Eye className="w-3 h-3 text-zinc-300" />
            Inspect Piece
          </span>
        </div>
      </div>

      {/* Info Card Content */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-2.5 bg-gradient-to-b from-[#0C0E12] to-[#0A0B0E]">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-zinc-100 leading-snug line-clamp-1 group-hover:text-white transition-colors uppercase">
              {title}
            </h3>
            <span className="shrink-0 font-mono text-sm text-white font-bold tracking-tight">
              {symbol}{price?.amount?.toLocaleString("en-IN")}
            </span>
          </div>

          {description && (
            <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-2 mt-1.5">
              {description}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <span className="uppercase tracking-widest">{price?.currency || "INR"}</span>
          <span className="group-hover:text-zinc-300 transition-colors flex items-center gap-1 text-[9px] uppercase tracking-wider">
            View Details <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

/* ─── Skeleton Loading Card ────────────────────────────────── */
const SkeletonCard = () => (
  <div className="rounded-xl border border-zinc-800/80 bg-[#0C0E12] overflow-hidden animate-pulse">
    <div className="aspect-[4/3] bg-zinc-900/70" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between gap-3">
        <div className="h-4 bg-zinc-800 rounded w-2/3" />
        <div className="h-4 bg-zinc-800 rounded w-1/4" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 bg-zinc-800/50 rounded w-full" />
        <div className="h-3 bg-zinc-800/40 rounded w-4/5" />
      </div>
      <div className="pt-2 border-t border-zinc-800/50 flex justify-between">
        <div className="h-2.5 bg-zinc-800/60 rounded w-12" />
        <div className="h-2.5 bg-zinc-800/60 rounded w-16" />
      </div>
    </div>
  </div>
);

/* ─── Main Home Page Component ─────────────────────────────── */
const Home = () => {
  const { handleGetMe, user, loading: authLoading } = useAuth();
  const { handleGetAllProducts } = useProduct();
  const products = useSelector((state) => state.product.products) || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("latest"); // 'latest', 'price-low', 'price-high'
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Rehydrate authenticated user & load catalogue
    handleGetMe();
    handleGetAllProducts().finally(() => setFetching(false));
  }, []);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let list = Array.isArray(products) ? [...products] : [];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedSort === "price-low") {
      list.sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0));
    } else if (selectedSort === "price-high") {
      list.sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0));
    } else {
      // Latest first
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return list;
  }, [products, searchQuery, selectedSort]);

  const isSeller = user?.role === "seller";

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-[#E2E8F0] font-sans selection:bg-zinc-700 selection:text-white overflow-x-hidden">
      {/* Ambient Cyber-Luxury Specular Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-25"></div>
        <div className="absolute top-0 right-1/4 w-[750px] h-[550px] bg-gradient-to-b from-zinc-700/10 via-slate-400/5 to-transparent rounded-full blur-[180px]"></div>
        <div className="absolute top-1/2 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-white/[0.02] via-zinc-800/10 to-transparent rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar user={user} />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
          {/* ── Editorial Hero Banner ── */}
          <div className="mb-10 sm:mb-14 relative">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-white/[0.08]">
              <div className="max-w-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 animate-pulse"></span>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                    CURATED ARCHIVE // A/W 2026 RELEASE
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-none">
                  HIGH-END STREETWEAR <br />
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                    & ATELIER PIECES
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-lg leading-relaxed pt-1">
                  Explore private reserve drops, structural silhouettes, and authenticated editorial releases straight from verified ateliers.
                </p>
              </div>

              {/* Status / Quick Action Badge */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {isSeller ? (
                  <Link
                    to="/seller/create-product"
                    className="chrome-button px-5 py-3 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Drop</span>
                  </Link>
                ) : !user && !authLoading ? (
                  <Link
                    to="/register"
                    className="chrome-button px-5 py-3 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Request Seller Access</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : null}

                <div className="px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-[#0C0E12] font-mono text-[11px] text-zinc-400 flex items-center gap-2">
                  <Shirt className="w-3.5 h-3.5 text-zinc-300" />
                  <span>
                    <strong className="text-white font-semibold">{products.length}</strong> DROPS IN VAULT
                  </span>
                </div>
              </div>
            </div>

            {/* ── Filter / Search Bar ── */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md group">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-200 transition-colors pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search drops by silhouette, tag, or title..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0C0E12] border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400/20 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort Controls */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <div className="flex items-center rounded-xl border border-zinc-800 bg-[#0C0E12] p-1 font-mono text-xs">
                  <button
                    onClick={() => setSelectedSort("latest")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      selectedSort === "latest"
                        ? "bg-zinc-800 text-white font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Latest
                  </button>
                  <button
                    onClick={() => setSelectedSort("price-low")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      selectedSort === "price-low"
                        ? "bg-zinc-800 text-white font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Price ↑
                  </button>
                  <button
                    onClick={() => setSelectedSort("price-high")}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      selectedSort === "price-high"
                        ? "bg-zinc-800 text-white font-medium"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Price ↓
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Products Display Grid ── */}
          {fetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="obsidian-card relative rounded-2xl border border-white/10 p-12 sm:p-16 text-center overflow-hidden my-6">
              <div className="absolute -top-[1px] left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/30 to-transparent" />
              <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-center">
                  <Package className="w-6 h-6 text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-200 uppercase tracking-wider">
                    {searchQuery ? "No Matching Pieces" : "Atelier Archive Empty"}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1 leading-relaxed">
                    {searchQuery
                      ? `No drops matched your query "${searchQuery}". Try refining search terms.`
                      : "No products currently listed in the seasonal drop."}
                  </p>
                </div>
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-mono text-zinc-300 hover:text-white underline underline-offset-4 uppercase tracking-wider transition-colors pt-1 cursor-pointer"
                  >
                    Clear Filter
                  </button>
                ) : isSeller ? (
                  <Link
                    to="/seller/create-product"
                    className="chrome-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase mt-2 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    List First Drop
                  </Link>
                ) : null}
              </div>
            </div>
          )}
        </main>

        {/* ── Editorial Footer ── */}
        <footer className="relative z-10 border-t border-white/[0.06] py-6 px-6 bg-[#050608]/90">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 font-mono text-xs">
            <p>© 2026 SNITCH ATELIER. High-End Streetwear & Archival Syndicate.</p>
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

export default Home;

