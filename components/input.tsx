import { Eye, EyeOff } from "lucide-react";
import { type ReactNode } from "react";
import FormError from "./form-error";

type InputProps = {
  label?: string;
  id?: number;
  type: string;
  name?: string;
  value?: string | number;
  onClick?: () => void;
  placeholder?: string;
  hasError?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  icon?: ReactNode;
  didEdit?: boolean;
  validationErrors?: string;
};

export default function Input({
  label,
  id,
  type,
  name,
  value,
  onClick,
  placeholder,
  hasError,
  onChange,
  onBlur,
  showPassword,
  onTogglePassword,
  icon,
}: InputProps) {
  const isPasswordField =
    type === "password" || name?.toLowerCase()?.includes("password");
  return (
    <div className="flex flex-col gap-2">
      <label className="text-muted text-sm md:text-base">{label}</label>

      <div className="relative">
        <input
          className={`w-full bg-background rounded-sm border  
             p-2 lg:p-4 pl-8 md:pl-8 lg:pl-9 
             focus:outline-none focus:ring-2 focus:ring-opacity-30
             ${
               hasError
                 ? "focus:ring-danger border-2 border-danger"
                 : "focus:ring-primary border-border"
             }`}
          key={id}
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          name={name}
          onBlur={onBlur}
          value={value}
          onClick={onClick}
          placeholder={placeholder}
          onChange={onChange}
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
          {icon}
        </div>

        {isPasswordField && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 
               text-muted"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 cursor-pointer" />
            ) : (
              <Eye className="w-5 h-5 cursor-pointer" />
            )}
          </button>
        )}
      </div>
      <FormError message={hasError} />
    </div>
  );
}
