interface InputProps {
  label?: string;
  type?: string | "textarea";
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
}

const Input = ({
  label,
  placeholder,
  type,
  id,
  value,
  onChange,
  className,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label
          className="block mb-2 font-medium text-title text-lg"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${className} bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors resize-none placeholder-muted`}
          rows={6}
        />
      ) : (
        <input
          placeholder={placeholder}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`${className} bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors placeholder-muted`}
        />
      )}
    </div>
  );
};

export default Input;
