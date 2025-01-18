// frontend/src/components/ui/alert.jsx
export function Alert({ children, variant = "default", className = "" }) {
  const baseClasses = "p-4 rounded-lg border ";
  const variantClasses = {
    default: "bg-white border-gray-200",
    destructive: "bg-red-50 border-red-500 text-red-700"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children }) {
  return <div className="text-sm">{children}</div>;
}