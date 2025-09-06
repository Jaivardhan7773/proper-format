/**
 * Reusable Button Component with TailwindCSS
 *
 * Props:
 * - children → button text or icon
 * - onClick → function when button is clicked
 * - variant → "primary" | "secondary" | "danger" (default: primary)
 * - size → "sm" | "md" | "lg" (default: md)
 * - disabled → true/false (default: false)
 * - loading → true/false (default: false)
 * - className → extra styles
 */
export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  type = "button",
}) {
  // base styles
  const baseStyles =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2";

  // variant styles
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  // size styles
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  // disabled styles (override everything else when disabled)
  const disabledStyles =
    "bg-gray-300 text-gray-600 cursor-not-allowed opacity-70";

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick} // prevent clicks
      disabled={disabled || loading}
      className={`${baseStyles} ${
        disabled || loading ? disabledStyles : variants[variant]
      } ${sizes[size]} ${className}`}
    >
      {/* If loading, show spinner instead of children */}
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
      {loading ? "Loading..." : children}
    </button>
  );
}
