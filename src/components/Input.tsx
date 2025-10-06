interface InputProps {
  label?: string;
  type?: string | "textarea" | "file";
  accept?: "image/*";
  required?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const Input = ({
  label,
  placeholder,
  type,
  required,
  id,
  name,
  value,
  onInputChange,
  onTextareaChange,
  className,
}: InputProps) => {
  return (
    <div>
      {label && (
        <label className="block mb-2 text-title text-lg" htmlFor={id}>
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onTextareaChange}
          className={`${className} bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors resize-none placeholder-muted`}
          rows={6}
        />
      ) : type === "file" ? (
        <input
          id={id}
          name={name}
          type="file"
          accept="image/*"
          onChange={onInputChange}
          className={`${className}  bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors placeholder-muted`}
        />
      ) : (
        <input
          placeholder={placeholder}
          id={id}
          name={name}
          type={type}
          accept={type === "file" ? "image/*" : undefined}
          required={required}
          value={value}
          onChange={onInputChange}
          className={`${className}  bg-surface p-3 border-2 focus:border-primary border-border rounded-lg focus:outline-none w-full text-title transition-colors placeholder-muted`}
        />
      )}
    </div>
  );
};

export default Input;
