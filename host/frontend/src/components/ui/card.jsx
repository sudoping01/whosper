// frontend/src/components/ui/card.jsx
export function Card({ children, className = "" }) {
    return (
      <div className={`bg-white rounded-lg shadow ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardHeader({ children }) {
    return <div className="p-4 border-b">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }