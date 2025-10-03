interface ButtonProps {
  type: "v1" | "v2";
  color?: "primary" | "secondary";
  onClick?: () => void;
  children?: React.ReactNode;
  size: "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  className?: string;
}

const Button = ({
  type,
  color = "primary",
  onClick,
  children,
  size,
  className = "",
}: ButtonProps) => {
  const getButtonClasses = () => {
    if (type === "v1") {
      // Solid button styles
      return `bg-${color} py-2 hover:bg-${color}-hover text-white text-${size}`;
    } else if (type === "v2") {
      // Outline button styles
      return `bg-transparent border py-1.5 border-3 text-${color} text-${size} hover:text-white hover:bg-${color}-hover hover:border-transparent`;
    }
    return "";
  };

  return (
    <button
      onClick={onClick}
      className={`${getButtonClasses()} ${className} px-2 rounded transition-colors duration-200 transform hover:scale-105`}
    >
      {children}
    </button>
  );
};

export default Button;
