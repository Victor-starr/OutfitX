interface ButtonProps {
  type: "button" | "submit" | "reset";
  version: "v1" | "v2";
  color?: "primary" | "secondary" | "card";
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
  "bg-card": "bg-[var(--color-card)]",
  "text-primary": "text-[var(--color-primary)]",
  "text-secondary": "text-[var(--color-secondary)]",
  "text-card": "text-[var(--color-card)]",
  "hover-bg-primary": "hover:bg-[var(--color-primary-hover)]",
  "hover-bg-secondary": "hover:bg-[var(--color-secondary-hover)]",
  "hover-bg-card": "hover:bg-[var(--color-card-hover)]",
};

const Button = ({
  type,
  version,
  color = "primary",
  onClick,
  children,
  size,
  className = "",
}: ButtonProps) => {
  const getButtonClasses = () => {
    if (version === "v1") {
      // Solid button
      return `${colorMap[`bg-${color}`]} ${colorMap[`hover-bg-${color}`]} 
              text-white ${sizeMap[size]}`;
    }

    if (version === "v2") {
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
