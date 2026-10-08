import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  ShieldCheck,
  AlertCircle,
  Loader2,
  Tag,
  FileText,
  DollarSign,
  ImagePlus,
  X,
  CheckCircle2,
  ChevronDown,
  Package,
} from "lucide-react";
import { useProduct } from "../products/hooks/useproduct.js";

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "JPY", "CAD"];

export const CreateProduct = () => {
  const { handelCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleCurrencySelect = (currency) => {
    setFormData((prev) => ({ ...prev, priceCurrency: currency }));
    setCurrencyOpen(false);
  };

  const addFiles = (files) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (images.length + imageFiles.length > 7) {
      setError("You can upload a maximum of 7 images per product.");
      return;
    }
    const previews = imageFiles.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...imageFiles]);
    setImagePreviews((prev) => [...prev, ...previews]);
    if (error) setError("");
  };

  const handleImageChange = (e) => addFiles(e.target.files);

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) return setError("Product title is required.");
    if (!formData.description.trim()) return setError("Product description is required.");
    if (!formData.priceAmount || isNaN(formData.priceAmount) || Number(formData.priceAmount) <= 0)
      return setError("Please enter a valid price amount.");
    if (images.length === 0) return setError("At least one product image is required.");

    const data = new FormData();
    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("priceAmount", formData.priceAmount);
    data.append("priceCurrency", formData.priceCurrency);
    images.forEach((img) => data.append("images", img));

    setLoading(true);
    try {
      await handelCreateProduct(data);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050608] text-[#E2E8F0] px-4 py-12 font-sans overflow-x-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-700/10 via-slate-400/5 to-transparent rounded-full blur-[160px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-gradient-to-bl from-white/[0.02] via-zinc-800/10 to-transparent rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">

        {/* Page header strip */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/95 via-zinc-200 to-zinc-400 p-[1px] shadow-[0_0_12px_rgba(255,255,255,0.15)] shrink-0">
            <div className="w-full h-full bg-[#08090C] rounded-[7px] flex items-center justify-center">
              <Package className="w-4 h-4 text-zinc-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse"></span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                Seller Protocol // Product Submission
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase leading-tight">
              List a New Piece
            </h1>
          </div>
        </div>

        {/* Card */}
        <div className="obsidian-card relative rounded-2xl border border-white/10 p-6 sm:p-8 overflow-hidden">
          {/* Top specular rim */}
          <div className="absolute -top-[1px] left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-zinc-200/40 to-transparent"></div>

          {/* ── SUCCESS STATE ── */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-14 gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-[0_0_28px_rgba(255,255,255,0.07)]">
                <CheckCircle2 className="w-7 h-7 text-zinc-200" />
              </div>
              <div>
                <p className="text-base font-semibold text-white uppercase tracking-wider">Drop Listed</p>
                <p className="text-xs text-zinc-400 font-mono tracking-wider mt-1">
                  Product submitted to atelier. Redirecting...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ── ERROR BANNER ── */}
              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/25 flex items-start gap-3 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* ── TITLE ── */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                      Product Title
                    </label>
                    <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">Required</span>
                  </div>
                  <div className="relative group">
                    <Tag className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-300 transition-colors pointer-events-none" />
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Obsidian Oversized Cargo — A/W 2026"
                      maxLength={120}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* ── DESCRIPTION ── */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                      Description
                    </label>
                    <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
                      {formData.description.length}/800
                    </span>
                  </div>
                  <div className="relative group">
                    <FileText className="w-3.5 h-3.5 absolute left-3.5 top-3 text-zinc-600 group-focus-within:text-zinc-300 transition-colors pointer-events-none" />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Fabric, fit, season, care instructions, and the story behind the piece..."
                      rows={4}
                      maxLength={800}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/20 transition-all duration-200 resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* ── PRICE + CURRENCY ── */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 block">
                      Price
                    </label>
                    <div className="relative group">
                      <DollarSign className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-zinc-300 transition-colors pointer-events-none" />
                      <input
                        type="number"
                        name="priceAmount"
                        value={formData.priceAmount}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/20 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 block">
                      Currency
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setCurrencyOpen(!currencyOpen)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#090B0E] border border-zinc-800 text-sm text-zinc-100 flex items-center justify-between hover:border-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/20 transition-all duration-200"
                      >
                        <span className="font-mono text-sm tracking-widest">{formData.priceCurrency}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${currencyOpen ? "rotate-180" : ""}`} />
                      </button>
                      {currencyOpen && (
                        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg bg-[#0D0F13] border border-zinc-800 shadow-2xl z-40 overflow-hidden">
                          {CURRENCIES.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => handleCurrencySelect(c)}
                              className={`w-full text-left px-4 py-2 font-mono text-xs tracking-widest transition-colors hover:bg-zinc-800/50 ${
                                formData.priceCurrency === c ? "text-white bg-zinc-800/30" : "text-zinc-400"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── IMAGE UPLOAD ── */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
                      Product Images
                    </label>
                    <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
                      {images.length} / 7
                    </span>
                  </div>

                  {/* Drop zone */}
                  {images.length < 7 && (
                    <div
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onClick={() => fileInputRef.current?.click()}
                      className={`rounded-xl border-2 border-dashed bg-[#090B0E] transition-all duration-200 cursor-pointer p-6 flex flex-col items-center justify-center gap-2 text-center ${
                        dragOver
                          ? "border-zinc-500 bg-zinc-900/40"
                          : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/20"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors duration-200 ${dragOver ? "border-zinc-500 bg-zinc-800" : "border-zinc-800 bg-zinc-900"}`}>
                        <ImagePlus className={`w-4 h-4 transition-colors ${dragOver ? "text-zinc-200" : "text-zinc-600"}`} />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">
                          {dragOver ? "Release to upload" : (
                            <>Drop images or <span className="text-zinc-200 underline underline-offset-2">browse</span></>
                          )}
                        </p>
                        <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-wider mt-0.5">
                          JPG · PNG · WEBP &nbsp;·&nbsp; Max 5MB &nbsp;·&nbsp; Up to 7
                        </p>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  )}

                  {/* Preview grid */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-1">
                      {imagePreviews.map((src, idx) => (
                        <div
                          key={idx}
                          className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-800 bg-[#090B0E]"
                        >
                          <img
                            src={src}
                            alt={`img-${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          {/* Remove overlay */}
                          <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                              className="w-6 h-6 rounded-full bg-zinc-900/90 border border-zinc-600 flex items-center justify-center hover:bg-rose-900/60 hover:border-rose-500/50 transition-all"
                            >
                              <X className="w-3 h-3 text-zinc-200" />
                            </button>
                          </div>
                          {/* Index badge */}
                          <div className="absolute bottom-1 left-1 px-1 py-px rounded bg-black/70 backdrop-blur-sm">
                            <span className="font-mono text-[8px] text-zinc-400">{idx + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── DIVIDER ── */}
                <div className="h-px bg-zinc-800/50 my-1"></div>

                {/* ── ACTIONS ── */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="sm:w-28 py-3 rounded-xl text-xs font-mono font-medium text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 bg-transparent transition-all duration-200 text-center uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="chrome-button flex-1 py-3.5 rounded-xl text-zinc-950 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-zinc-900" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Publish Product Drop</span>
                    )}
                  </button>
                </div>

                {/* ── TRUST STRIP ── */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <ShieldCheck className="w-3 h-3 text-zinc-600" />
                  <span className="font-mono text-[9px] tracking-wider uppercase text-zinc-600">
                    Seller Verified &nbsp;·&nbsp; Secure Upload &nbsp;·&nbsp; Editorial Review
                  </span>
                </div>

              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
