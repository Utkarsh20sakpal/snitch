import React, { useEffect } from "react";
import { useProduct } from "../products/hooks/useproduct";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  Package,
  Plus,
  ImageOff,
  ShieldCheck,
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

const ProductCard = ({ product }) => {
  const { title, description, price, images, createdAt, _id } = product;
  const symbol = CURRENCY_SYMBOLS[price?.currency] || price?.currency || "";
  const thumb = images?.[0]?.url;
  const imageCount = images?.length || 0;
  const date = createdAt
    ? new Date(createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : null;

  return (
    <Link
      to={`/seller/product/${_id}`}
      className="group relative rounded-xl border border-zinc-800 bg-[#0D0F13] overflow-hidden hover:border-zinc-500 transition-all duration-200 block"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] bg-[#090B0E] overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-6 h-6 text-zinc-700" />
          </div>
        )}

        {/* Image count badge */}
        {imageCount > 1 && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm flex items-center gap-1">
            <span className="font-mono text-[9px] text-zinc-400">{imageCount} imgs</span>
          </div>
        )}

        {/* Top specular line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-zinc-100 leading-tight truncate group-hover:text-white transition-colors">
            {title}
          </p>
          <span className="shrink-0 font-mono text-sm text-white font-bold">
            {symbol}{price?.amount?.toLocaleString("en-IN")}
          </span>
        </div>

        {description && (
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60">
          <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
            {price?.currency}
          </span>
          {date && (
            <span className="font-mono text-[9px] text-zinc-700">
              {date}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  const totalValue = sellerProducts?.reduce(
    (sum, p) => sum + (p.price?.amount || 0),
    0
  );

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-[#E2E8F0] font-sans overflow-x-hidden">
      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-zinc-700/10 via-slate-400/5 to-transparent rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/95 via-zinc-200 to-zinc-400 p-[1px] shadow-[0_0_12px_rgba(255,255,255,0.15)] shrink-0">
              <div className="w-full h-full bg-[#08090C] rounded-[7px] flex items-center justify-center">
                <Package className="w-4 h-4 text-zinc-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  Seller Protocol // Dashboard
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase leading-tight">
                Your Listings
              </h1>
            </div>
          </div>

          <Link
            to="/seller/create-product"
            className="chrome-button flex items-center gap-2 px-4 py-2.5 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Drop</span>
          </Link>
        </div>

        {/* Stats strip */}
        {sellerProducts?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-xl border border-zinc-800 bg-[#0D0F13] px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-1">
                Total Listings
              </p>
              <p className="text-2xl font-semibold text-white">{sellerProducts.length}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-[#0D0F13] px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-1">
                Portfolio Value
              </p>
              <p className="text-2xl font-semibold text-white">
                ₹{totalValue?.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-[#0D0F13] px-4 py-3 hidden sm:block">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 mb-1">
                Avg. Price
              </p>
              <p className="text-2xl font-semibold text-white">
                ₹{sellerProducts.length ? Math.round(totalValue / sellerProducts.length).toLocaleString("en-IN") : 0}
              </p>
            </div>
          </div>
        )}

        {/* Products grid */}
        {sellerProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellerProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="obsidian-card relative rounded-2xl border border-white/10 p-12 text-center overflow-hidden">
            <div className="absolute -top-[1px] left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/30 to-transparent" />
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-center">
                <Tag className="w-6 h-6 text-zinc-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                  No listings yet
                </p>
                <p className="text-xs text-zinc-600 font-mono mt-1 tracking-wider">
                  Your atelier is empty. List your first drop.
                </p>
              </div>
              <Link
                to="/seller/create-product"
                className="chrome-button inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase mt-2 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                List a Piece
              </Link>
            </div>
          </div>
        )}

        {/* Footer strip */}
        <div className="mt-10 pt-5 border-t border-zinc-800/60 flex items-center justify-center gap-2 text-zinc-600">
          <ShieldCheck className="w-3 h-3" />
          <span className="font-mono text-[9px] uppercase tracking-wider">
            Seller Verified · Secure Listings · Editorial Review
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
