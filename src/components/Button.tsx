import { Link } from "react-router";

interface ButtonClassesProps {
  version: "v1" | "v2" | "v3";
  bgColor: "primary" | "secondary" | "card";
  textColor: "primary" | "secondary" | "card" | "title" | "muted";
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}
interface ButtonProps {
  type: "button" | "submit" | "reset";
  version?: "v1" | "v2";
  bgColor?: "primary" | "secondary" | "card";
  textColor?: "primary" | "secondary" | "card" | "title" | "muted";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface LinkButtonProps {
  to: string;
  version?: "v1" | "v2" | "v3";
  bgColor?: "primary" | "secondary" | "card";
  textColor?: "primary" | "secondary" | "card" | "title" | "muted";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  children?: React.ReactNode;
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
  "text-title": "text-[var(--color-title)]",
  "text-muted": "text-[var(--color-muted)]",
  "hover-bg-primary": "hover:bg-[var(--color-primary-hover)]",
  "hover-bg-secondary": "hover:bg-[var(--color-secondary-hover)]",
  "hover-bg-card": "hover:bg-[var(--color-card-hover)]",
};
const getButtonClasses = ({
  version,
  bgColor,
  textColor,
  size,
}: ButtonClassesProps): string => {
  if (version === "v1") {
    // Solid button
    return `${colorMap[`bg-${bgColor}`]} ${colorMap[`hover-bg-${bgColor}`]} 
             ${colorMap[`text-${textColor}`]} ${sizeMap[size]}`;
  }

  if (version === "v2") {
    // Outline button
    return `bg-transparent border border-2 
            ${colorMap[`text-${textColor}`]} ${colorMap[`hover-bg-${bgColor}`]} 
            hover:text-white hover:border-transparent ${sizeMap[size]}`;
  }
  if (version === "v3") {
    // Text button
    return `bg-transparent ${colorMap[`text-${textColor}`]} hover:${
      colorMap[`text-${textColor}`]
    } ${sizeMap[size]} transition-colors duration-200`;
  }

  return "";
};
export const Button = ({
  version = "v1",
  bgColor = "primary",
  textColor = "title",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${getButtonClasses({
        version,
        bgColor,
        textColor,
        size,
      })} ${className} 
        rounded transition-colors duration-200 transform hover:scale-105`}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButton = ({
  to,
  version = "v1",
  bgColor = "primary",
  textColor = "title",
  size = "md",
  className = "",
  children,
}: LinkButtonProps) => {
  return (
    <Link
      to={to}
      className={`${getButtonClasses({
        version,
        bgColor,
        textColor,
        size,
      })} ${className} 
        rounded transition-colors duration-200 transform hover:scale-105`}
    >
      {children}
    </Link>
  );
};

export default Button;
