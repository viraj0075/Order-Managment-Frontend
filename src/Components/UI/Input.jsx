export default function Input({ label, type = "text", error, className = "", ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-primary-100 font-extrabold text-xs uppercase tracking-wider mb-1.5">
                    {label}
                </label>
            )}
            {type === "textarea" ? (
                <textarea
                    className={`w-full bg-transparent border text-primary-100 placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none transition-colors text-sm font-semibold resize-none ${
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-primary-200 focus:ring-1 focus:ring-primary-200"
                    } ${className}`}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    className={`w-full bg-transparent border text-primary-100 placeholder-gray-400 px-4 py-3 rounded-xl focus:outline-none transition-colors text-sm font-semibold ${
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:border-primary-200 focus:ring-1 focus:ring-primary-200"
                    } ${className}`}
                    {...props}
                />
            )}
            {error && (
                <p className="text-red-500 text-xs font-bold mt-1.5 uppercase tracking-wide">
                    {error}
                </p>
            )}
        </div>
    );
}
