interface ButtonProps {
  type: "button" | "submit" | "reset";
  verstion: "v1" | "v2";
  color?: "primary" | "secondary";
  onClick?: () => void;
  children?: React.ReactNode;
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  className?: string;
}

const sizeMap = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
};

const colorMap = {
  "bg-primary": "bg-[var(--color-primary)]",
  "bg-secondary": "bg-[var(--color-secondary)]",
  "text-primary": "text-[var(--color-primary)]",
  "text-secondary": "text-[var(--color-secondary)]",
  "hover-bg-primary": "hover:bg-[var(--color-primary-hover)]",
  "hover-bg-secondary": "hover:bg-[var(--color-secondary-hover)]",
};

const Button = ({
  type,
  verstion,
  color = "primary",
  onClick,
  children,
  size,
  className = "",
}: ButtonProps) => {
  const getButtonClasses = () => {
    if (verstion === "v1") {
      // Solid button
      return `${colorMap[`bg-${color}`]} ${colorMap[`hover-bg-${color}`]} 
              text-white ${sizeMap[size]}`;
    }

    if (verstion === "v2") {
      // Outline button
      return `bg-transparent border border-2 
              ${colorMap[`text-${color}`]} ${colorMap[`hover-bg-${color}`]} 
              hover:text-white hover:border-transparent ${sizeMap[size]}`;
    }

    return "";
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${getButtonClasses()} ${className} 
         rounded transition-colors duration-200 transform hover:scale-105`}
    >
      {children}
    </button>
  );
};

export default Button;
