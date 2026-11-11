import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router";
import { useProduct } from "../products/hooks/useproduct";
import {
  ArrowLeft,
  Package,
  Plus,
  Trash2,
  ImagePlus,
  ImageOff,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Layers,
} from "lucide-react";

const CURRENCY_SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "CA$",
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free"];

export const SellerProductDetails = () => {
  const { productId } = useParams();
  const {
    handleGetProductById,
    handleAddProductVariant,
    handleDeleteProductVariant,
  } = useProduct();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Variant Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Form Fields
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [stock, setStock] = useState("");
  const [priceAmount, setPriceAmount] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  async function fetchProduct() {
    try {
      setLoading(true);
      setError("");
      const data = await handleGetProductById(productId);
      setProduct(data?.product || data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load product.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const resetForm = () => {
    setSize("");
    setColor("");
    setStock("");
    setPriceAmount("");
    imagePreviews.forEach((src) => URL.revokeObjectURL(src));
    setImages([]);
    setImagePreviews([]);
    setFormError("");
    setShowAddForm(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (images.length + files.length > 5) {
      setFormError("Maximum 5 images allowed per variant.");
      return;
    }
    const previews = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...previews]);
    if (formError) setFormError("");
  };

  const removeImage = (idx) => {
    URL.revokeObjectURL(imagePreviews[idx]);
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmitVariant = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!size && !color) {
      setFormError("Please enter at least a size or a color.");
      return;
    }

    if (!stock || isNaN(stock) || Number(stock) < 0) {
      setFormError("Please enter a valid stock number.");
      return;
    }

    const attrs = {};
    if (size) attrs["Size"] = size;
    if (color.trim()) attrs["Color"] = color.trim();

    const formData = new FormData();
    formData.append("stock", Number(stock));
    formData.append("attributes", JSON.stringify(attrs));

    if (priceAmount && Number(priceAmount) > 0) {
      formData.append("priceAmount", Number(priceAmount));
      formData.append(
        "priceCurrency",
        product?.price?.currency || "INR"
      );
    }

    images.forEach((img) => formData.append("images", img));

    setSubmitting(true);
    try {
      await handleAddProductVariant(productId, formData);
      resetForm();
      fetchProduct();
    } catch (err) {
      setFormError(err?.response?.data?.message || "Failed to add variant.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteVariant = async (variantId) => {
    if (!window.confirm("Delete this variant?")) return;
    setDeletingId(variantId);
    try {
      await handleDeleteProductVariant(productId, variantId);
      setProduct((prev) => ({
        ...prev,
        variants: prev.variants.filter((v) => v._id !== variantId),
      }));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete variant.");
    } finally {
      setDeletingId(null);
    }
  };

  const currencySymbol =
    CURRENCY_SYMBOLS[product?.price?.currency] || product?.price?.currency || "₹";
  const variants = product?.variants || [];
  const totalStock = variants.reduce((acc, v) => acc + (v.stock || 0), 0);

  return (
    <div className="relative min-h-screen w-full bg-[#050608] text-[#E2E8F0] font-sans overflow-x-hidden">
      {/* Subtle ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-zinc-700/10 via-slate-400/5 to-transparent rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/seller/dashboard"
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">Dashboard</span>
          </Link>

          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="chrome-button flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Variant</span>
            </button>
          )}
        </div>

        {/* ── Product Summary Strip ── */}
        {loading && !product ? (
          <div className="h-24 rounded-2xl bg-[#0D0F13] border border-zinc-800 animate-pulse mb-6" />
        ) : error && !product ? (
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-rose-300 text-xs font-mono mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : product ? (
          <div className="obsidian-card relative rounded-2xl border border-white/10 p-5 mb-8 overflow-hidden">
            <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent" />

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-xl border border-zinc-800 bg-[#090B0E] overflow-hidden shrink-0">
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700">
                      <ImageOff className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h1 className="text-base font-semibold text-white uppercase truncate">
                    {product.title}
                  </h1>
                  <p className="font-mono text-xs text-zinc-400 mt-0.5">
                    {currencySymbol}
                    {product.price?.amount?.toLocaleString("en-IN")}{" "}
                    <span className="text-zinc-600">
                      ({product.price?.currency})
                    </span>
                  </p>
                </div>
              </div>

              {/* Minimal stats */}
              <div className="flex items-center gap-4 text-right shrink-0">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-600 block">
                    Variants
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {variants.length}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-600 block">
                    Total Stock
                  </span>
                  <span className="font-mono text-sm font-semibold text-emerald-400">
                    {totalStock}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Add Variant Form (Minimal inline card) ── */}
        {showAddForm && (
          <div className="obsidian-card relative rounded-2xl border border-white/15 p-5 sm:p-6 mb-8 overflow-hidden animate-in fade-in duration-150">
            <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white font-semibold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-zinc-400" />
                New Variant
              </span>
              <button
                type="button"
                onClick={resetForm}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitVariant} className="space-y-4">
              {/* Size selection */}
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                  Size
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(size === s ? "" : s)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                        size === s
                          ? "bg-white text-zinc-950 font-semibold"
                          : "bg-[#090B0E] border border-zinc-800 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color & Stock row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                    Colorway
                  </label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Black, Charcoal, White"
                    className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="Units available"
                    className="w-full px-3 py-2 rounded-lg bg-[#090B0E] border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              {/* Optional price override */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                    Price Override (Optional)
                  </label>
                  <span className="font-mono text-[9px] text-zinc-600">
                    Leave blank to use base price ({currencySymbol}
                    {product?.price?.amount})
                  </span>
                </div>
                <div className="relative">
                  <DollarSign className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={priceAmount}
                    onChange={(e) => setPriceAmount(e.target.value)}
                    placeholder={String(product?.price?.amount || "0.00")}
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#090B0E] border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              {/* Minimal Image Upload */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                    Variant Images (Optional)
                  </label>
                  <span className="font-mono text-[9px] text-zinc-600">
                    {images.length}/5
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {images.length < 5 && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-2 rounded-lg border border-dashed border-zinc-800 hover:border-zinc-600 bg-[#090B0E] text-xs font-mono text-zinc-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ImagePlus className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Upload photos</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {imagePreviews.map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-9 h-9 rounded-lg overflow-hidden border border-zinc-800 shrink-0 group"
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-2 rounded-xl text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="chrome-button px-5 py-2 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Variant</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Variants List ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              Product Variants ({variants.length})
            </span>
          </div>

          {variants.length === 0 ? (
            <div className="obsidian-card relative rounded-2xl border border-white/10 p-8 text-center">
              <Package className="w-6 h-6 text-zinc-600 mx-auto mb-2" />
              <p className="text-xs text-zinc-400 font-mono">
                No variants added yet.
              </p>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="chrome-button inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-zinc-950 text-xs font-semibold tracking-wider uppercase mt-3 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add First Variant
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {variants.map((v) => {
                const attrs =
                  v.attributes instanceof Map
                    ? Object.fromEntries(v.attributes)
                    : v.attributes || {};
                const attrStrings = Object.entries(attrs).map(
                  ([k, val]) => `${k}: ${val}`
                );
                const thumb = v.images?.[0]?.url || product?.images?.[0]?.url;
                const vPrice = v.price?.amount || product?.price?.amount;

                return (
                  <div
                    key={v._id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800/80 bg-[#0C0E12] hover:border-zinc-700 transition-colors gap-3"
                  >
                    {/* Left: Thumbnail & Attributes */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg border border-zinc-800 bg-[#07080B] overflow-hidden shrink-0">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <ImageOff className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {attrStrings.length > 0 ? (
                            attrStrings.map((str, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                              >
                                {str}
                              </span>
                            ))
                          ) : (
                            <span className="font-mono text-xs text-zinc-400">
                              Standard Variant
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Stock, Price & Delete */}
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="font-mono text-xs text-zinc-300">
                        <strong
                          className={
                            v.stock === 0
                              ? "text-rose-400 font-semibold"
                              : "text-white font-semibold"
                          }
                        >
                          {v.stock}
                        </strong>{" "}
                        <span className="text-zinc-600">units</span>
                      </span>

                      <span className="font-mono text-xs text-white font-semibold">
                        {currencySymbol}
                        {vPrice?.toLocaleString("en-IN")}
                      </span>

                      <button
                        onClick={() => handleDeleteVariant(v._id)}
                        disabled={deletingId === v._id}
                        className="w-7 h-7 rounded-lg text-zinc-600 hover:text-rose-400 hover:bg-rose-950/20 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === v._id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProductDetails;
